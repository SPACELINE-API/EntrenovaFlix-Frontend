import { useState, useEffect, ElementType } from 'react'; 
import '../styles/diagnostico.css';
import { FaUsers, FaDirections } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdBusiness } from "react-icons/md";

interface DiagnosisData {
  strengths: string[];
  weaknesses: string[];
  analysis?: string; 
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
  {
    key: 'pessoasCultura',
    title: 'Pessoas & Cultura',
    Icon: FaUsers,
  },
  {
    key: 'estruturaOperacoes',
    title: 'Estrutura & Operações',
    Icon: PiTreeStructureFill,
  },
  {
    key: 'mercadoClientes',
    title: 'Mercado & Clientes',
    Icon: MdBusiness,
  },
  {
    key: 'direcaoFuturo',
    title: 'Direção & Futuro',
    Icon: FaDirections,
  },
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
  const [diagnosis, setDiagnosis] = useState<SegmentedDiagnosis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('segmentedDiagnosis');
      if (stored) {
        setDiagnosis(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao ler o diagnóstico do localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  if (loading) {
    return <div className="diagnostico-container"><p>Carregando resultados...</p></div>;
  }

  if (!diagnosis) {
    return <div className="diagnostico-container"><p>Nenhum diagnóstico encontrado. Por favor, complete o formulário primeiro.</p></div>;
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
          const categoryData = diagnosis[key];
          if (!categoryData) return null;

          return (
            <div className="categoria-resultado" key={key}>
              <div className="categoria-icon">
                <Icon size={30} />
              </div>
              <h3 className="categoria-titulo">{title}</h3>
              <div className="pontos-categoria">
                <RenderPoints
                  title="Pontos fortes"
                  points={categoryData.strengths}
                  type="forte"
                />
                <RenderPoints
                  title="Pontos a melhorar"
                  points={categoryData.weaknesses}
                  type="fraco"
                />
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
        <div className="solucoes-cards">
          <div className="solucao-card curto-prazo">
            <div className='card-header'>
              <h3>Curto Prazo</h3>
              <span className="prazo">1-2 semanas</span>
            </div>

            <div className="card-body">
              <h4>Liderança</h4>
              <ul>
                <li>Descobrir quais são os conflitos e desafios de liderança junto aos times.</li>
                <li>Reunião de alinhamento entre RH e líderes para definir prioridades.</li>
                <li>Comunicação clara sobre expectativas de conduta e resultados de liderança.</li>
              </ul>
            </div>
          </div>

          <div className="solucao-card medio-prazo">
            <div className='card-header'>
              <h3>Médio Prazo</h3>
              <span className="prazo">2-4 semanas</span>
            </div>

            <div className="card-body">
              <h4>Estrutura & Processos</h4>
              <ul>
                <li>Implementar processos padronizados para melhorar a eficiência operacional.</li>
                <li>Desenvolver programa de treinamento e capacitação das equipes.</li>
                <li>Definir e implementar métricas e KPIs para acompanhamento de resultados.</li>
              </ul>
            </div>
          </div>

          <div className="solucao-card longo-prazo">
            <div className='card-header'>
              <h3>Longo Prazo</h3>
              <span className="prazo">+ de 6 semanas</span>
            </div>

            <div className="card-body">
              <h4>Transformação Estratégica</h4>
              <ul>
                <li>Elaborar planejamento estratégico detalhado com metas de longo prazo.</li>
                <li>Investir em inovação e transformação digital da empresa.</li>
                <li>Estruturar plano de expansão e crescimento sustentável no mercado.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="importancia-secao">
        <h2 className="secao-titulo">Como isto ajuda a empresa?</h2>
        <div className="importancia-content">
          <p>Implementar essas ações de forma estruturada e progressiva permite que a empresa construa uma base sólida para o crescimento. Começando com alinhamentos imediatos, evoluindo para processos estruturados e culminando em transformação estratégica, cada etapa fortalece a organização, melhora a eficiência operacional e prepara a empresa para enfrentar desafios futuros com maior confiança e capacidade de adaptação.</p>
        </div>
      </div>

      <div className="cta-secao">
        <h2 className="cta-titulo">E agora?</h2>
        <p className="cta-texto">
          Para receber um relatório completo e um diagnóstico aprofundado, entre em contato
          conosco!
        </p>
        <a className="btn-agendar" href="/diagnostico/devolutiva">
          Acesse nossos planos
        </a>
        <button className='btn-agendar'>
          Baixar meus resultados
        </button>
      </div>
    </div>
  );
}