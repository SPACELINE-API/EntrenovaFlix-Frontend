import api from "./apiService";

const ticketService = {
  criarTicket: async (data: { titulo: string; categoria: string; descricao: string }) => {
    const response = await api.post("/criar-ticket", data);
    return response.data;
  },

  listarTickets: async () => {
    const response = await api.get("/visualizar-ticket");
    return response.data;
  }
};

export default ticketService;