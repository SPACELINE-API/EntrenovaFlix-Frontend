import '../../styles/dashboardRH.css';
import '../../styles/dashboardRHLayout.css';
import GraficoBarras from '../../componentes/layout/dashboard/GraficoBarras';
import { GiProgression } from "react-icons/gi";
import { FaMedal, FaRocket } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DiagnosticoRH: React.FC = () => {
    const [categoriasGrafico1, setCategoriasGrafico1] = useState<string[]>([]);
    const [valoresGrafico1, setValoresGrafico1] = useState<number[]>([]);

    const [categoriasGrafico2, setCategoriasGrafico2] = useState<string[]>([]);
    const [valoresGrafico2, setValoresGrafico2] = useState<number[]>([]);

    const [menuAberto1, setMenuAberto1] = useState<boolean>(false);
    const [menuAberto2, setMenuAberto2] = useState<boolean>(false);
    const [filtro1] = useState<string>('Exportar relatório');
    const [filtro2] = useState<string>('Atualizar diagnóstico');
    const navigate = useNavigate();

    useEffect(() => {
        setCategoriasGrafico1([
            'Pessoas & Cultura',
            'Estrutura & Operações',
            'Mercado & Clientes',
            'Direção & Futuro'
        ]);
        setValoresGrafico1([3.2, 2.1, 2.7, 3.5]);

        const userAnswersMercadoClientes = {
            'mercadoClientes_1': '4',
            'mercadoClientes_2': '1',
            'mercadoClientes_3': '4',
            'mercadoClientes_4': '3',
            'mercadoClientes_5': '2',
            'mercadoClientes_6': '2'
        };

        const labelsGrafico2 = [
            'Escuta Ativa',
            'Colaboração',
            'Reação a Mudanças',
            'Metas e Indicadores',
            'Diferencial',
            'Ferramentas'
        ];

        const dataPointsGrafico2 = [
            parseInt(userAnswersMercadoClientes.mercadoClientes_1, 10),
            parseInt(userAnswersMercadoClientes.mercadoClientes_2, 10),
            parseInt(userAnswersMercadoClientes.mercadoClientes_3, 10),
            parseInt(userAnswersMercadoClientes.mercadoClientes_4, 10),
            parseInt(userAnswersMercadoClientes.mercadoClientes_5, 10),
            parseInt(userAnswersMercadoClientes.mercadoClientes_6, 10)
        ];

        setCategoriasGrafico2(labelsGrafico2);
        setValoresGrafico2(dataPointsGrafico2);
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
                    titulo="Pontuação no diagnóstico inicial"
                    subtitulo="Pontos fortes e fracos da empresa"
                    categorias={categoriasGrafico1}
                    valores={valoresGrafico1}
                />
                <GraficoBarras
                    titulo="Pontuação no diagnóstico específico (Mercado & Clientes)"
                    subtitulo="Áreas de maior defasagem na empresa atualmente"
                    categorias={categoriasGrafico2}
                    valores={valoresGrafico2}
                />
            </div>

            <div className='relatorio'>
                <h1>
                    Relatório para acompanhamento da equipe <GiProgression className="icone-relatorio" />
                </h1>

                <h2 className='relatorio-titulo'>Análise de desempenho</h2>

                <div className='relatorio-cards'>
                    <div className='relatorio-card'>
                        <h4 className='relatorio-subtitulo'>
                            <FaMedal className='icone-indicador' /> Conquistas
                        </h4>
                        <p className='relatorio-texto'>
                            A equipe alcançou um nível significativo de participação, com 98% de presença nos treinamentos
                        </p>
                    </div>

                    <div className='relatorio-card'>
                        <h4 className='relatorio-subtitulo'>
                            <GiStairsGoal className='icone-indicador' /> Desafios
                        </h4>
                        <p className='relatorio-texto'>
                            Os funcionários apresentaram maior dificuldade no quiz “Entendendo seus clientes” da trilha “Vendas Online”
                        </p>
                    </div>

                    <div className='relatorio-card'>
                        <h4 className='relatorio-subtitulo'>
                            <FaRocket className='icone-indicador' /> Oportunidades
                        </h4>
                        <p className='relatorio-texto'>
                            Manter o alto nível de participação e aprimorar o desempenho no módulo “Entendendo seus clientes”
                        </p>
                    </div>
                </div>

                <p className='conclusao'>
                    A equipe demonstra evolução contínua. Recomenda-se reforçar o módulo "Clientes e vendas" e aplicar um
                    novo diagnóstico dentro de 30 dias.
                </p>
            </div>
        </div>
    );
};

export default DiagnosticoRH;
