import { useState, useEffect } from 'react';
import StatsCard from '../../componentes/layout/dashboardAdmin/widgets/statsCard';
import TabelaTransacoes from '../../componentes/layout/dashboardAdmin/widgets/TabelaTransacoes';
import GraficoTrilhas from '../../componentes/layout/dashboardAdmin/widgets/GraficoTrilhas';
import GraficoPlanos from '../../componentes/layout/dashboardAdmin/widgets/GraficoPlanos';
import GraficoHobbies from '../../componentes/layout/dashboardAdmin/widgets/GraficoHobbies';
import GraficoDimensoes from '../../componentes/layout/dashboardAdmin/widgets/GraficoDimensoes';
import GraficoEngajamento from '../../componentes/layout/dashboardAdmin/widgets/GraficoEngajamento';
import '../../styles/adminGrafos.css';
import api from '../../services/apiService';
import { FaUser, FaUsers, FaUserPlus, FaBuilding, FaMoneyBillWave } from "react-icons/fa";

interface DashboardData {
  totalUsuarios: number;
  usuariosAtivos: number;
  novosInscritos: number;
  totalEmpresas: number;
  planosMaisAssinados: { plano_nome: string; assinantes: number }[];
  totalTrilhasCriadas: number;
  trilhasMaisAcessadas: { nome: string; acessos: number }[];
  topHobbies: { nome: string; usuarios: number }[];
  engajamentoVsCrescimento: (string | number)[][];
  topDimensoes: { nome: string; trabalhadas: number }[];
  revenueTotal: number;
  historicoTransacoes: { id: string; empresa: string; valor: number; data: string, plano: string, metodo: string; }[];
}

function DashboardAdmin() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('dashwidgets');
        setData(response.data);
        setError(null);
      } catch (err) {
        setError("Falha ao carregar dados do dashboard.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const formatarRevenue = () => {
    if (!data || data.revenueTotal == null) return null;

    return data.revenueTotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="page-container">

      <div className="general-cards">

        <StatsCard 
          title="Total de Usuários"
          isLoading={isLoading}
          hasError={!!error}
          value={data?.totalUsuarios}
          icon={<FaUser size={40} />}
        />

        <StatsCard 
          title="Usuários Ativos (7d)"
          isLoading={isLoading}
          hasError={!!error}
          value={data?.usuariosAtivos}
          icon={<FaUsers size={40} />}
        />

        <StatsCard 
          title="Novos Inscritos (24h)"
          isLoading={isLoading}
          hasError={!!error}
          value={data?.novosInscritos}
          icon={<FaUserPlus size={40} />}
        />

        <StatsCard 
          title="Empresas Assinantes"
          isLoading={isLoading}
          hasError={!!error}
          value={data?.totalEmpresas}
          icon={<FaBuilding size={40} />}
        />

        <StatsCard 
          title="Revenue Total"
          isLoading={isLoading}
          hasError={!!error}
          value={isLoading ? null : formatarRevenue()}
          icon={<FaMoneyBillWave size={40} />}
        />

      </div>

      <div className="graficos-container">

        <GraficoPlanos
          isLoading={isLoading}
          hasError={!!error}
          data={data?.planosMaisAssinados}
        />

        <GraficoTrilhas
          isLoading={isLoading}
          hasError={!!error}
          data={data?.trilhasMaisAcessadas}
        />

        <GraficoHobbies 
          isLoading={isLoading}
          hasError={!!error}
          data={data?.topHobbies}
        />

        <GraficoDimensoes 
          isLoading={isLoading}
          hasError={!!error}
          data={data?.topDimensoes}
        />

        <GraficoEngajamento 
          isLoading={isLoading}
          hasError={!!error}
          data={data?.engajamentoVsCrescimento}
        />

        <TabelaTransacoes
          isLoading={isLoading}
          hasError={!!error}
          data={data?.historicoTransacoes}
        />

      </div>

    </div>
  );
}

export default DashboardAdmin;
