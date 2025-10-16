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
    console.log("Dados do formulário armazenados no chatService.");
  }

  async sendMessage(userMessageContent: string) {
    if (!userMessageContent) return;

    const newUserMessage: Message = { role: "user", content: userMessageContent };
    const currentMessages = this.state.mensagens;

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

      if (currentMessages.length === 0) {
        let formToSend = this.state.form;

        if (!formToSend) {
          console.log("Formulário não encontrado no estado, buscando no localStorage...");
          const storedForm = localStorage.getItem('segmentedDiagnosis');
          if (storedForm) {
            console.log("Formulário encontrado no localStorage!");
            formToSend = storedForm;
          }
        }
        
        if (formToSend) {
          console.log("Anexando dados do formulário ao payload para envio.");
          payload.form_data = JSON.parse(formToSend);
          this.state.form = ""; 
        } else {
          console.log("Nenhum dado de formulário encontrado para enviar.");
        }
      }

      console.log("Enviando payload final para o backend:", payload);

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