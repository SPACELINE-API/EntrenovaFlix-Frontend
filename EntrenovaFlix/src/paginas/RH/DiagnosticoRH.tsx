import '../../styles/dashboardRH.css';
import '../../styles/dashboardRHLayout.css';
import GraficoRadar from '../../componentes/layout/dashboard/GraficoRadar';
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
    
    const [labelsGrafico1, setLabelsGrafico1] = useState<string[]>([]);
    const [valoresGrafico1, setValoresGrafico1] = useState<number[]>([]);
    const [titleGrafico1, setTitleGrafico1] = useState<string>('Diagnóstico 1');
    const [subTitleGrafico1, setSubTitleGrafico1] = useState<string>('Nenhuma dimensão selecionada');

    const [labelsGrafico2, setLabelsGrafico2] = useState<string[]>([]);
    const [valoresGrafico2, setValoresGrafico2] = useState<number[]>([]);
    const [titleGrafico2, setTitleGrafico2] = useState<string>('Diagnóstico 2');
    const [subTitleGrafico2, setSubTitleGrafico2] = useState<string>('');

    const [menuAberto1, setMenuAberto1] = useState<boolean>(false);
    const [menuAberto2, setMenuAberto2] = useState<boolean>(false);
    const [filtro1] = useState<string>('Exportar relatório');
    const [filtro2] = useState<string>('Atualizar diagnóstico');
    const navigate = useNavigate();

    const carregarDadosGrafico = (
        formData: any,
        dimensaoKey: string | undefined, 
        setLabels: (cats: string[]) => void, 
        setValores: (vals: number[]) => void,
        setTitle: (title: string) => void,
        setSubTitle: (sub: string) => void
    ) => {
        if (dimensaoKey && DIMENSION_MAP[dimensaoKey] && formData) {
            const map = DIMENSION_MAP[dimensaoKey];
            
            const values = map.keys.map((key: string) => 
                parseInt(formData[key as keyof typeof formData] || '1', 10)
            );

            setTitle(map.title);
            setSubTitle("Pontuação detalhada (1-4)");
            setLabels(map.labels);
            setValores(values);
        } else {
            setTitle(dimensaoKey ? "Dimensão Inválida" : "Diagnóstico");
            setSubTitle(dimensaoKey ? "Não foi possível carregar" : "Nenhuma dimensão selecionada");
            setLabels([]);
            setValores([]);
        }
    };

    useEffect(() => {
        const storedFormData = localStorage.getItem('userFormAnswers');
        const formData = storedFormData ? JSON.parse(storedFormData) : null;

        const selectedDimensions = formData?.dimensoesAvaliar || [];

        if (formData && selectedDimensions.length > 0) {
            const keyDim1 = selectedDimensions[0];
            carregarDadosGrafico(formData, keyDim1, setLabelsGrafico1, setValoresGrafico1, setTitleGrafico1, setSubTitleGrafico1);

            const keyDim2 = selectedDimensions[1]; 
            carregarDadosGrafico(formData, keyDim2, setLabelsGrafico2, setValoresGrafico2, setTitleGrafico2, setSubTitleGrafico2);
        } else {
            carregarDadosGrafico(null, undefined, setLabelsGrafico1, setValoresGrafico1, setTitleGrafico1, setSubTitleGrafico1);
            carregarDadosGrafico(null, undefined, setLabelsGrafico2, setValoresGrafico2, setTitleGrafico2, setSubTitleGrafico2);
        }
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
                {labelsGrafico1.length > 0 ? (
                    <GraficoRadar
                        titulo={titleGrafico1}
                        subtitulo={subTitleGrafico1}
                        labels={labelsGrafico1}
                        valores={valoresGrafico1}
                    />
                ) : (
                    <div className="trilhas-grafico-vazio">
                        <p>{subTitleGrafico1}</p>
                    </div>
                )}
                
                {labelsGrafico2.length > 0 ? (
                    <GraficoRadar
                        titulo={titleGrafico2}
                        subtitulo={subTitleGrafico2}
                        labels={labelsGrafico2}
                        valores={valoresGrafico2}
                    />
                ) : (
                     <div className="trilhas-grafico-vazio">
                        <p>{subTitleGrafico2}</p>
                    </div>
                )}
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

                <p className='conclusao'>A equipe demonstra evolução contínua. Recomenda-se reforçar os módulos com menor pontuação e aplicar um
                    novo diagnóstico dentro de 30 dias.</p>
            </div>
        </div>
    );
};

export default DiagnosticoRH;