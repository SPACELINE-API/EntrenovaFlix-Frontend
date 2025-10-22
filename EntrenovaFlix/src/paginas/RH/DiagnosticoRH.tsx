import '../../styles/dashboardRH.css';
import '../../styles/dashboardRHLayout.css';
import GraficoBarras from '../../componentes/layout/dashboard/GraficoBarras';
import { GiProgression } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import { FaRocket } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DIMENSION_MAP: any = {
    pessoasCultura: {
      title: 'Pessoas & Cultura',
      labels: ['Comunicação', 'Liderança', 'Res. Problemas', 'Rotina', 'Valores', 'Ferramentas'],
      keys: ['pessoasCultura_1', 'pessoasCultura_2', 'pessoasCultura_3', 'pessoasCultura_4', 'pessoasCultura_5', 'pessoasCultura_6']
    },
    estruturaOperacoes: {
      title: 'Estrutura & Operações',
      labels: ['Troca de Info.', 'Delegação', 'Falha de Processo', 'Autonomia', 'Qualidade', 'Ferramentas Op.'], 
      keys: ['estruturaOperacoes_1', 'estruturaOperacoes_2', 'estruturaOperacoes_3', 'estruturaOperacoes_4', 'estruturaOperacoes_5', 'estruturaOperacoes_6']
    },
    mercadoClientes: {
      title: 'Mercado & Clientes',
      labels: ['Escuta Ativa', 'Vendas/Atend.', 'Reação a Mudanças', 'Metas', 'Diferencial', 'Ferramentas Rel.'],
      keys: ['mercadoClientes_1', 'mercadoClientes_2', 'mercadoClientes_3', 'mercadoClientes_4', 'mercadoClientes_5', 'mercadoClientes_6']
    },
    direcaoFuturo: {
      title: 'Direção & Futuro',
      labels: ['Visão', 'Conexão Estratégia', 'Inovação', 'Ativ. Diárias', 'Propósito', 'Ferramentas Est.'],
      keys: ['direcaoFuturo_1', 'direcaoFuturo_2', 'direcaoFuturo_3', 'direcaoFuturo_4', 'direcaoFuturo_5', 'direcaoFuturo_6']
    }
};

