import '../../../styles/global.css'
import '../../../styles/lp.css'
import { PiLineVertical } from "react-icons/pi";

function MotivosSection() {
    return (
        <section className="motivos-section">
            <h2 className='motivos-titulo'>O que o Diagnóstico Organizacional oferece?</h2>
            <div className="motivos-grid">
                <div className="motivo-card">
                    <div className="motivo-header">
                        <span className="motivo-numero">1</span>
                        <h3>Conteúdo <br />personalizado</h3>
                    </div>
                    <div className="motivo-content">
                        <PiLineVertical className="motivo-line-icon"/> 
                        <p>Cada empresa recebe uma solução exclusiva que atenda sua necessidade. A trilha tem conteúdos personalizados especialmente para você.</p>
                    </div>
                </div>
                <div className="motivo-card">
                    <div className="motivo-header">
                        <span className="motivo-numero">2</span>
                        <h3>Produção <br /> audiovisual</h3>
                    </div>
                    <div className="motivo-content">
                        <PiLineVertical className="motivo-line-icon" /> 
                        <p>Todo conteúdo das trilhas é feito com muita qualidade, e sob o olhar de uma curadoria que foca na resolução do seu problema.</p>
                    </div>
                </div>
                <div className="motivo-card">
                    <div className="motivo-header">
                        <span className="motivo-numero">3</span>
                        <h3>Desenvolvimento <br /> criativo</h3>
                    </div>
                        <div className="motivo-content">
                            <PiLineVertical className="motivo-line-icon" /> 
                            <p>Desenvolvemos projetos originais focados nas dores da sua empresa. Uma solução única para o seu problema.</p>
                        </div>              
                    </div>
            </div>
        </section>
    );
}

export default MotivosSection;