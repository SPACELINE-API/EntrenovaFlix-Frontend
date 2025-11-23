import '../../styles/chat.css';
import { useState, useRef, useEffect } from 'react';
import { LuSendHorizontal } from "react-icons/lu";
import { chatService } from '../../services/chatService';
import api from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "bot";
  content: string;
};

interface ChatState {
  mensagens: Message[];
  form: string;
}

type ApiMessage = {
  sender: 'usuario' | 'ia';
  text: string;
}

function ChatBot() {
  const [chatState, setChatState] = useState<ChatState>(chatService.getState());
  const [inputMessage, setInputMessage] = useState("");
  const [isConversationComplete, setIsConversationComplete] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const unsubscribe = chatService.subscribe((newState: ChatState) => {
      setChatState(newState);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatState.mensagens]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isConversationComplete) {
      setIsTyping(true);
      chatService.sendMessage(inputMessage)
        .then(complete => {
          setIsTyping(false);
          if (complete) setIsConversationComplete(true);
        })
        .catch(() => {
          setIsTyping(false);
        });
      setInputMessage("");
    }
  };

  const handleEndConversation = async () => {
    const conversationHistory: Message[] = chatService.getState().mensagens;

    const ultimaMensagemDoBot = conversationHistory
      .filter(msg => msg.role === 'bot')
      .pop();

    let nomeDaTrilha = "Diagnóstico";

    if (ultimaMensagemDoBot) {
      const conteudoCompleto = ultimaMensagemDoBot.content || "";
      if (conteudoCompleto) {
        const match = conteudoCompleto.match(/-\s*(.*?):/);
        if (match && match[1]) {
          nomeDaTrilha = match[1].trim();
        } else {
          const maxLen = 50;
          nomeDaTrilha =
            conteudoCompleto.substring(0, Math.min(conteudoCompleto.length, maxLen)) +
            (conteudoCompleto.length > maxLen ? "..." : "");
        }
      }
    }

    const payloadHistory: ApiMessage[] = conversationHistory.map(msg => ({
      sender: msg.role === 'user' ? 'usuario' : 'ia',
      text: msg.content || ""
    }));

    const payload = {
      conversa: payloadHistory,
      tipo_trilha: nomeDaTrilha
    };

    try {
      await api.post('diagnosticos/salvar/', payload);
      alert('Diagnóstico salvo com sucesso!');
    } catch {
      alert('Houve um erro ao salvar seu diagnóstico. Tente novamente.');
      return;
    }

    try {
      await api.patch('primeiro-login');
    } catch {}

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
        <div className='mensagem-inicial'>
          <h5>Olá, sou a Assistente Virtual da Entrenova! Analisei
            seu diagnóstico e identifiquei os pontos principais. Vamos prosseguir?
          </h5>
        </div>

        {chatState.mensagens.map((msg, index) => (
          <div key={index} className={`mensagem ${msg.role === 'user' ? 'user' : 'bot'}`}>
            {(msg.content || "").split('\n').map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </div>
        ))}

        {isTyping && (
          <div className="balaozinho-pensando">
            <span className="ponto"></span>
            <span className="ponto"></span>
            <span className="ponto"></span>
          </div>
        )}

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
