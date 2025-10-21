import { useState, useEffect, ElementType } from 'react';
import '../styles/diagnostico.css';
import { FaUsers, FaDirections } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdBusiness } from "react-icons/md";
import { useQuestionnaire } from '../contexts/QuestionnaireContext';

interface DiagnosisData {
  fortes: string[];
  fracos: string[];
  recomendacao: string[];
}

interface SegmentedDiagnosis {
  pessoasCultura?: DiagnosisData;
  estruturaOperacoes?: DiagnosisData;
  mercadoClientes?: DiagnosisData;
  direcaoFuturo?: DiagnosisData;
}

const categoriesConfig: {
  key: keyof SegmentedDiagnosis;
  title: string;
  Icon: ElementType;
}[] = [
  { key: 'pessoasCultura', title: 'Pessoas & Cultura', Icon: FaUsers },
  { key: 'estruturaOperacoes', title: 'Estrutura & Operações', Icon: PiTreeStructureFill },
  { key: 'mercadoClientes', title: 'Mercado & Clientes', Icon: MdBusiness },
  { key: 'direcaoFuturo', title: 'Direção & Futuro', Icon: FaDirections },
];

const RenderPoints = ({ title, points, type }: { title: string, points: string[], type: 'forte' | 'fraco' }) => {
  const hasPoints = points && points.length > 0;
  return (
    <>
      <div className={`ponto-${type}`}>
        <span className="bullet">●</span>
        <span>{title}</span>
      </div>
      {hasPoints ? (
        points.map((point, index) => (
          <div key={index} className="item-ponto">{point}</div>
        ))
      ) : (
        <div className="item-ponto-fallback">
          {type === 'forte' ? 'Nenhum ponto forte encontrado.' : 'Nenhum ponto a melhorar encontrado.'}
        </div>
      )}
    </>
  );
};

export default function TelaDiagnostico() {
  const { diagnosticResult, hasDiagnosticResult } = useQuestionnaire();
  
  // O estado de 'loading' pode ser inferido diretamente pelo hasDiagnosticResult
  const loading = !hasDiagnosticResult;

  if (loading) {
    return <div className="diagnostico-container"><p>Carregando resultados...</p></div>;
  }

  // Se não há resultado, ou se o objeto de resultado está vazio, mostramos a mensagem de erro.
  if (!diagnosticResult || Object.keys(diagnosticResult).length === 0) {
    return <div className="diagnostico-container"><p>Nenhum diagnóstico encontrado ou os dados estão em um formato inesperado. Por favor, complete o formulário primeiro.</p></div>;
  }

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
        {categoriesConfig.map(({ key, title, Icon }) => {
          // Usamos o diagnosticResult diretamente, que já tem a estrutura correta.
          const categoryData = diagnosticResult[key as keyof SegmentedDiagnosis];
          if (!categoryData) return null;

          return (
            <div className="categoria-resultado" key={key}>
              <div className="categoria-icon"><Icon size={30} /></div>
              <h3 className="categoria-titulo">{title}</h3>
              <div className="pontos-categoria">
                <RenderPoints title="Pontos fortes" points={categoryData.fortes} type="forte" />
                <RenderPoints title="Pontos a melhorar" points={categoryData.fracos} type="fraco" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="importancia-secao">
        <h2 className="secao-titulo">Porque tudo isso importa?</h2>
        <div className="importancia-content">
          <p>Quando a estratégia não é traduzida para o cotidiano, equipes podem perder o foco, a motivação diminui e os resultados ficam aquém do potencial. Identificar esses pontos é o primeiro passo para construir uma empresa mais forte, coesa e pronta para o futuro.</p>
        </div>
      </div>

      <div className="proximos-passos-secao">
        <h2 className="secao-titulo">Próximos passos</h2>
        <div className="proximos-passos-content">
          <p>Este diagnóstico rápido é uma fotografia do momento atual. O próximo passo é aprofundar a análise, criando um plano de ação claro e prático para transformar as oportunidades em resultados concretos e fortalecer ainda mais seus pontos positivos.</p>
        </div>
      </div>
      
      <div className="cta-secao">
        <h2 className="cta-titulo">E agora?</h2>
        <p className="cta-texto">
          Para receber um relatório completo e um diagnóstico aprofundado, entre em contato
          conosco!
        </p>
        <div className='btn-secao'>
          <a className="btn-agendar" href="/diagnostico/devolutiva">
            <span className='btn-texto'>Acesse nossos planos</span>
          </a>
          <button className='btn-agendar'>
            <span className='btn-texto'>Baixar meus resultados</span>
          </button>
        </div>
      </div>
    </div>
  );
}