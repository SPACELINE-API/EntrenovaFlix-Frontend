import GraficoBarras from '../componentes/layout/dashboard/GraficoBarras.js';
import GraficoDesempenho from '../componentes/layout/dashboard/GraficoPizza.js';
import Card from '../componentes/layout/dashboard/Card.js';
import CardParticipacao from '../componentes/layout/dashboard/CardParticipacao.js';
import { FaFire } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import '../styles/dashboard.css'

function Dashboard() {

  const categorias = ['Mês 1', 'Mês 2', 'Mês 3']
  const valores = [20, 12, 25]

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className='sessao-graficos'>
        <h2>Performance</h2>
        <div className='graficos'>
          <div className='conjunto-grafico'>
            <h3 className='titulo-grafico'>Dias ativos por mês</h3>
            <GraficoBarras
              titulo="Dias ativos por mês"
              subtitulo=""
              categorias={categorias}
              valores={valores}
            />
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