import api from "./apiService";

interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    nome: string;
  };
}

const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    return response.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

export default authService;