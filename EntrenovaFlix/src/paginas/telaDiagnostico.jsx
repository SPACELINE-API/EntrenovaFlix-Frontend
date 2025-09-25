import '../styles/diagnostico.css'
import { FaUsers } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { TbDirectionsFilled } from "react-icons/tb";

export default function TelaDiagnostico() { return (
    <div className="diagnostico-container">
        <div className="diagnostico-head">
            <h1 className="diagnostico-titulo">Seus <br /> resultados</h1>
            <p className="diagnostico-subtitulo">
                Com base nas suas respostas, aqui está um retrato inicial com os pontos fortes da sua 
                empresa e as oportunidades de crescimento.
            </p>
        </div>
        <div className="resultados-grid">
            <div className="categoria-resultado">
                <div className="categoria-icon">
                    <FaUsers size={30} />
                </div>
                <h3 className="categoria-titulo">Pessoas & Cultura</h3>
                <div className="pontos-categoria">
                    <div className="ponto-forte">
                        <span className="bullet">●</span>
                        <span>Pontos fortes</span>
                    </div>
                    <div className="item-ponto">Clareza sobre valores</div>
                    <div className="ponto-fraco">
                        <span className="bullet">●</span>
                        <span>Pontos a melhorar</span>
                    </div>
                    <div className="item-ponto">Comunicação interna</div>
                </div>
            </div>

            <div className="categoria-resultado">
                <div className="categoria-icon">
                    <PiTreeStructureFill size={30} />
                </div>
                <h3 className="categoria-titulo">Estruturas & Operações</h3>
                <div className="pontos-categoria">
                    <div className="ponto-forte">
                        <span className="bullet">●</span>
                        <span>Pontos fortes</span>
                    </div>
                    <div className="item-ponto">Clareza sobre valores</div>
            
                    <div className="ponto-fraco">
                        <span className="bullet">●</span>
                        <span>Pontos a melhorar</span>
                    </div>
                    <div className="item-ponto">Comunicação interna</div>
                </div>
            </div>

            <div className="categoria-resultado">
                <div className="categoria-icon">
                    <TbDirectionsFilled size={30} />
                </div>
                <h3 className="categoria-titulo">Direção & futuro</h3>
                <div className="pontos-categoria">
                    <div className="ponto-forte">
                        <span className="bullet">●</span>
                        <span>Pontos fortes</span>
                    </div>
                    <div className="item-ponto">Clareza sobre valores</div>
                    <div className="ponto-fraco">
                        <span className="bullet">●</span>
                        <span>Pontos a melhorar</span>
                    </div>
                    <div className="item-ponto">Comunicação interna</div>
                </div>
            </div>
        </div>
        <div className="importancia-secao">
            <h2 className="secao-titulo">Porque tudo isso importa?</h2>
            <div className="importancia-content">
                <p>Quando a estratégia não é traduzida para o cotidiano (...)</p>
            </div>
        </div>

        <div className="proximos-passos-secao">
            <h2 className="secao-titulo">Próximos passos</h2>
            <div className="proximos-passos-content">
                <p>Quando a estratégia não é traduzida para o cotidiano (...)</p>
            </div>
        </div>

        <div className="cta-secao">
            <h2 className="cta-titulo">E agora?</h2>
            <p className="cta-texto">
                Para receber um relatório completo e um diagnóstico aprofundado, entre em contato 
                conosco!
            </p>
            <button className="btn-agendar">
                Agendar consultoria
            </button>
        </div>
    </div>
);}
