import Card from "../../componentes/layout/dashboard/Card";
import '../../styles/dashboardRH.css';
import '../../styles/dashboardRHLayout.css';
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";
import { FaFire } from "react-icons/fa6";
import { MdTimer } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import GraficoLinhas from "../../componentes/layout/dashboard/GraficoLinhas.tsx";

function TrilhasRH() {

    const acessos = [50, 60, 100, 80, 55, 96, 32]
    const atividadesConcluidas = [23, 34, 56, 78, 32, 57, 60]
    const comentarios = [7, 9, 8, 12, 11, 10, 5]
    const tempoSessao = [43, 56, 72, 78, 70, 71, 71]
    
    return (
        <div>
            <h1 className="titulo">Trilhas</h1>
            <div className="trilhas-topo">
                <GraficoLinhas
                    acessos={acessos}
                    atividadesConcluidas={atividadesConcluidas}
                    comentarios={comentarios}
                    tempoSessao={tempoSessao}
                />
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