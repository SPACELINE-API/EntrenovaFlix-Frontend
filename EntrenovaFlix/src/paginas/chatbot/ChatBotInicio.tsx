import '../../styles/chat.css';
import { useNavigate} from "react-router-dom";
import { useEffect } from "react"; 

function ChatBotInicio() {
  const navigate = useNavigate();

  return (
     <main className="inicio-container">
      <h2>Olá</h2>
      <p>Existem problemas invisíveis travando o crescimento da sua empresa. Vamos descobrir juntos? É só clicar em iniciar conversa</p>
      <button className="btn-iniciar-chat"   onClick={() =>  navigate("/chatbot")}>
        Iniciar conversa
      </button>
    </main>
  );
}

export default ChatBotInicio;





