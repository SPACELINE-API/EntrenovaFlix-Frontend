import axios from 'axios';

const API_URL = 'http://localhost:8000/api/accounts'; 

interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    nome: string;
  };
}

const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login/`, {
    email,
    password,
  });


  localStorage.setItem('access', response.data.access);
  localStorage.setItem('refresh', response.data.refresh);

  return response.data;
};

export default {
  login,
};
