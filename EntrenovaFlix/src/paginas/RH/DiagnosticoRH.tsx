import '../../styles/dashboardRH.css';
import '../../styles/dashboardRHLayout.css';
import GraficoBarras from '../../componentes/layout/dashboard/GraficoBarras';
import { GiProgression } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";
import { GiStairsGoal } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { IoMdPerson } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiagnosticoRH: React.FC = () => {

    const categoriasGrafico1: string[] = ['Liderança', 'Motivação', 'Gestão', 'Inovação'];
    const valoresGrafico1: number[] = [5, 12, 18, 27];

    const categoriasGrafico2: string[] = ['Estratégia', 'Marketing', 'Finanças', 'Operações'];
    const valoresGrafico2: number[] = [9, 16, 21, 14];

    const [menuAberto1, setMenuAberto1] = useState<boolean>(false);
    const [menuAberto2, setMenuAberto2] = useState<boolean>(false);
    const [filtro1] = useState<string>('Exportar relatório');
    const [filtro2] = useState<string>('Atualizar diagnóstico');
    const navigate = useNavigate();

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
                    titulo="Pontuação no diagnóstico específico"
                    subtitulo="Áreas de maior defasagem na empresa atualmente"
                    categorias={categoriasGrafico2}
                    valores={valoresGrafico2}
                />
            </div>

            <div className='relatorio'>
                <h1>Relatório para acompanhamento da equipe <GiProgression className="icone-relatorio" /></h1>

                <div className='relatorio-visaoGeral'>
                    <h2 className='relatorio-titulo'>Visão geral</h2>
                    <div>
                        <h3 className='relatorio-subtitulo'> <FaMedal /> Conquistas:</h3>
                        <p className='relatorio-texto'>
                            Os funcionários acessaram todos os conteúdos mais de duas vezes, demonstrando empenho e engajamento
                        </p>
                    </div>
                    <div>
                        <h3 className='relatorio-subtitulo'> <GiStairsGoal /> Desafios:</h3>
                        <p className='relatorio-texto'>
                            Os funcionários apresentaram maior dificuldade no quizz "Entendendo seus clientes" da trilha "Vendas online"
                        </p>
                    </div>
                </div>

                <div className='relatorio-desempenho'>
                    <h2 className='relatorio-titulo'>Desempenho</h2>
                    <div>
                        <h3 className='relatorio-subtitulo'> <RiTeamFill /> Desempenho geral:</h3>
                        <p className='relatorio-texto'>
                            A equipe apresentou um nível de desempenho elevado, com 80% das atividades concluídas
                        </p>
                    </div>
                    <div>
                        <h3 className='relatorio-subtitulo'> <IoMdPerson /> Desempenho individual:</h3>
                        <p className='relatorio-texto'>
                            75% dos funcionários tiveram um alto nível de engajamento com as atividades
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticoRH;