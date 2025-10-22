import React, { useState, useEffect, ElementType } from 'react';
import { FaUsers, FaDirections, FaDownload } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdBusiness, MdCalendarToday } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useQuestionnaire } from '../contexts/QuestionnaireContext';
import '../styles/diagnostico.css'; 

// --- INTERFACES ---

interface DiagnosisData {
  fortes: string[];
  fracos: string[];
  recomendacao?: string[];
  score?: number;
}

interface SegmentedDiagnosis {
  pessoasCultura?: DiagnosisData;
  estruturaOperacoes?: DiagnosisData;
  mercadoClientes?: DiagnosisData;
  direcaoFuturo?: DiagnosisData;
}

// Interface para o Lead Score (agora vem da API)
interface LeadScoreInfo {
  score: number;
  classification: "Frio" | "Morno" | "Quente";
  className: "frio" | "morno" | "quente";
}

// Interface para os Próximos Passos (vem da API)
interface ProximosPassosData {
  curto_prazo: { foco: string; acoes: string[] };
  medio_prazo: { foco: string; acoes: string[] };
  longo_prazo: { foco: string; acoes: string[] };
}

// --- CONFIGS (não mudam) ---

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

type CategoryConfigItem = {
  key: keyof SegmentedDiagnosis;
  title: string;
  Icon: ElementType;
};

const softSkillsMap: Record<keyof SegmentedDiagnosis, string[]> = {
  pessoasCultura: ["Trabalho em equipe", "Comunicação clara", "Escuta ativa", "Gestão de conflitos", "Accountability", "Pertencimento"],
  estruturaOperacoes: ["Organização", "Autonomia", "Gestão de tempo", "Adaptabilidade", "Accountability", "Clareza de papéis"],
  mercadoClientes: ["Inovação", "Orientação ao cliente", "Curiosidade ativa", "Flexibilidade cognitiva", "Cultura digital"],
  direcaoFuturo: ["Visão estratégica", "Liderança", "Pensamento sistêmico", "Resiliência", "Tomada de decisão"]
};

// --- COMPONENTE AUXILIAR (não muda) ---

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

// --- COMPONENTE PRINCIPAL (MODIFICADO) ---

