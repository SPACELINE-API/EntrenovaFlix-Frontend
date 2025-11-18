import { BsPersonCheckFill } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import '../../styles/diagnosticoAdmin.css'
import  GraficoLinhaProps from '../../componentes/graficos/diagnosticoAdmin'
import GraficoColunaProps from  '../../componentes/graficos/trilhasAdmin'
import HobbiesPraticados from "../../componentes/graficos/hobbies";

function DiagnosticoAdmin(){
    return(
        <>
        <h1 className="titulo">Diagnóstico da empresa x</h1>
        <div className="iconUser">
            <BsPersonCheckFill size={27} />
            <p> 92 Usuários ativos</p>
        </div>
        <div className="graficos-container">
            <GraficoLinhaProps />
            <HobbiesPraticados/>
        </div>
            <GraficoColunaProps/>
        <div className="card-historico">
                <h1>Histórico de atividade</h1>
                <div className="item-historico">
                    <div className="historico-icon">
                        <BsCheckCircleFill size={20} />
                        <div className="line"></div>
                    </div>
                    <div className="historico-conteudo">
                        <div className="titulo-linha">
                            <span className="titulo-atividade">Atividade concluída</span>
                            <span className="data">22/09/2025</span>
                        </div>

                        <p className="descricao">Quiz: Hábitos de um bom vendedor</p>
                    </div>
                </div>
                <div className="item-historico">
                    <div className="historico-icon">
                        <BsCheckCircleFill size={20} />
                    </div>

                    <div className="historico-conteudo">
                        <div className="titulo-linha">
                            <span className="titulo-atividade">Trilha finalizada</span>
                            <span className="data">22/09/2025</span>
                        </div>
                         <p className="descricao">Como ampliar suas vendas online?</p>
                     </div>
                </div>
            </div>
        </>

      
    )
}
export default DiagnosticoAdmin