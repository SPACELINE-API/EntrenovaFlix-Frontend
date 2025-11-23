import "../../../styles/dashboard.css";
import silvermedal from "../../../assets/imagens/silver-medal.png";
import { FaCheckCircle } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { FaFire } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";

function CardUsuario({ nome, nivel }: any) {
    return (
        <div className="card-usuario">
            <div className="container-estatisticas">
                <div className="dados-usuario">
                    <div>
                        <img className="usuario-icon" src={silvermedal} />
                    </div>
                    <div>
                        <h1 className="usuario-nome">{nome}</h1>
                        <h3 className="usuario-nivel">{nivel}</h3>
                    </div>
                </div>
                <ul>
                    <div className="container-titulo">
                        <FaCheckCircle className="lista-icone"/>
                        <li className="lista-titulo">Atividades concluídas</li>
                    </div>
                    <li className="lista-subtitulo">13 atividades</li>
                    <div className="container-titulo">
                        <IoTime className="lista-icone"/>
                        <li className="lista-titulo">Tempo médio gasto nas atividades</li>
                    </div>
                    <li className="lista-subtitulo">10 horas</li>
                    <div className="container-titulo">
                        <FaCalendar className="lista-icone"/>
                        <li className="lista-titulo">Acessos semanais</li>
                    </div>
                    <li className="lista-subtitulo">7 acessos por semana</li>
                    <div className="container-titulo">
                        <FaFire className="lista-icone"/>
                        <li className="lista-titulo">Dias de acessos consecutivos</li>
                    </div>
                    <li className="lista-subtitulo">7 dias</li>
                </ul>
            </div>

        </div>
    )
}

export default CardUsuario;