export default function TelaDiagnostico() {
  // 1. Pega o resultado do diagnóstico (Etapa 3) do Contexto
  const { diagnosticResult, hasDiagnosticResult } = useQuestionnaire();
  
  const [loading, setLoading] = useState(!hasDiagnosticResult);
  
  // 2. State para os dados brutos (Etapas 1 e 2)
  const [formData, setFormData] = useState<any | null>(null);
  
  // 3. States para os dados que virão da API
  const [leadScoreInfo, setLeadScoreInfo] = useState<LeadScoreInfo | null>(null);
  const [proximosPassos, setProximosPassos] = useState<ProximosPassosData | null>(null);

  useEffect(() => {
    let rawFormData: any = null;
    
    // 4. Tenta ler os dados brutos (Etapa 1-2) do localStorage
    try {
      const storedAnswers = localStorage.getItem('userFormAnswers');
      if (storedAnswers) {
        rawFormData = JSON.parse(storedAnswers);
        setFormData(rawFormData);
      }
    } catch (error) {
      console.error("Erro ao ler dados brutos do formulário:", error);
    }
    
    // 5. Se o diagnóstico (Etapa 3) já foi processado e existe...
    if (hasDiagnosticResult && diagnosticResult) {
      
      // 5a. ...e se os dados brutos (Etapa 1-2) existem...
      if (rawFormData) {
        // ...então BUSCA O LEAD SCORE na API
        fetch('http://127.0.0.1:8000/api/lead-score/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(rawFormData) // Envia os dados brutos
        })
        .then(res => res.json())
        .then(data => setLeadScoreInfo(data)) // Guarda no state
        .catch(e => console.error("Erro ao buscar lead score:", e));
      }

      // 5b. Pega todos os "pontos fracos" do diagnóstico
      const allFracos = Object.values(diagnosticResult)
                              .flatMap((dim: any) => dim.fracos || [])
                              .filter(Boolean); 

      // 5c. Se existirem pontos fracos...
      if (allFracos.length > 0) {
        // ...então BUSCA OS PRÓXIMOS PASSOS na API
        fetch('http://127.0.0.1:8000/api/proximos-passos/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ pontos_a_melhorar: allFracos }) // Envia os pontos fracos
        })
        .then(res => res.json())
        .then(data => setProximosPassos(data)) // Guarda no state
        .catch(e => console.error("Erro ao buscar próximos passos:", e));
      }
    }
    
    setLoading(false);
  }, [hasDiagnosticResult, diagnosticResult]); // Roda sempre que o diagnóstico mudar

  const handleDownload = () => {
    alert('Funcionalidade de download ainda não implementada.');
    console.log("Dados para Download:", { diagnosis: diagnosticResult, rawAnswers: formData });
  };

  // --- Renders de Loading e Erro (não mudam) ---
  if (loading) {
    return <div className="diagnostic-mockup-root"><p>Carregando resultados...</p></div>;
  }

  if (!diagnosticResult || Object.keys(diagnosticResult).length === 0) {
    return <div className="diagnostic-mockup-root"><p>Nenhum diagnóstico encontrado. Por favor, complete o formulário primeiro.</p></div>;
  }

  // --- Lógica de Cálculo (para recomendação principal) ---
  const evaluatedCategories = categoriesConfig.filter(cat => diagnosticResult[cat.key]);
  
  const { category: recommendedCategory } = evaluatedCategories.reduce(
    (lowest, cat) => {
      const score = diagnosticResult[cat.key]?.score ?? 0;
      if (score < lowest.lowestScore) {
        return { lowestScore: score, category: cat };
      }
      return lowest;
    },
    { lowestScore: Infinity, category: null as CategoryConfigItem | null }
  );
 
  const mainRecommendation = recommendedCategory
    ? diagnosticResult[recommendedCategory.key]?.recomendacao?.[0]
    : null;

  // --- RENDER JSX ---
  return (
    <div className="diagnostic-mockup-root">
      <div className="diag-card">
        
        {/* 6. Header (Renderiza o Lead Score vindo do state) */}
        <div className="diag-header">
          <div className="diag-left">
            <div className="diag-title">Seu diagnóstico organizacional</div>
            {recommendedCategory && (
              <div className="recommended">
                <div className="rec-title">
                  Dimensão a ser trabalhada com prioridade: 
                  <span style={{ color: '#b497ff' }}> {recommendedCategory.title}</span>
                </div>
                {mainRecommendation && <div className="muted">{mainRecommendation}</div>}
                {!mainRecommendation && (
                  <div className="muted">
                    Com base nas respostas, recomendamos iniciar por uma intervenção nesta área para gerar impacto rápido.
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="diag-right">
            {leadScoreInfo ? (
              <div className={`lead-score-pill ${leadScoreInfo.className}`}>
                <div className="score-number">{leadScoreInfo.score}</div>
                <div className="score-label">Lead ({leadScoreInfo.classification})</div>
              </div>
            ) : (
              <div className="lead-score-pill">...</div>
            )}
          </div>
        </div>

        {/* Grid de Categorias (Lê do 'diagnosticResult') */}
        <div className="categories-grid">
          {evaluatedCategories.map(cat => {
            const categoryData = diagnosticResult[cat.key];
            if (!categoryData) return null;
            const score = categoryData.score || 0;
            return (
              <div key={cat.key} className="category-card">
                <div className="category-head">
                  <div className="cat-title">{cat.title}</div>
                  {score > 0 && <div className="cat-score">{score}</div>}
                </div>
                {score > 0 && <div className="cat-bar"><div className="cat-progress" style={{ width: `${score}%` }} /></div>}
                <div className="points">
                  <div className="points-col">
                    <RenderPoints title="Pontos fortes" points={categoryData.fortes || []} type="forte" />
                  </div>
                  <div className="points-col">
                    <RenderPoints title="Pontos a melhorar" points={categoryData.fracos || []} type="fraco" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seção Soft Skills (Lê do 'diagnosticResult') */}
        <div className="recomendacoes-secao">
          <h4>Soft Skills Associadas</h4>
          <p className="muted">Estas são as soft skills que seu diagnóstico avaliou. As trilhas recomendadas focarão nas áreas com menor pontuação.</p>
          <div className="recomendacoes-grid">
            {evaluatedCategories.map(cat => {
              const skills = softSkillsMap[cat.key];
              if (!skills || skills.length === 0) {
                return null;
              }
              return (
                <div key={cat.key} className="recomendacao-card">
                  <strong>{cat.title}</strong>
                  <ul className="muted">
                    {skills.map((skill: string, i: number) => <li key={i}>{skill}</li>)}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="proximos">
          <h4>Próximos passos sugeridos</h4>
          <div className="proximos-grid">
            {proximosPassos ? (
              <>
                <div className="proximos-card curto-prazo">
                  <div className="proximos-card-header">
                    <strong>{proximosPassos.curto_prazo.foco || "Curto Prazo"}</strong>
                    <span className="prazo-label">1-2 sem</span>
                  </div>
                  <ul className="muted">
                    {proximosPassos.curto_prazo.acoes.length > 0 ? (
                      proximosPassos.curto_prazo.acoes.map((acao, i) => <li key={i}>{acao}</li>)
                    ) : (
                      <li>Nenhuma ação definida.</li>
                    )}
                  </ul>
                </div>

                <div className="proximos-card medio-prazo">
                  <div className="proximos-card-header">
                    <strong>{proximosPassos.medio_prazo.foco || "Médio Prazo"}</strong>
                    <span className="prazo-label">2-4 sem</span>
                  </div>
                  <ul className="muted">
                     {proximosPassos.medio_prazo.acoes.length > 0 ? (
                      proximosPassos.medio_prazo.acoes.map((acao, i) => <li key={i}>{acao}</li>)
                    ) : (
                      <li>Nenhuma ação definida.</li>
                    )}
                  </ul>
                </div>

                <div className="proximos-card longo-prazo">
                  <div className="proximos-card-header">
                    <strong>{proximosPassos.longo_prazo.foco || "Longo Prazo"}</strong>
                    <span className="prazo-label">+6 sem</span>
                  </div>
                  <ul className="muted">
                     {proximosPassos.longo_prazo.acoes.length > 0 ? (
                      proximosPassos.longo_prazo.acoes.map((acao, i) => <li key={i}>{acao}</li>)
                    ) : (
                      <li>Nenhuma ação definida.</li>
                    )}
                  </ul>
                </div>
              </>
            ) : (
              <p className="muted" style={{ gridColumn: "1 / -1" }}>Carregando plano de ação...</p>
            )}
          </div>
        </div>

        {/* Área de CTA (não muda) */}
        <div className="cta-area">
          <div className="cta-left">
            <div style={{ fontWeight: 700, fontSize: 15 }}>Deseja o relatório completo?</div>
            <div className="muted" style={{ marginTop: 6 }}>Baixe o PDF com o diagnóstico detalhado ou fale com nosso time para uma consultoria personalizada.</div>
          </div>
          <div className="cta-buttons">
            <button className="btn btn-ghost" onClick={handleDownload}>
               <FaDownload /> Baixar relatório (PDF)
            </button>
            <Link to="/diagnostico/devolutiva" className="btn btn-primary">
               <MdCalendarToday /> Acessar Planos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}