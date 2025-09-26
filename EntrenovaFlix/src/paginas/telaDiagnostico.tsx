import { useState, useEffect } from 'react';
import '../styles/diagnostico.css'
import { FaUsers } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdBusiness } from "react-icons/md";
import Button from '../componentes/ui/botões/botao';

export default function TelaDiagnostico() {
  const [diagnosis, setDiagnosis] = useState<{ [key: string]: { strengths: string[]; weaknesses: string[] } } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('segmentedDiagnosis');
    if (stored) {
      setDiagnosis(JSON.parse(stored));
    }
  }, []);

  return (
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
                    {diagnosis?.pessoasCultura?.strengths && diagnosis.pessoasCultura.strengths.length > 0 ? (
                        diagnosis.pessoasCultura.strengths.map((strength, index) => (
                            <div key={index} className="item-ponto">{strength}</div>
                        ))
                    ) : (
                        <div className="item-ponto">Clareza sobre valores</div>
                    )}
                    <div className="ponto-fraco">
                        <span className="bullet">●</span>
                        <span>Pontos a melhorar</span>
                    </div>
                    {diagnosis?.pessoasCultura?.weaknesses && diagnosis.pessoasCultura.weaknesses.length > 0 ? (
                        diagnosis.pessoasCultura.weaknesses.map((weakness, index) => (
                            <div key={index} className="item-ponto">{weakness}</div>
                        ))
                    ) : (
                        <div className="item-ponto">Comunicação interna</div>
                    )}
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
                    {diagnosis?.estruturaOperacoes?.strengths && diagnosis.estruturaOperacoes.strengths.length > 0 ? (
                        diagnosis.estruturaOperacoes.strengths.map((strength, index) => (
                            <div key={index} className="item-ponto">{strength}</div>
                        ))
                    ) : (
                        <div className="item-ponto">Clareza sobre valores</div>
                    )}

                    <div className="ponto-fraco">
                        <span className="bullet">●</span>
                        <span>Pontos a melhorar</span>
                    </div>
                    {diagnosis?.estruturaOperacoes?.weaknesses && diagnosis.estruturaOperacoes.weaknesses.length > 0 ? (
                        diagnosis.estruturaOperacoes.weaknesses.map((weakness, index) => (
                            <div key={index} className="item-ponto">{weakness}</div>
                        ))
                    ) : (
                        <div className="item-ponto">Comunicação interna</div>
                    )}
                </div>
            </div>

            <div className="categoria-resultado">
                <div className="categoria-icon">
                    <MdBusiness size={30} />
                </div>
                <h3 className="categoria-titulo">Mercado & Clientes</h3>
                <div className="pontos-categoria">
                    <div className="ponto-forte">
                        <span className="bullet">●</span>
                        <span>Pontos fortes</span>
                    </div>
                    {diagnosis?.mercadoClientes?.strengths && diagnosis.mercadoClientes.strengths.length > 0 ? (
                        diagnosis.mercadoClientes.strengths.map((strength, index) => (
                            <div key={index} className="item-ponto">{strength}</div>
                        ))
                    ) : (
                        <div className="item-ponto">Clareza sobre valores</div>
                    )}
                    <div className="ponto-fraco">
                        <span className="bullet">●</span>
                        <span>Pontos a melhorar</span>
                    </div>
                    {diagnosis?.mercadoClientes?.weaknesses && diagnosis.mercadoClientes.weaknesses.length > 0 ? (
                        diagnosis.mercadoClientes.weaknesses.map((weakness, index) => (
                            <div key={index} className="item-ponto">{weakness}</div>
                        ))
                    ) : (
                        <div className="item-ponto">Comunicação interna</div>
                    )}
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
            <Button className="btn-agendar">
                Acesse nossos planos
            </Button>
        </div>
    </div>
);}
