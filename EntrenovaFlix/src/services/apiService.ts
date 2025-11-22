import axios from "axios";

let onUnauthorizedCallback: (() => void) | null = null;
export const setOnUnauthorized = (callback: () => void) => {
  onUnauthorizedCallback = callback;
};

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/accounts/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          
          const response = await axios.post(
            "http://127.0.0.1:8000/api/accounts/login/refresh", 
            { refresh: refreshToken }
          );
          
          const newAccessToken = response.data.access;
          localStorage.setItem("access_token", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);

        } catch (refreshError) {
          console.error("Falha ao renovar o token:", refreshError);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          onUnauthorizedCallback?.(); 
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export const getActiveUserPlan = async () => {
  try {
    const response = await api.get("active-plan/"); // Ajustar o endpoint conforme backend
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o plano ativo:", error);
    throw error;
  }
};

export default api;
