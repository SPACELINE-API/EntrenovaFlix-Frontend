import api from "./apiService";

const ticketService = {
  criarTicket: async (data: { titulo: string; categoria: string; descricao: string }) => {
    const response = await api.post("/criar-ticket", data);
    return response.data;
  },

  listarTickets: async () => {
    const response = await api.get("/visualizar-ticket");
    return response.data;
  },

  getTicketDetail: async (ticketId: number) => {
    const res = await api.get(`/tickets/${ticketId}`);
    return res.data;
  },

  excluirTicket: async (ticketId: number) => {
    const res = await api.delete(`/tickets/${ticketId}`);
    return res.data;
  },

  responderTicket: async (ticketId: number, texto: string) => {
    const res = await api.post(`/tickets/${ticketId}/mensagens`, { texto });
    return res.data;
  }
};

export default ticketService;