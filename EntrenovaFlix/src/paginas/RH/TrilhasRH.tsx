import GraficoAtividade from "../../componentes/layout/dashboard/GraficoAtividade";
import Card from "../../componentes/layout/dashboard/Card";
import '../../styles/dashboardRH.css';
import '../../styles/dashboardRHLayout.css'
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaFire } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function TrilhasRH() {
    return (
        <div>
            <div className="trilhas-topo">
                <GraficoAtividade />
                <div className="trilhas-ativas">
                    <h2 className="subtitulo">TRILHAS ATIVAS</h2>
                    <h3 className="card-trilhas-ativas"> <FaCircleArrowUp className="icone-trilhas" /> Vendas online</h3>
                    <h3 className="card-trilhas-ativas"> <FaCircleArrowUp className="icone-trilhas" /> Liderança persuasiva</h3>
                </div>
            </div>
            <div className="trilhas-cards">
                <Card titulo="Tempo médio gasto nas atividades" valor="18h" icone={<MdTimer className='icone' />} />
                <Card titulo="Atividades concluídas" valor="55" icone={<FaCheck className='icone' />} />
                <Card titulo="Acessos semanais" valor="150" icone={<FaCalendarDays className='icone' />} />
                <Card titulo="Média de acessos consecutivos" valor="3.5 dias" icone={<FaFire className='icone' />} />
            </div>
        </div>
    );
}

export default TrilhasRH;