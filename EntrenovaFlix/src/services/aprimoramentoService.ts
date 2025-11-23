import api from "./apiService";

const aprimoramentoService = {
  listarRespostas: async () => {
    const response = await api.get("/aprimoramento-pessoal");
    return response.data;
  },
};

export default aprimoramentoService;