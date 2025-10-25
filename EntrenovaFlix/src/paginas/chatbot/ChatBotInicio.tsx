import '../../styles/chat.css';
import { useNavigate} from "react-router-dom";
import { useState, useEffect } from "react"; 
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: 'admin' | 'rh' | 'user';
  nome: string;
  sobrenome: string; 
  email: string;
}

function ChatBotInicio() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("Usuário");

  useEffect(() => {
      const token = localStorage.getItem("access_token");
      if (token) {
        try {
          const decodedToken: DecodedToken = jwtDecode(token);
          const fullName = decodedToken.sobrenome
            ? `${decodedToken.nome} ${decodedToken.sobrenome}`
            : decodedToken.nome;
  
          setUserName(fullName || "Usuário");
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      }
    }, []);

  return (
     <main className="inicio-container">
      <h2 style={{paddingLeft:'12rem'}}>Olá {userName}!</h2>
      <p style={{textAlign: 'left'}}>Existem problemas invisíveis travando o crescimento da sua empresa. Vamos descobrir juntos? É só clicar em iniciar conversa</p>
      <button className="btn-iniciar-chat"   onClick={() =>  navigate("/chatbot")}>
        Iniciar conversa
      </button>
    </main>
  );
}

export default ChatBotInicio;





