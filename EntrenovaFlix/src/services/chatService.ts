// src/services/chatService.ts

type Message = {
  role: "user" | "bot";
  content: string;
};

type StateListener = (newState: ChatState) => void;

interface ChatState {
  mensagens: Message[];
  form: string;
}

class ChatService {
  private state: ChatState = {
    mensagens: [],
    form: "",
  };

  private listeners: StateListener[] = [];

  subscribe(listener: StateListener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }
  
  getState(): ChatState {
    return this.state;
  }

  setForm(newFormValue: string) {
    this.state = { ...this.state, form: newFormValue };
    this.notify();
  }

  async sendMessage(userMessageContent: string) {
    if (!userMessageContent) return;

    const newUserMessage: Message = { role: "user", content: userMessageContent };
    const currentMessages = this.state.mensagens;
    const currentForm = this.state.form;

    this.state = {
      ...this.state,
      mensagens: [...currentMessages, newUserMessage],
    };
    this.notify();

    try {
      const payload: any = {
        message: userMessageContent,
        history: currentMessages,
      };

      // Adiciona o formulário ao payload APENAS se for a primeira mensagem
      // e o formulário tiver algum conteúdo.
      if (currentMessages.length === 0 && currentForm) {
        payload.formu = currentForm;
        // Limpa o formulário do estado para não ser enviado novamente
        this.state.form = ""; 
      }

      const response = await fetch('http://127.0.0.1:8000/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do servidor.');
      }

      const data = await response.json();
      const botMessage: Message = { role: 'bot', content: data.reply };
      
      this.state = {
        ...this.state,
        mensagens: [...this.state.mensagens, botMessage],
      };
      this.notify();

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = { role: 'bot', content: 'Desculpe, ocorreu um erro.' };
      this.state = {
        ...this.state,
        mensagens: [...this.state.mensagens, errorMessage],
      };
      this.notify();
    }
  }
}

export const chatService = new ChatService();