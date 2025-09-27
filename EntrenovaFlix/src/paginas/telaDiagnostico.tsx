import { useState, useEffect, ElementType } from 'react'; // AJUSTE: Importado o ElementType para a tipagem do ícone
import '../styles/diagnostico.css';
import { FaUsers, FaDirections } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdBusiness } from "react-icons/md";
import Button from '../componentes/ui/botões/botao';

// Interfaces de tipo para os dados do diagnóstico
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

// AJUSTE 1: Tipagem explícita para o array de configuração.
// Isso informa ao TypeScript que a 'key' é uma das chaves da interface 'SegmentedDiagnosis'.
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
  // AJUSTE 2: Adicionar o estado de 'loading', iniciando como 'true'.
  const [loading, setLoading] = useState(true);

  const email = 'contato@entrenova.com.br';
  const subject = 'Contato Pelo Site - Diagnóstico Aprofundado';
  const body = `Olá!\nGostaria marcar uma consultoria para um diagnóstico mais aprofundado,\n[Seu Nome]`;
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  useEffect(() => {
    try {
      const stored = localStorage.getItem('segmentedDiagnosis');
      if (stored) {
        setDiagnosis(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Erro ao ler o diagnóstico do localStorage:", error);
    } finally {
      // AJUSTE 3: Ao final da tentativa (com ou sem sucesso), definir loading como 'false'.
      setLoading(false);
    }
  }, []);

  // Agora a variável 'loading' existe e este bloco funcionará corretamente.
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
        <Button className="btn-agendar" to='devolutiva'>
          Acesse nossos planos
        </Button>

        <a href={mailtoLink} style={{ textDecoration: 'none' }}>
          <Button className='btn-agendar' >
            Consultoria
          </Button>
        </a>
      </div>
    </div>
  );
}