import GraficoBarras from '../componentes/layout/dashboard/GraficoBarras.js';
import Card from '../componentes/layout/dashboard/Card.js';
import { FaFire } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import '../styles/dashboard.css';

function Dashboard() {

  const categorias = ['Mês 1', 'Mês 2', 'Mês 3']
  const valores = [20, 12, 25]

  const categorias2 = ['Quiz', 'Vídeo', 'Podcast', 'Filme']
  const valores2 = [12, 20, 5, 2]

  return (
    <div className='dashboard'>
      <h1 className='titulo'>Engajamento e performance do usuário</h1>
      <div className='sessao-graficos'>
        <div className='graficos'>
            <GraficoBarras
              titulo="Dias ativos por mês"
              subtitulo="Quantidade de acessos mensais a plataforma"
              categorias={categorias}
              valores={valores}
            />
            <GraficoBarras 
              titulo="Atividades realizadas por tipo"
              subtitulo="Classificação das tarefas executadas por categoria"
              categorias={categorias2}
              valores={valores2}
            />
        </div>
      </div>
      <div className='cards-engajamento'>
        <Card titulo="Acessos semanais" valor="3" icone={<FaCalendarDays className='icone' />} />
        <Card titulo="Tempo gasto nas atividades" valor="10h" icone={<MdTimer className='icone' />} />
        <Card titulo="Dias consecutivos de acesso" valor="7" icone={<FaFire className='icone' />} />
        <Card titulo="Atividades concluídas" valor="3" icone={<FaCheck className='icone' />} />
      </div>
    </div>
  );
}

export default Dashboard;