const DiagnosticoRH: React.FC = () => {
    
    const [categoriasGrafico1, setCategoriasGrafico1] = useState<string[]>([]);
    const [valoresGrafico1, setValoresGrafico1] = useState<number[]>([]);
    const [titleGrafico1, setTitleGrafico1] = useState<string>('Diagnóstico Geral');
    const [subTitleGrafico1, setSubTitleGrafico1] = useState<string>('Carregando...');

    const [categoriasGrafico2, setCategoriasGrafico2] = useState<string[]>([]);
    const [valoresGrafico2, setValoresGrafico2] = useState<number[]>([]);
    const [titleGrafico2, setTitleGrafico2] = useState<string>('Diagnóstico Específico');
    const [subTitleGrafico2, setSubTitleGrafico2] = useState<string>('');

    const [menuAberto1, setMenuAberto1] = useState<boolean>(false);
    const [menuAberto2, setMenuAberto2] = useState<boolean>(false);
    const [filtro1] = useState<string>('Exportar relatório');
    const [filtro2] = useState<string>('Atualizar diagnóstico');
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem('userFormAnswers');
        const formData = storedData ? JSON.parse(storedData) : null;

        if (formData && formData.dimensoesAvaliar && formData.dimensoesAvaliar.length > 0) {
            
            const labelsGrafico1: string[] = [];
            const sumsGrafico1: number[] = [];
            
            const selectedDimensions = formData.dimensoesAvaliar;

            for (const dimKey of selectedDimensions) {
                const mapEntry = DIMENSION_MAP[dimKey];
                
                if (mapEntry) {
                    labelsGrafico1.push(mapEntry.title); 
                    
                    let sum = 0;
                    const questionKeys = mapEntry.keys;

                    for (const qKey of questionKeys) {
                        const scoreString = formData[qKey];
                        if (scoreString) {
                            sum += parseInt(scoreString, 10);
                        }
                    }
                    
                    sumsGrafico1.push(sum);
                }
            }
            
            setTitleGrafico1("Pontuação Total por Dimensão");
            setSubTitleGrafico1("Soma total dos pontos (Máx: 24)");
            setCategoriasGrafico1(labelsGrafico1);
            setValoresGrafico1(sumsGrafico1);

        } else {
            setTitleGrafico1("Nenhum diagnóstico encontrado");
            setSubTitleGrafico1("Por favor, complete o formulário");
            setCategoriasGrafico1([]);
            setValoresGrafico1([]);
        }

        setTitleGrafico2("Exemplo Diagnóstico Específico");
        setSubTitleGrafico2("Valores fixos de exemplo");
        setCategoriasGrafico2(['Estratégia', 'Marketing', 'Finanças', 'Operações']);
        setValoresGrafico2([9, 16, 21, 14]);

    }, []); 

    const handleOptionClick1 = (opcao: string) => {
        console.log('Selecionou:', opcao);
        setMenuAberto1(false);
    };
    const handleOptionClick2 = (opcao: string) => {
        console.log('Selecionou:', opcao);
        setMenuAberto2(false);
    };

    return (
        <div>
            <h1 className="titulo">Diagnósticos</h1>

            <div className='diagnostico-botoes'>
                <div className="dropdown-btn">
                    <button onClick={() => setMenuAberto1(!menuAberto1)}>
                        {filtro1}
                        <TiArrowSortedDown
                            style={{
                                transform: menuAberto1 ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s'
                            }}
                        />
                    </button>

                    {menuAberto1 && (
                        <ul className="dropdown-menu">
                            <li className='menu-opcao' onClick={() => handleOptionClick1('Diagnóstico inicial')}>Diagnóstico inicial</li>
                            <li className='menu-opcao' onClick={() => handleOptionClick1('Diagnóstico específico')}>Diagnóstico específico</li>
                            <li className='menu-opcao' onClick={() => handleOptionClick1('Relatório da equipe')}>Relatório da equipe</li>
                        </ul>
                    )}
                </div>
                <div className="dropdown-btn">
                    <button onClick={() => setMenuAberto2(!menuAberto2)}>
                        {filtro2}
                        <TiArrowSortedDown
                            style={{
                                transform: menuAberto2 ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s'
                            }}
                        />
                    </button>

                    {menuAberto2 && (
                        <ul className="dropdown-menu">
                            <li className='menu-opcao' onClick={() => handleOptionClick2('Inicial')}>Diagnóstico inicial</li>
                            <li className='menu-opcao' onClick={() => handleOptionClick2('Específico')}>Diagnóstico específico</li>
                        </ul>
                    )}
                </div>
            </div>

            <div className='diagnostico-graficos'>
                <GraficoBarras
                    titulo={titleGrafico1}
                    subtitulo={subTitleGrafico1}
                    categorias={categoriasGrafico1}
                    valores={valoresGrafico1}
                />
                <GraficoBarras
                    titulo={titleGrafico2}
                    subtitulo={subTitleGrafico2}
                    categorias={categoriasGrafico2}
                    valores={valoresGrafico2}
                />
            </div>

            <div className='relatorio'>
                <h1>Relatório para acompanhamento da equipe <GiProgression className="icone-relatorio" /></h1>

                <h2 className='relatorio-titulo'>Análise de desempenho</h2>
                <div className='relatorio-cards'>
                    <div className='relatorio-card'>
                        <h4 className='relatorio-subtitulo'> <FaMedal className='icone-indicador'/> Conquistas</h4>
                        <p className='relatorio-texto'>
                            A equipe alcançou um nível significativo de participação, com 98% de presença nos treinamentos s
                        </p>
                    </div>
                    <div className='relatorio-card'>
                        <h4 className='relatorio-subtitulo'> <GiStairsGoal className='icone-indicador'/> Desafios</h4>
                        <p className='relatorio-texto'>
                            Os funcionários apresentaram maior dificuldade no quiz “Entendendo seus clientes” da trilha “Vendas Online”
s                       </p>
                    </div>
                    <div className='relatorio-card'>
                        <h4 className='relatorio-subtitulo'> <FaRocket className='icone-indicador'/> Oportunidades</h4>
                        <p className='relatorio-texto'>
                            Manter o alto nível de participação e aprimorar o desempenho no módulo “Entendendo seus clientes”
                        </p>
                    </div>
                </div>

                <p className='conclusao'>A equipe demonstra evolução contínua. Recomenda-se reforçar o módulo "Clientes e vendas" e aplicar um
                    novo diagnóstico dentro de 30 dias.</p>
            </div>
        </div>
    );
};

export default DiagnosticoRH;