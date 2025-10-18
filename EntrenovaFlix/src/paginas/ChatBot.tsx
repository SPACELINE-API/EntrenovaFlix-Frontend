// src/paginas/ChatBot.tsx

import '../styles/chat.css';
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizontal } from "react-icons/lu";
import { chatService } from '../services/chatService';
import { useNavigate } from 'react-router-dom'; 

type Message = {
  role: "user" | "bot";
  content: string;
};

function ChatBot() {
  const [chatState, setChatState] = useState(chatService.getState());
  const [inputMessage, setInputMessage] = useState("");
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); // 2. Instancie o hook

  useEffect(() => {
    const unsubscribe = chatService.subscribe(newState => {
      setChatState(newState);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.mensagens]);


  const handleSendMessage = () => {
    if (inputMessage.trim() && !isConversationComplete) {
       chatService.sendMessage(inputMessage).then(complete => {
           if (complete) {
               setIsConversationComplete(true);
           }
       });
       setInputMessage("");
    }
  };

  const handleEndConversation = () => {
    const conversationHistory = chatService.getState().mensagens;
    console.log("Salvando conversa:", conversationHistory);
    chatService.resetChat();
    setIsConversationComplete(false);
    setInputMessage("");

    navigate('/dashboardRH');
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
           <div key={index} className={`mensagem ${msg.role === 'user' ? 'user' : 'bot'}`}>
             {msg.content.split('\\n').map((line, i) => (
               <span key={i}>{line}<br/></span>
             ))}
           </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-container">
        {isConversationComplete ? (
          <button className="encerrar-btn" onClick={handleEndConversation}>
            Encerrar e Salvar Conversa
          </button>
        ) : (
          <>
            <textarea
              ref={textareaRef}
              placeholder="Responder..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chat-input"
              rows={1}
              disabled={isConversationComplete}
            />
            <button
              className="enviar-btn"
              onClick={handleSendMessage}
              disabled={isConversationComplete || !inputMessage.trim()}
            >
              <LuSendHorizontal size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ChatBot;