import '../styles/chat.css';
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizontal } from "react-icons/lu";

type Message = {
  role: "user" | "bot";
  content: string;
};

function ChatBot() {
  const [mensagens, setMensagens] = useState<Message[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [form, setForm] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async () => {
    const userMessageContent = mensagem.trim();

    if (userMessageContent) {
      const newUserMessage: Message = { role: "user", content: userMessageContent };
      const updatedMessages = [...mensagens, newUserMessage];
      setMensagens(updatedMessages);
      setMensagem("");

      try {
        const payload = {
          message: userMessageContent,
          history: mensagens, 
          formu: form
        };

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
        setMensagens(prevMensagens => [...prevMensagens, botMessage]);

      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        const errorMessage: Message = { role: 'bot', content: 'Desculpe, ocorreu um erro. Tente novamente mais tarde.' };
        setMensagens(prevMensagens => [...prevMensagens, errorMessage]);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); 
      handleSendMessage(); 
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [mensagem]);

  return (
    <div className="chatbot-page">
      <div className="mensagens">
        {mensagens.map((msg, index) => (
          <div
            key={index}
            className={`mensagem ${msg.role === 'user' ? 'user' : ''}`}
          >
            <strong>{msg.role === 'user' ? "Você" : "Bot"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="chat-container">
        <textarea
          ref={textareaRef}
          placeholder="Responder..."
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={handleKeyDown} 
          className="chat-input"
          rows={1} 
        />
        <button
          className="enviar-btn"
          onClick={handleSendMessage}
        >
          <LuSendHorizontal size={24} />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;