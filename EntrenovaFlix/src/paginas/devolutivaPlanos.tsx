import '../styles/devolutiva.css';
import { FaPlay, FaFilm, FaMicrophone, FaWhatsapp, FaEnvelope, FaQuestionCircle, FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type PlanoEscolhido = 'essencial' | 'premium' | 'diamante';

function DevolutivaPlanos() {
    const planosRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleAssinarClick = (planoId: PlanoEscolhido) => {
        navigate('/cadastro', { state: { planoPreSelecionado: planoId } });
    };

    return (
        <>
            <div className='telaDevolutiva'>
                <div className="tituloDevolutiva">
                    <h1>Sua trilha <span className='destaque'>personalizada</span> está pronta!</h1>
                </div>

                <div className='corpo'>
                    <h2>Com base nas suas respostas, nosso sistema analisou seu perfil e montou a trilha ideal para você decolar.</h2>
                    <br />
                    <br />
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
                        <div className="circle"><GiBrain /></div>
                        <span>Quiz</span>
                    </div>
                    <div className="step">
                        <div className="circle"><FaFilm /></div>
                        <span>Filme</span>
                    </div>
                </div>

                <br />

                <div className='corpo2'>
                    <h2>A trilha é composta por 7 materiais e tem como objetivo auxiliar empresas que apresentem dificuldades em vender em ambientes virtuais. Ideal para a sua empresa!</h2>
                </div>
            </div>

            <div className="beneficios-secao">
                <h2 className="planos-titulo">O que você ganha com a <span className='destaque'>EntreNovaFlix</span>?</h2>
                <div className="beneficios-container">
                    <div className="beneficio-item">
                        <FaStar size={30} />
                        <h3>Conteúdo Personalizado</h3>
                        <p>Trilhas de aprendizado que se adaptam exatamente ao que sua empresa precisa.</p>
                    </div>
                    <div className="beneficio-item">
                        <GiBrain size={30} />
                        <h3>Metodologia Prática</h3>
                        <p>Módulos com vídeos, quizzes e podcasts focados em aplicação direta no seu negócio.</p>
                    </div>
                    <div className="beneficio-item">
                        <FaCheckCircle size={30} />
                        <h3>Resultados Mensuráveis</h3>
                        <p>Acompanhe o progresso da sua equipe e veja o impacto real nas suas vendas.</p>
                    </div>
                </div>
            </div>

            <div className='planos' ref={planosRef}>
                <h1 className='planos-titulo'>Encontre o plano perfeito para sua equipe</h1>
                <br />
                <p className="planos-subtitulo">
                    A EntreNovaFlix é sua plataforma de streaming B2B. Nossos planos dão acesso a
                    trilhas personalizadas, vídeos, podcasts e entretenimento focado em
                    resolver problemas reais da sua empresa.
                </p>
            </div>

            <div className="tabela-planos-container">
                <div className="tabela-planos-wrapper">
                    <table className="tabela-planos">
                        <thead>
                            <tr>
                                <th className="feature-header">Recursos</th>

                                <th className="header-plano">
                                    <span className="plano-nome essencial">essencial</span>
                                    <p className="preco">R$590 <span className="preco-sufixo">/mês</span></p>
                                    <p className="descricao-plano">Ideal para pequenas equipes.</p>
                                </th>

                                <th className="header-plano popular">
                                    <span className="plano-nome premium">premium</span>
                                    <p className="preco">R$990 <span className="preco-sufixo">/mês</span></p>
                                    <p className="descricao-plano">Perfeito para empresas em crescimento.</p>
                                </th>

                                <th className="header-plano">
                                    <span className="plano-nome diamante">diamante</span>
                                    <p className="preco">R$1390 <span className="preco-sufixo">/mês</span></p>
                                    <p className="descricao-plano">A solução completa.</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="feature-name">Usuários</td>
                                <td>Até 10</td>
                                <td>Até 60</td>
                                <td>Ilimitados</td>
                            </tr>
                            <tr>
                                <td className="feature-name">Acesso a todas as trilhas</td>
                                <td><FaCheckCircle className='check' /></td>
                                <td><FaCheckCircle className='check' /></td>
                                <td><FaCheckCircle className='check' /></td>
                            </tr>
                            <tr>
                                <td className="feature-name">Interface básica</td>
                                <td><FaCheckCircle className='check' /></td>
                                <td><FaCheckCircle className='check' /></td>
                                <td><FaCheckCircle className='check' /></td>
                            </tr>
                            <tr>
                                <td className="feature-name">Personalização da interface</td>
                                <td><FaTimesCircle className='times' /></td>
                                <td>Personalização parcial</td>
                                <td>Personalização total</td>
                            </tr>
                            <tr>
                                <td className="feature-name">Controle de acesso</td>
                                <td><FaTimesCircle className='times' /></td>
                                <td><FaCheckCircle className='check' /></td>
                                <td>Avançado</td>
                            </tr>
                            <tr>
                                <td className="feature-name">Experiência customizada</td>
                                <td><FaTimesCircle className='times' /></td>
                                <td><FaTimesCircle className='times' /></td>
                                <td><FaCheckCircle className='check' /></td>
                            </tr>
                            <tr>
                                <td className="feature-name"></td>
                                <td className="btn-assinar-cell">
                                    <button className='botao-assinar' onClick={() => handleAssinarClick('essencial')}>Assinar</button>
                                </td>
                                <td className="btn-assinar-cell">
                                    <button className='botao-assinar popular-btn' onClick={() => handleAssinarClick('premium')}>Assinar</button>
                                </td>
                                <td className="btn-assinar-cell">
                                    <button className='botao-assinar' onClick={() => handleAssinarClick('diamante')}>Assinar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="faq-secao">
                <h2 className="planos-titulo">Dúvidas Frequentes</h2>
                <div className="faq-container">
                    <details className="faq-item">
                        <summary>
                            <FaQuestionCircle className='faq-icon' />
                            Posso cancelar a qualquer momento?
                        </summary>
                        <p>Sim! Você pode cancelar sua assinatura a qualquer momento, sem taxas ou multas. Seu acesso continuará ativo até o fim do período já pago.</p>
                    </details>
                    <details className="faq-item">
                        <summary>
                            <FaQuestionCircle className='faq-icon' />
                            Como funciona o pagamento?
                        </summary>
                        <p>O pagamento é feito mensalmente via cartão de crédito. Para planos anuais com desconto, entre em contato com nossa equipe.</p>
                    </details>
                    <details className="faq-item">
                        <summary>
                            <FaQuestionCircle className='faq-icon' />
                            O que acontece se eu precisar de mais usuários?
                        </summary>
                        <p>Você pode fazer o upgrade do seu plano a qualquer momento diretamente no seu painel de controle. A cobrança será feita pro-rata.</p>
                    </details>
                </div>
            </div>

            <div className="contato-secao">
                <h2 className="planos-titulo">Ainda tem dúvidas?</h2>
                <p className="contato-subtitulo">Nossa equipe está pronta para ajudar você a escolher o melhor plano.</p>
                <div className="contato-container">
                    <a 
                        href="https://mail.google.com/mail/u/0/?tf=cm&to=contato@entrenovaflix.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contato-link-box email"
                        >
                        <FaEnvelope size={24} />
                        <span>Enviar um E-mail</span>
                    </a>
                    <a href="https://api.whatsapp.com/send?phone=5511000000000" target="_blank" rel="noopener noreferrer" className="contato-link-box whatsapp">
                        <FaWhatsapp size={24} />
                        <span>Falar no WhatsApp</span>
                    </a>
                </div>
            </div>

            <a href="https://api.whatsapp.com/send?phone=5511000000000" className="whatsapp-float" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={32} />
            </a>
        </>
    );
}

export default DevolutivaPlanos;
