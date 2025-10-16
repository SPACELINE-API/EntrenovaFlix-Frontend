// src/paginas/ChatBot.tsx

import '../styles/chat.css';
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizontal } from "react-icons/lu";
import { chatService } from '../services/chatService'; 

function ChatBot() {
  const [chatState, setChatState] = useState(chatService.getState());
  const [inputMessage, setInputMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const unsubscribe = chatService.subscribe(newState => {
      setChatState(newState);
    });
    return () => unsubscribe();
  }, []);

  const handleSendMessage = () => {
    chatService.sendMessage(inputMessage);
    setInputMessage("");
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
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  return (
    <div className="chatbot-page">
      <div className="mensagens">
        {chatState.mensagens.map((msg, index) => (
          <div
            key={index}
            className={`mensagem ${msg.role === 'user' ? 'user' : 'bot'}`}
            
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-container">
        <textarea
          ref={textareaRef}
          placeholder="Responder..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="chat-input"
          rows={1}
        />
        <button className="enviar-btn" onClick={handleSendMessage}>
          <LuSendHorizontal size={24} />
        </button>
      </div>
    </div>
  );
}

export default ChatBot;