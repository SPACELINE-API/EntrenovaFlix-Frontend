import React, { useState, useEffect, ElementType } from 'react';
import { FaUsers, FaDirections, FaDownload } from "react-icons/fa";
import { PiTreeStructureFill } from "react-icons/pi";
import { MdBusiness, MdCalendarToday } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useQuestionnaire } from '../contexts/QuestionnaireContext';
import '../styles/diagnostico.css';

interface DiagnosisData {
  fortes: string[];
  fracos: string[];
  recomendacao?: string[];
  score?: number;
  soft_skills_sugeridas?: string[];
  tags_de_interesse?: string[];
}

interface SegmentedDiagnosis {
  pessoasCultura?: DiagnosisData;
  estruturaOperacoes?: DiagnosisData;
  mercadoClientes?: DiagnosisData;
  direcaoFuturo?: DiagnosisData;
}

interface LeadScoreInfo {
  score: number;
  classification: "Frio" | "Morno" | "Quente";
  className: "frio" | "morno" | "quente";
}

interface ProximosPassosData {
  curto_prazo: { foco: string; acoes: string[] };
  medio_prazo: { foco: string; acoes: string[] };
  longo_prazo: { foco: string; acoes: string[] };
}

interface BotaoGerarPDFProps {
  diagnosticResult: any;
  formData: any;
}

const categoriesConfig: { key: keyof SegmentedDiagnosis; title: string; Icon: ElementType }[] = [
  { key: 'pessoasCultura', title: 'Pessoas & Cultura', Icon: FaUsers },
  { key: 'estruturaOperacoes', title: 'Estrutura & Operações', Icon: PiTreeStructureFill },
  { key: 'mercadoClientes', title: 'Mercado & Clientes', Icon: MdBusiness },
  { key: 'direcaoFuturo', title: 'Direção & Futuro', Icon: FaDirections },
];

const RenderPoints = ({ title, points, type }: { title: string; points: string[]; type: 'forte' | 'fraco' }) => {
  return (
    <>
      <div className={`ponto-${type}`}>
        <span className="bullet">●</span>
        <span>{title}</span>
      </div>
      {points.length > 0 ? points.map((p, i) => <div key={i} className="item-ponto">{p}</div>) :
        <div className="item-ponto-fallback">
          {type === 'forte' ? 'Nenhum ponto forte encontrado.' : 'Nenhum ponto a melhorar encontrado.'}
        </div>
      }
    </>
  );
};

const BotaoGerarPDF: React.FC<BotaoGerarPDFProps> = ({ diagnosticResult, formData }) => {
  const GerarPdf = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/accounts/gerar-pdf", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ diagnosticResult, formData })
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar o PDF");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Diagnostico_Aprofundado.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF");
    }
  }

  return (
    <button className="btn btn-ghost" onClick={GerarPdf}>
      <FaDownload /> Baixar relatório (PDF)
    </button>
  );
};

