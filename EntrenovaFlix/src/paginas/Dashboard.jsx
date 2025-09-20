import GraficoFrequencia from '../componentes/dashboard/GraficoFrequencia.jsx';
import GraficoDesempenho from '../componentes/dashboard/GraficoDesempenho.jsx';
import Card from '../componentes/dashboard/Card.jsx';
import CardParticipacao from '../componentes/dashboard/CardParticipacao.jsx';
import { FaFire } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import '../styles/dashboard.css'

function Dashboard() {
  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className='sessao-graficos'>
        <h2>Performance</h2>
        <div className='graficos'>
          <div className='conjunto-grafico'>
            <h3 className='titulo-grafico'>Dias ativos por mês</h3>
            <GraficoFrequencia />
          </div>
          <div className='conjunto-grafico'>
            <h3 className='titulo-grafico'>Atividades realizadas por tipo</h3>
            <GraficoDesempenho />
          </div>
        </div>
      </div>
      <div className='cards-engajamento'>
        <Card titulo="Acessos semanais" valor="3" icone={<FaCalendarDays className='icone' />} />
        <Card titulo="Tempo gasto nas atividades" valor="10h" icone={<MdTimer className='icone' />} />
        <Card titulo="Dias consecutivos de acesso" valor="7" icone={<FaFire className='icone' />} />
        <Card titulo="Atividades concluídas" valor="3" icone={<FaCheck className='icone' />} />
      </div>
      <div className='cards-participacao'>
        <CardParticipacao titulo="Interações em fórum" valor="12" />
        <CardParticipacao titulo="Comentários feitos" valor="5" />
        <CardParticipacao titulo="Comentários respondidos" valor="7" />
      </div>
    </div>
  );
}

export default Dashboard;