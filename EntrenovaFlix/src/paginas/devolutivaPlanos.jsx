import '../styles/devolutiva.css'
import {FaPlay, FaFilm, FaMicrophone} from "react-icons/fa";
import { GiBrain } from "react-icons/gi";


function DevolutivaPlanos(){
    return (
        <div className='telaDevolutiva'>
            <div className="tituloDevolutiva">
                <h1>Sua trilha <span className='destaque' >personalizada</span> </h1>
            </div>
            <div className='corpo'>
                <h2>Com base nas suas respostas, nosso sistema fez uma análise e concluiu que estes são os melhores conteúdos para você!</h2>
                <br/><br/><br/><br/>
                <h2><span className='destaque' >Como ampliar suas vendas online?</span> </h2>
                <br/>
            </div>
            
            <div className="trilha-container">
                <div className="step">
                    <div className="circle"><FaPlay /></div>
                    <span>Vídeo</span>
                </div>
                <div className="step">
                    <div className="circle"><GiBrain /></div>
                    <span>Quiz</span>
                </div>
                <div className="step">
                    <div className="circle"><FaMicrophone /></div>
                    <span>Podcast</span>
                </div>
                <div className="step">
                    <div className="circle"><FaFilm /></div>
                    <span>Filme</span>
                </div>
                <div className="step">
                    <div className="circle"><FaMicrophone /></div>
                    <span>Podcast</span>
                </div>
                <div className="step">
                    <div className="circle"><GiBrain/></div>
                    <span>Quiz</span>
                </div>
                <div className="step">
                    <div className="circle"><FaFilm /></div>
                    <span>Filme</span>
                </div>
            </div>
            <br/>
            <div className='corpo2'>
                <h2>A trilha é composta por 7 materiais e tem como objetivo auxiliar empresas que apresentem dificuldades em vender em ambientes virtuais. Ideal para a sua empresa!</h2>
            </div>
            <button className='botaoTrilha'>Receber minha trilha</button>
            
            <div className='planos'>
                <h1>Escolha o melhor plano para você</h1>
                <br/><br/><br/>
                <h2>Para liberar o acesso as trilhas, falta só mais um passo!</h2>
            </div>

            <div className='planos-container'>
                <div className='plano-card'>
                    <h3>Plano <span className="essencial">essencial</span></h3>
                    <p className='preco'>R$590 por mês</p>
                    <ul>
                        <li>Até 10 usuários</li>
                        <li>Interface básica</li>
                        <li>Acesso às trilhas e mesma experiência para cada usuário</li>
                    </ul>
                    <button className='botao-assinar'>Assinar</button>
                </div>
                <div className='plano-card'>
                    <h3>Plano <span className="premium">premium</span></h3>
                    <p className='preco'>R$990 por mês</p>
                    <ul>
                        <li>Até 60 usuários</li>
                        <li>Personalização parcial da interface com base na identidade da empresa</li>
                        <li>Controle de acesso</li>
                    </ul>
                    <button className='botao-assinar'>Assinar</button>
                </div>
                <div className='plano-card'>
                    <h3>Plano <span className="diamante">diamante</span></h3>
                    <p className='preco'>R$1390 por mês</p>
                    <ul>
                        <li>Usuários ilimitados</li>
                        <li>Personalização total da interface com base na identidade da empresa</li>
                        <li>Experiência customizada para diferentes tipos de usuários</li>
                    </ul>
                    <button className='botao-assinar'>Assinar</button>
                </div>
            </div>
        </div>
    )
}
export default DevolutivaPlanos;