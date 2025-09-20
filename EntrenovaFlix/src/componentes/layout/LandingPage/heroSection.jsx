import '../../../styles/global.css'
import '../../../styles/lp.css'
import Button from '../../ui/botões/botao'

function HeroSection(){
    return(
        <div className="hero-section">
                <h1 className="h1Lp">
                    SOLUÇÕES INTELIGENTES PARA A <br />
                    SUA EMPRESA. TREINAMENTO <br />
                    CORPORATIVO PERSONALIZADO.
                </h1>
                <p className='texto-normal'>
                    Unimos arte, mídia e eficiência para criar conteúdos <br />
                    que auxiliem na gestão da sua empresa.
                </p>
                <Button
                    onClick={() => document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" })}
                    className="lpBotao">
                    Quero receber
                </Button>

            </div>
    )
}
export default HeroSection