export default function TelaDiagnostico() {
  const { diagnosticResult, hasDiagnosticResult } = useQuestionnaire();
  const [loading, setLoading] = useState(!hasDiagnosticResult);
  const [formData, setFormData] = useState<any | null>(null);
  const [leadScoreInfo, setLeadScoreInfo] = useState<LeadScoreInfo | null>(null);
  const [proximosPassos, setProximosPassos] = useState<ProximosPassosData | null>(null);

  useEffect(() => {
    let rawData: any = null;
    try {
      const stored = localStorage.getItem('userFormAnswers');
      if (stored) {
        rawData = JSON.parse(stored);
        setFormData(rawData);
      }
    } catch (e) { console.error("Erro ao ler dados brutos:", e); }

    if (hasDiagnosticResult && diagnosticResult) {
      if (rawData) {
        fetch('http://127.0.0.1:8000/api/lead-score/', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(rawData)
        })
          .then(res => res.json())
          .then(data => {
            setLeadScoreInfo(data);
            localStorage.setItem('leadScoreInfo', JSON.stringify(data));
          })
          .catch(e => console.error("Erro Lead Score:", e));
      }

      const allFracos = Object.values(diagnosticResult).flatMap((d: any) => d.fracos || []).filter(Boolean);
      if (allFracos.length > 0) {
        fetch('http://127.0.0.1:8000/api/proximos-passos/', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pontos_a_melhorar: allFracos })
        })
          .then(res => res.json())
          .then(data => {
            setProximosPassos(data);
            localStorage.setItem('proximosPassos', JSON.stringify(data));
          })
          .catch(e => console.error("Erro Próximos Passos:", e));
      }
    }

    setLoading(false);
  }, [hasDiagnosticResult, diagnosticResult]);

  if (loading) return <div className="diagnostic-mockup-root"><p>Carregando resultados...</p></div>;
  if (!diagnosticResult || Object.keys(diagnosticResult).length === 0)
    return <div className="diagnostic-mockup-root"><p>Nenhum diagnóstico encontrado. Complete o formulário.</p></div>;

  const evaluatedCategories = categoriesConfig.filter(cat => diagnosticResult[cat.key]);

  const recommendedCategory = evaluatedCategories.reduce((lowest, cat) => {
    const score = diagnosticResult[cat.key]?.score || 0;
    return score < lowest.lowestScore ? { lowestScore: score, category: cat } : lowest;
  }, { lowestScore: Infinity, category: null as typeof categoriesConfig[0] | null }).category;
  const mainRecommendation = recommendedCategory ? diagnosticResult[recommendedCategory.key]?.recomendacao?.[0] : null;

  const handleDownload = () => {
    alert('Funcionalidade de download ainda não implementada.');
    console.log("Dados para Download:", { diagnosis: diagnosticResult, rawAnswers: formData });
  };

  return (
    <div className="diagnostic-mockup-root">
      <div className="diag-card">
        <div className="diag-header">
          <div className="diag-left">
            <div className="diag-title">Seu diagnóstico organizacional</div>
            {recommendedCategory && (
              <div className="recommended">
                <div className="rec-title">
                  Dimensão a ser trabalhada com prioridade: <span style={{ color: '#b497ff' }}>{recommendedCategory.title}</span>
                </div>
                <div className="muted">{mainRecommendation || "Inicie por esta área para gerar impacto rápido."}</div>
              </div>
            )}
          </div>
          <div className="diag-right">
            {leadScoreInfo ? (
              <div className={`lead-score-pill ${leadScoreInfo.className}`}>
                <div className="score-number">{leadScoreInfo.score}</div>
                <div className="score-label">Lead ({leadScoreInfo.classification})</div>
              </div>
            ) : <div className="lead-score-pill">...</div>}
          </div>
        </div>

        <div className="categories-grid">
          {evaluatedCategories.map(cat => {
            const data = diagnosticResult[cat.key];
            if (!data) return null;
            const score = data.score || 0;
            return (
              <div key={cat.key} className="category-card">
                <div className="category-head">
                  <div className="cat-title">{cat.title}</div>
                  {score > 0 && <div className="cat-score">{score}</div>}
                </div>
                {score > 0 && <div className="cat-bar"><div className="cat-progress" style={{ width: `${score}%` }} /></div>}
                <div className="points">
                  <div className="points-col"><RenderPoints title="Pontos fortes" points={data.fortes || []} type="forte" /></div>
                  <div className="points-col"><RenderPoints title="Pontos a melhorar" points={data.fracos || []} type="fraco" /></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="recomendacoes-secao">
          <h4>Recomendações da IA por Dimensão</h4>
          <p className="muted">Soft skills e tags de interesse sugeridas pela IA com base nos seus pontos fracos.</p>
          <div className="recomendacoes-grid">
            {evaluatedCategories.map(cat => {
              const data = diagnosticResult[cat.key];
              if (!data) return null;

              const skills = data.soft_skills_sugeridas || [];
              const tags = data.tags_de_interesse || [];

              return (
                <div key={cat.key} className="recomendacao-card">
                  <strong>{cat.title}</strong>

                  {skills.length > 0 && (
                    <div className="skills-sub-section">
                      <span className="sub-title">Soft Skills Sugeridas</span>
                      <ul className="muted">
                        {skills.map((s: any, i: any) => <li key={`skill-${i}`}>{s}</li>)}
                      </ul>
                    </div>
                  )}

                  {tags.length > 0 && (
                    <div className="skills-sub-section">
                      <span className="sub-title">Tags de Interesse</span>
                      <ul className="muted">
                        {tags.map((t: any, i: any) => <li key={`tag-${i}`}>{t}</li>)}
                      </ul>
                    </div>
                  )}

                  {skills.length === 0 && tags.length === 0 && (
                    <p className="muted">Nenhuma sugestão de skill ou tag para esta dimensão.</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="proximos">
          <h4>Próximos passos sugeridos</h4>
          <div className="proximos-grid">
            {proximosPassos ? ['curto_prazo', 'medio_prazo', 'longo_prazo'].map((p, i) => {
              const step = proximosPassos[p as keyof ProximosPassosData];
              if (!step) {
              return null;
            }
              const label = p === 'curto_prazo' ? '1-2 sem' : p === 'medio_prazo' ? '2-4 sem' : '+6 sem';
              const cls = p === 'curto_prazo' ? 'curto-prazo' : p === 'medio_prazo' ? 'medio-prazo' : 'longo-prazo';
              return (
                <div key={i} className={`proximos-card ${cls}`}>
                  <div className="proximos-card-header">
                    <strong>{step.foco}</strong>
                    <span className="prazo-label">{label}</span>
                  </div>
                  <ul className="muted">{step.acoes.length > 0 ? step.acoes.map((a, j) => <li key={j}>{a}</li>) : <li>Nenhuma ação definida.</li>}</ul>
                </div>
              )
            }) : <p className="muted" style={{ gridColumn: "1 / -1" }}>Carregando plano de ação...</p>}
          </div>
        </div>

        <div className="cta-area">
          <div className="cta-left">
            <div style={{ fontWeight: 700, fontSize: 15 }}>Deseja o relatório completo?</div>
            <div className="muted" style={{ marginTop: 6 }}>Baixe o PDF ou fale com nosso time para consultoria personalizada.</div>
          </div>
          <div className="cta-buttons">
            <BotaoGerarPDF diagnosticResult={diagnosticResult} formData={formData}/>
            <Link to="/diagnostico/devolutiva" className="btn btn-primary"><MdCalendarToday /> Acessar Planos</Link>
          </div>
        </div>
      </div>
    </div>
  );
}