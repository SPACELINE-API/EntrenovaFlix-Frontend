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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = () => {
   
    if (mensagem.trim()) {
      setMensagens([...mensagens, { role: "user", content: mensagem }]);
      setMensagem("");
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
            className={`mensagem${msg.role === 'user' ? ' user' : ''}`}
          >
            
            <strong>{msg.role === 'user' ? "Usuário" : "Bot"}:</strong> {msg.content}
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