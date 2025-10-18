import { useState, useEffect, ElementType } from 'react';
import '../styles/diagnostico.css';
import { FaUsers, FaDirections } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdBusiness } from "react-icons/md";
import { useQuestionnaire } from '../contexts/QuestionnaireContext';

interface DiagnosisData {
  fortes: string[];
  fracos: string[];
  recomendacao?: string[];
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
  const [plano, setPlano] = useState<any>(null);
  const [loadingPlano, setLoadingPlano] = useState(true);
  const [errorPlano, setErrorPlano] = useState<string | null>(null);

  const loading = !hasDiagnosticResult;

  useEffect(() => {
    if (!diagnosticResult) return;

    const pontosFracos: string[] = Object.values(diagnosticResult)
      .flatMap((cat: any) => cat?.fracos || [])
      .filter((ponto) => ponto && ponto.trim().length > 0);

    if (pontosFracos.length === 0) {
      setErrorPlano("Nenhum ponto fraco encontrado para gerar recomendações.");
      setLoadingPlano(false);
      return;
    }

    const fetchPlano = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/proximos-passos/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pontos_a_melhorar: pontosFracos }),
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Erro ao gerar recomendações");
        setPlano(data);
      } catch (err: any) {
        console.error("Erro ao buscar plano:", err);
        setErrorPlano(err.message);
      } finally {
        setLoadingPlano(false);
      }
    };

    fetchPlano();
  }, [diagnosticResult]);

  if (loading) {
    return <div className="diagnostico-container"><p>Carregando resultados...</p></div>;
  }

  if (!diagnosticResult || Object.keys(diagnosticResult).length === 0) {
    return <div className="diagnostico-container"><p>Nenhum diagnóstico encontrado. Complete o formulário primeiro.</p></div>;
  }

  const curto = plano?.curto_prazo || { foco: "", acoes: [] };
  const medio = plano?.medio_prazo || { foco: "", acoes: [] };
  const longo = plano?.longo_prazo || { foco: "", acoes: [] };

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

        {loadingPlano ? (
          <p>Gerando recomendações com IA...</p>
        ) : errorPlano ? (
          <p className="erro">Erro: {errorPlano}</p>
        ) : (
          <div className="solucoes-cards">
            <div className="solucao-card curto-prazo">
              <div className='card-header'>
                <h3>Curto Prazo</h3>
                <span className="prazo">1-2 semanas</span>
              </div>
              <div className="card-body">
                <h4>{curto.foco}</h4>
                <ul>
                  {curto.acoes.map((acao: string, index: number) => (
                    <li key={index}>{acao}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="solucao-card medio-prazo">
              <div className='card-header'>
                <h3>Médio Prazo</h3>
                <span className="prazo">2-4 semanas</span>
              </div>
              <div className="card-body">
                <h4>{medio.foco}</h4>
                <ul>
                  {medio.acoes.map((acao: string, index: number) => (
                    <li key={index}>{acao}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="solucao-card longo-prazo">
              <div className='card-header'>
                <h3>Longo Prazo</h3>
                <span className="prazo">+ de 6 semanas</span>
              </div>
              <div className="card-body">
                <h4>{longo.foco}</h4>
                <ul>
                  {longo.acoes.map((acao: string, index: number) => (
                    <li key={index}>{acao}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="importancia-secao">
        <h2 className="secao-titulo">Como isto ajuda a empresa?</h2>
        <div className="importancia-content">
          <p>Implementar essas ações de forma estruturada e progressiva permite que a empresa construa uma base sólida para o crescimento. Começando com alinhamentos imediatos, evoluindo para processos estruturados e culminando em transformação estratégica.</p>
        </div>
      </div>

      <div className="cta-secao">
        <h2 className="cta-titulo">E agora?</h2>
        <p className="cta-texto">
          Para receber um relatório completo e um diagnóstico aprofundado, entre em contato
          conosco!
        </p>
        <a className="btn-agendar" href="/diagnostico/devolutiva">Acesse nossos planos</a>
        <button className='btn-agendar'>Baixar meus resultados</button>
      </div>
    </div>
  );
}
