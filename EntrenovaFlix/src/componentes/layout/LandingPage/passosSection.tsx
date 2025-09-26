import '../../../styles/global.css';
import '../../../styles/lp.css';
import { FaFileAlt, FaVideo } from 'react-icons/fa';
import { BsPencilSquare } from "react-icons/bs";
import Button from '../../ui/botões/botao';

function PassoSection() {
    return (
        <section className="passo-a-passo-section">
            <div className="container">
                <h2>Passo a passo para assinar nosso serviço</h2>
                <div className="passo-a-passo-content">

                    <div className="decorative-shape-container">
                        <svg 
                            width="100%" 
                            height="100%" 
                            viewBox="0 0 537 1001" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                        >
                            <g filter="url(#filter0_f_208_95)">
                                <rect 
                                    x="-485" 
                                    y="500.111" 
                                    width="712.675" 
                                    height="758.791" 
                                    rx="56" 
                                    transform="rotate(-46.7522 -485 500.111)" 
                                    fill="url(#paint0_linear_208_95)"
                                />
                            </g>
                            <defs>
                                <filter 
                                    id="filter0_f_208_95" 
                                    x="-465.841" 
                                    y="0.158691" 
                                    width="1002.68" 
                                    height="1000.68" 
                                    filterUnits="userSpaceOnUse" 
                                    colorInterpolationFilters="sRGB" 
                                >
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                                </filter>
                                <linearGradient 
                                    id="paint0_linear_208_95" 
                                    x1="171.29" 
                                    y1="660.429" 
                                    x2="-433.718" 
                                    y2="1091.42" 
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#5A4FCF"/>
                                    <stop offset="1" stopColor="#171717"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    
                    <div className="passo-a-passo-imagem">
                        <img src="https://i.imgur.com/ALO3MaG.png" alt="Produção de vídeo profissional" />
                    </div>
                    <div className="passo-a-passo-lista">
                        <div className="passo-item">
                            <FaFileAlt className="passo-icon" />
                            <div className="passo-texto">
                                <h3>Diagnóstico inicial</h3>
                                <p>Responda um formulário para receber um diagnóstico simples sobre as principais dores da sua empresa.</p>
                            </div>
                        </div>
                        <div className="passo-item">
                            <BsPencilSquare className="passo-icon" />
                            <div className="passo-texto">
                                <h3>Diagnóstico aprofundado</h3>
                                <p>Entre em contato com um consultor para receber um diagnóstico aprofundado, que aponte as soluções para o seu problema.</p>
                            </div>
                        </div>
                        <div className="passo-item">
                            <FaVideo className="passo-icon" />
                            <div className="passo-texto">
                                <h3>Trilhas</h3>
                                <p>Receba trilhas educativas personalizadas com conteúdos relevantes para a sua empresa.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Button className="info-lpBotao">
                    <p>As trilhas são compostas de 7 a 10 materiais que incluem vídeos, filmes, podcasts, quizzes e outros conteúdos audiovisuais.</p>
                </Button>
            </div>
        </section>
    );
}

export default PassoSection;