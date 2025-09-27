import { z } from 'zod';
import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// #region Zod Schemas and Type Definitions
const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.record(z.string(), z.string())
});

const DimensionSchema = z.object({
  name: z.string(),
  questions: z.array(QuestionSchema)
});

const DiagnosisResponseSchema = z.object({
  dimension: z.string(),
  averageScore: z.number(),
  maturityStage: z.string(),
  improvementPath: z.string()
});

const FullDiagnosisSchema = z.object({
  responses: z.record(z.string(), z.object({
    question: z.string(),
    answer: z.string(),
    score: z.number()
  })),
  diagnosis: z.array(DiagnosisResponseSchema),
  summary: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    recommendations: z.array(z.string())
  })
});

type Question = z.infer<typeof QuestionSchema>;
type Dimension = z.infer<typeof DimensionSchema>;
type DiagnosisResponse = z.infer<typeof DiagnosisResponseSchema>;
type FullDiagnosis = z.infer<typeof FullDiagnosisSchema>;
// #endregion

// #region Constants
const dimensions: Dimension[] = [
  {
    name: "Pessoas & Cultura",
    questions: [
      {
        id: "pessoasCultura_1",
        text: "Como a comunicação acontece no dia a dia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_2",
        text: "Como você descreveria o estilo de liderança predominante?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_3",
        text: "Quando surgem problemas, como os times costumam agir?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_4",
        text: "Como está organizada a rotina de trabalho?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_5",
        text: "Até que ponto os valores da empresa estão presentes no dia a dia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "pessoasCultura_6",
        text: "Quais ferramentas apoiam pessoas & cultura?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  },
  {
    name: "Estrutura & Operações",
    questions: [
      {
        id: "estruturaOperacoes_1",
        text: "Como é a troca de informações entre áreas?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_2",
        text: "Como os gestores lidam com delegação?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_3",
        text: "Quando processos falham, o que acontece?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_4",
        text: "Quanta autonomia operacional os colaboradores têm?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_5",
        text: "Qual é a relação da empresa com padrões de qualidade?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "estruturaOperacoes_6",
        text: "Quais ferramentas apoiam as operações do dia a dia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  },
  {
    name: "Mercado & Clientes",
    questions: [
      {
        id: "mercadoClientes_1",
        text: "Como a empresa ouve seus clientes?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_2",
        text: "Como vendas e atendimento trabalham juntos?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_3",
        text: "Quando o mercado muda, como a empresa reage?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_4",
        text: "Como é o acompanhamento de metas comerciais?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_5",
        text: "O diferencial competitivo está claro?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "mercadoClientes_6",
        text: "Quais ferramentas apoiam mercado & clientes?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  },
  {
    name: "Direção & Futuro",
    questions: [
      {
        id: "direcaoFuturo_1",
        text: "Como a visão de futuro é comunicada?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_2",
        text: "Como os líderes conectam pessoas à estratégia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_3",
        text: "Qual é o papel da inovação no planejamento?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_4",
        text: "Como as atividades diárias se conectam com a estratégia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_5",
        text: "Como a empresa lida com propósito e impacto social?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      },
      {
        id: "direcaoFuturo_6",
        text: "Quais ferramentas apoiam a estratégia?",
        options: {
          "4": "Melhor prática / estágio avançado",
          "3": "Bom, mas com falhas",
          "2": "Frágil, dependente de fatores externos",
          "1": "Inexistente ou muito problemático"
        }
      }
    ]
  }
];

const improvementPaths: { [key: string]: string } = {
  "Pessoas & Cultura": "Fortalecer comunicação, liderança e cultura organizacional",
  "Estrutura & Operações": "Aprimorar processos, delegação e autonomia",
  "Mercado & Clientes": "Melhorar escuta de clientes, sinergia comercial e adaptação ao mercado",
  "Direção & Futuro": "Alinhar estratégia, propósito e inovação"
};
// #endregion

class DiagnosticService {
  private genAI: GoogleGenerativeAI;
  private model: GenerativeModel;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error("A chave da API do Gemini não foi fornecida ao serviço.");
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-001" });
    console.log("DiagnosticService inicializado no modo cliente (browser).");
  }

  private async callAI(prompt: string): Promise<string> {
  console.log("--- ENVIANDO PROMPT PARA A API GEMINI (DO NAVEGADOR) ---");
  try {
    const result = await this.model.generateContent(prompt);
    const response = result.response;
    const rawText = response.text();

    console.log("--- RESPOSTA BRUTA DA IA ---");
    console.log(rawText);

    const startIndex = rawText.indexOf('{');
    const endIndex = rawText.lastIndexOf('}');

    if (startIndex > -1 && endIndex > -1) {
      const jsonString = rawText.substring(startIndex, endIndex + 1);
      
      console.log("--- STRING JSON EXTRAÍDA PARA ANÁLISE ---");
      console.log(jsonString);
      
      JSON.parse(jsonString);
      
      return jsonString; 
    } else {
      console.warn("Nenhum objeto JSON válido foi encontrado na resposta da IA.");
      return "{}";
    }
    
  } catch (error) {
    console.error("Erro na chamada ou no processamento da resposta da API Gemini:", error);
    return "{}"; 
  }
}

  private calculateMaturityStage(average: number): string {
    if (average >= 1.0 && average <= 1.9) return "Inicial";
    if (average >= 2.0 && average <= 2.4) return "Básico";
    if (average >= 2.5 && average <= 3.4) return "Intermediário";
    if (average >= 3.5 && average <= 4.0) return "Avançado";
    return "Indefinido";
  }

  async generateDiagnosis(responses: { [key: string]: { question: string; answer: string; score: number } }): Promise<FullDiagnosis> {
    const diagnosis: DiagnosisResponse[] = [];
    const dimensionScores: { [key: string]: number[] } = {};
    for (const dimension of dimensions) {
      const scores: number[] = [];
      for (const question of dimension.questions) {
        scores.push(responses[question.id]?.score || 1);
      }
      dimensionScores[dimension.name] = scores;
    }
    for (const dimension of dimensions) {
      const scores = dimensionScores[dimension.name];
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const maturityStage = this.calculateMaturityStage(average);
      const improvementPath = improvementPaths[dimension.name];
      diagnosis.push({
        dimension: dimension.name,
        averageScore: Math.round(average * 100) / 100,
        maturityStage: maturityStage,
        improvementPath: improvementPath
      });
    }
    const dimensionSummaries: { [key: string]: { strengths: string[]; weaknesses: string[] } } = {};
    for (const dim of diagnosis) {
      const dimensionPrompt = `Você é um consultor especialista em diagnóstico organizacional. Analise a dimensão "${dim.dimension}" com pontuação ${dim.averageScore}/4 (${dim.maturityStage}) e gere: 1. Pontos fortes específicos desta dimensão (2-3 itens) 2. Pontos a melhorar específicos desta dimensão (2-3 itens). Foque apenas nesta dimensão e seja específico sobre os aspectos positivos e negativos relacionados a ela. Responda em formato JSON com as chaves: "pontos fortes" e "pontos fracos" como arrays de strings.`;
      try {
        const aiResponse = await this.callAI(dimensionPrompt);
        const parsed = JSON.parse(aiResponse);
        dimensionSummaries[dim.dimension] = {
          strengths: parsed["pontos fortes"] || [],
          weaknesses: parsed["pontos fracos"] || []
        };
      } catch (error) {
        console.error(`Erro ao processar resumo da dimensão ${dim.dimension}:`, error);
        dimensionSummaries[dim.dimension] = { strengths: [], weaknesses: [] };
      }
    }
    const recommendationsPrompt = `Você é um consultor especialista em diagnóstico organizacional. Com base nos dados de diagnóstico organizacional abaixo, gere 3-5 recomendações gerais de melhoria para a organização: Dados: ${JSON.stringify(diagnosis, null, 2)} Responda apenas com um array JSON de strings com as recomendações.`;
    let recommendations: string[] = [];
    try {
      const recommendationsResponse = await this.callAI(recommendationsPrompt);
      recommendations = JSON.parse(recommendationsResponse);
    } catch (error) {
      console.error("Erro ao gerar recomendações gerais:", error);
      recommendations = [];
    }
    const allStrengths = Object.values(dimensionSummaries).flatMap(ds => ds.strengths);
    const allWeaknesses = Object.values(dimensionSummaries).flatMap(ds => ds.weaknesses);
    const summary = {
      strengths: allStrengths,
      weaknesses: allWeaknesses,
      recommendations: recommendations
    };
    return {
      responses,
      diagnosis,
      summary
    };
  }

  async generateSegmentedDiagnosis(formData: any): Promise<{ [key: string]: { strengths: string[]; weaknesses: string[] } }> {
    const segmented: { [key: string]: { strengths: string[]; weaknesses: string[] } } = {};
    const dimensionMap: { [key: string]: string } = {
      'pessoasCultura': 'Pessoas & Cultura',
      'estruturaOperacoes': 'Estrutura & Operações',
      'mercadoClientes': 'Mercado & Clientes',
      'direcaoFuturo': 'Direção & Futuro'
    };
    const selectedDimensions = formData.dimensoesAvaliar || [];
    for (const dimKey of selectedDimensions) {
      const dimName = dimensionMap[dimKey as keyof typeof dimensionMap];
      if (!dimName) continue;
      const dimension = dimensions.find(d => d.name === dimName);
      if (!dimension) continue;
      let questionsContext = 'Perguntas e respostas para esta dimensão:\n';
      let totalScore = 0;
      let questionCount = 0;
      for (const question of dimension.questions) {
        const formValue = formData[question.id];
        if (formValue !== undefined) {
          const score = parseInt(formValue.toString());
          const answerText = question.options[score.toString()] || "N/A";
          questionsContext += `- ${question.text} (Resposta: ${answerText}, Nota: ${score})\n`;
          totalScore += score;
          questionCount++;
        }
      }
      const averageScore = questionCount > 0 ? totalScore / questionCount : 0;
      console.log(`🔄 Processando dimensão: ${dimName} (Média: ${averageScore.toFixed(1)})`);
      const prompt = `Você é um consultor especialista em diagnóstico organizacional. Dimensão analisada: ${dimName} Pontuação média: ${averageScore.toFixed(1)}/4 ${questionsContext} Baseado nas respostas acima, gere exatamente: - 2-3 pontos fortes: Frases descritivas curtas (10-20 palavras) destacando aspectos positivos baseados nas respostas de alta pontuação. - 2-3 pontos a melhorar: Frases descritivas curtas (10-20 palavras) destacando oportunidades de melhoria baseadas nas respostas de baixa pontuação. Exemplos de frases: - Pontos fortes: "Comunicação fluida entre equipes que facilita a colaboração diária.", "Liderança inspiradora que motiva e engaja os colaboradores." - Pontos a melhorar: "Necessidade de melhorar a escuta ativa para reduzir mal-entendidos.", "Falta de processos claros para agilizar decisões operacionais." IMPORTANTE: Responda APENAS com JSON válido, sem texto adicional: { "pontos fortes": ["frase1", "frase2", "frase3"], "pontos fracos": ["frase1", "frase2", "frase3"] }`;
      try {
        const aiResponse = await this.callAI(prompt);
        const parsed = JSON.parse(aiResponse);
        segmented[dimKey] = {
          strengths: Array.isArray(parsed["pontos fortes"]) ? parsed["pontos fortes"].slice(0, 3) : [],
          weaknesses: Array.isArray(parsed["pontos fracos"]) ? parsed["pontos fracos"].slice(0, 3) : []
        };
      } catch (error) {
        console.error(`Erro ao processar diagnóstico segmentado para ${dimName}:`, error);
        segmented[dimKey] = { strengths: [], weaknesses: [] };
      }
    }
    console.log('🎯 Resultado final do diagnóstico segmentado:', segmented);
    return segmented;
  }

  processFormResponses(formData: any): { [key: string]: { question: string; answer: string; score: number } } {
    const responses: { [key: string]: { question: string; answer: string; score: number } } = {};
    for (const dimension of dimensions) {
      for (const question of dimension.questions) {
        const formValue = formData[question.id];
        if (formValue !== undefined) {
          const score = parseInt(formValue.toString(), 10);
          const answerText = question.options[score.toString()] || "Resposta inválida";
          responses[question.id] = {
            question: question.text,
            answer: answerText,
            score: score
          };
        } else {
          responses[question.id] = {
            question: question.text,
            answer: "Não respondida",
            score: 1
          };
        }
      }
    }
    return responses;
  }
}

export default DiagnosticService;
export type { FullDiagnosis, DiagnosisResponse };

type NumeroColaboradores = "ate-10" | "11-30" | "31-100" | "101-500" | "acima-500";
type PorteEmpresa = "Startup" | "PME" | "Grande empresa";
type InvestimentoDisponivel = "ate-10k" | "10k-50k" | "acima-50k";
type DecisorPrincipal = "CEO / Diretor" | "RH / T&D" | "Marketing / Comunicação" | "Outro";

interface LeadProfile {
  colaboradores: NumeroColaboradores;
  porte: PorteEmpresa;
  investimento: InvestimentoDisponivel;
  decisor: DecisorPrincipal;
}

const points = {
  colaboradores: { "ate-10": 1, "11-30": 2, "31-100": 3, "101-500": 4, "acima-500": 5 },
  porte: { "Startup": 2, "PME": 3, "Grande empresa": 5 },
  investimento: { "ate-10k": 1, "10k-50k": 3, "acima-50k": 5 },
  decisor: { "CEO / Diretor": 3, "RH / T&D": 2, "Marketing / Comunicação": 1, "Outro": 0 }
};

function calculateLeadScore(profile: LeadProfile): number {
  let totalScore = 0;
  totalScore += points.colaboradores[profile.colaboradores];
  totalScore += points.porte[profile.porte];
  totalScore += points.investimento[profile.investimento];
  totalScore += points.decisor[profile.decisor];
  return totalScore;
}

export type { LeadProfile, NumeroColaboradores, PorteEmpresa, InvestimentoDisponivel, DecisorPrincipal };
export { calculateLeadScore };