import api from "./apiService";

interface NewPostData {
  pergunta: string;
  descricao: string;
}

interface NewReplyData {
  conteudo: string;
}

const forumService = {
  createPost: async (data: NewPostData) => {
    const response = await api.post("/posts", data);
    return response.data;
  },

  createReply: async (postId: string, data: NewReplyData) => {
    const response = await api.post(`/posts/${postId}/comentarios`, data);
    return response.data;
  }
};

export default forumService;