import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  api  from '../../services/apiService'; // 👈 Seu serviço de API
import '../../styles/historico.css'; // 👈 Crie um CSS para estilizar

interface DiagnosticoResumo {
  id: string; // uuid
  created_at: string;
  tipo_trilha: string;
}

interface ApiResponse {
  diagnosticos: DiagnosticoResumo[];
}

function HistoricoRH(){
const [historico, setHistorico] = useState<DiagnosticoResumo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function carregarHistorico() {
      try {
        const response = await api.get<ApiResponse>('api/diagnosticos/listar/');
        setHistorico(response.data.diagnosticos); 
        
      } catch (err) {
        console.error("Erro ao carregar histórico", err);
      } finally {
        setIsLoading(false);
      }
    }
    carregarHistorico();
  }, []); 

  return (
    <div className="historico-container">
      <h1 className="titulo">Histórico de Conversas com o ChatBot</h1>
      {isLoading ? <p>Carregando...</p> : (
        <div className="historico-card">
          {historico.map(item => (
            <Link 
              to={`/dashboardRH/historicoChatbot/${item.id}`} 
              key={item.id} 
              className="historico-item"
            >
              <div>
                <strong>{item.tipo_trilha}</strong>
                <small>
                  {new Date(item.created_at).toLocaleDateString('pt-BR')}
                </small>
              </div>
              <span>Ver Detalhes</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoricoRH