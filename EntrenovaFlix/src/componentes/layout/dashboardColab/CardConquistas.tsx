import "../../../styles/dashboard.css";
import award from "../../../assets/imagens/award.png";
import clapperboard from "../../../assets/imagens/clapperboard.png";
import document from "../../../assets/imagens/document.png";
import firefighter from "../../../assets/imagens/firefighter.png";
import rewards from "../../../assets/imagens/rewards.png";
import trophy from "../../../assets/imagens/trophy-star.png";
import approved from "../../../assets/imagens/approved.png";
import college from "../../../assets/imagens/college.png";
import quality from "../../../assets/imagens/quality.png";
import insignia from "../../../assets/imagens/insignia.png";
import diamond from "../../../assets/imagens/diamond.png";
import first from "../../../assets/imagens/first.png";
import favorite from "../../../assets/imagens/favorite.png";
import star from "../../../assets/imagens/star.png";

function CardConquistas() {
    return (
        <div className="card-conquistas">
            <h2 className="legenda-card">Conquistas desbloqueadas</h2>
            <h5 className="legenda">7/14</h5>
            <div className="container-badges">
                <div className="badge-wrapper">
                    <img className="badge" src={award} />
                    <span className="badge-glow"></span>
                    <span className="badge-label"><strong>Disciplina de aço</strong><br />Manter uma sequência mensal</span>
                </div>

                <div className="badge-wrapper">
                    <img className="badge" src={clapperboard} />
                    <span className="badge-glow"></span>
                    <span className="badge-label"><strong>Explorador de trilhas</strong><br />Iniciar 3 trilhas diferentes</span>
                </div>

                <div className="badge-wrapper">
                    <img className="badge" src={document} />
                    <span className="badge-glow"></span>
                    <span className="badge-label"><strong>Nota máxima</strong><br />Acertar tudo em um quiz</span>
                </div>

                <div className="badge-wrapper">
                    <img className="badge" src={firefighter} />
                    <span className="badge-glow"></span>
                    <span className="badge-label"><strong>Maratonista</strong><br />Estudar 7 dias consecutivos</span>
                </div>

                <div className="badge-wrapper">
                    <img className="badge" src={rewards} />
                    <span className="badge-glow"></span>
                    <span className="badge-label"><strong>Primeiros passos</strong><br />Concluír a primeira lição da trilha</span>
                </div>

                <div className="badge-wrapper">
                    <img className="badge" src={trophy} />
                    <span className="badge-glow"></span>
                    <span className="badge-label"><strong>Mestre da trilha</strong><br />Concluir uma trilha completa</span>
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={approved} />
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={quality} />
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={college} />
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={diamond} />
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={first} />
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={favorite} />
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={star} />
                </div>

                <div className="badge-wrapper">
                    <img className="badge-bloqueado" src={insignia} />
                </div>
            </div>
        </div>
    )
}

export default CardConquistas;