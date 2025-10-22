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

  async sendMessage(userMessageContent: string): Promise<boolean> { 
    if (!userMessageContent) return false;

    const newUserMessage: Message = { role: "user", content: userMessageContent };
    const currentMessages = this.state.mensagens;
    
    this.state = {
      ...this.state,
      mensagens: [...currentMessages, newUserMessage],
    };
    this.notify();

    let isComplete = false; 

    try {
      const payload: any = {
        message: userMessageContent,
        history: currentMessages,
      };

      if (currentMessages.length === 0) {
        let formToSend = this.state.form;
        if (!formToSend) {
          const storedForm = localStorage.getItem('segmentedDiagnosis'); 
          if (storedForm) formToSend = storedForm;
        }
        
        if (formToSend) {
          try {
             payload.formu = typeof formToSend === 'string' ? JSON.parse(formToSend) : formToSend;
             console.log("Anexando dados do formulário ao payload.");
             this.state.form = ""; 
          } catch (e) {
             console.error("Erro ao fazer parse do formulário para envio:", e);
             payload.formu = formToSend; 
             this.state.form = "";
          }
        } else {
          console.log("Nenhum dado de formulário encontrado para anexar.");
        }
      }

      console.log("Enviando payload:", payload);

      const response = await fetch('http://127.0.0.1:8000/api/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.text(); 
        throw new Error(`Falha na resposta do servidor: ${response.status} ${errorData}`);
      }

      const data = await response.json(); 
      const botMessage: Message = { role: 'bot', content: data.reply };
      isComplete = data.isComplete ?? false; 

      this.state = {
        ...this.state,
        mensagens: [...this.state.mensagens, botMessage],
      };
      this.notify();

    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      const errorMessage: Message = { role: 'bot', content: 'Desculpe, ocorreu um erro de comunicação.' };
      this.state = {
        ...this.state,
        mensagens: [...this.state.mensagens, errorMessage],
      };
      this.notify();
    }
    
    return isComplete; 
  }

  resetChat() {
     this.state = { mensagens: [], form: "" };
     this.notify();
  }
}

export const chatService = new ChatService();