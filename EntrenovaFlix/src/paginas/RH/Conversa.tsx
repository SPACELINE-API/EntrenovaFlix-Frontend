import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/apiService';
import '../../styles/historico.css'; 

interface ChatMessage {
  sender: 'ia' | 'usuario';
  text: string;
}
interface DiagnosticoCompleto {
  tipo_trilha: string;
  created_at: string;
  conversa_completa: ChatMessage[];
}

function Conversa() {
  const { id } = useParams<{ id: string }>(); 
  const navigate = useNavigate();
  const [chat, setChat] = useState<DiagnosticoCompleto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    async function carregarChat() {
      try {
        setIsLoading(true);
        const response = await api.get<DiagnosticoCompleto>(`diagnosticos/${id}/`);
        setChat(response.data);
      } catch (error) {
        console.error('Erro ao carregar chat:', error);
      } finally {
        setIsLoading(false);
      }
    }
    carregarChat();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!id) return;
    setIsDownloading(true);

    try {
      const response = await api.get(`diagnosticos/${id}/pdf/`, {
          responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `diagnostico_${chat?.tipo_trilha || id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      alert("Falha ao gerar o PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) return <p>Carregando conversa...</p>;
  if (!chat) return <p>Diagnóstico não encontrado.</p>;

  return (
    <div className="detalhe-container">
      <button onClick={() => navigate(-1)} className="btn-voltar">
        ← Voltar
      </button>

      <div>
        <h2>{chat.tipo_trilha}</h2>
        <small>Realizado em: {new Date(chat.created_at).toLocaleString('pt-BR')}</small>
        <hr />
        <div className="chat-historico">
          {chat.conversa_completa.map((msg, index) => (
            <div key={index} className={`chat-mensagem ${msg.sender}`}>
              <strong>{msg.sender === 'ia' ? 'IA' : 'Você'}:</strong>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={handleDownloadPDF} 
        className="btn-download"
        disabled={isDownloading}
      >
        {isDownloading ? 'Gerando...' : 'Baixar Diagnóstico (PDF)'}
      </button>
    </div>
  );
}
export default Conversa;