// Importações necessárias para o serviço de diagnóstico
import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';

// Esquemas Zod para validação de dados
// Define a estrutura de uma pergunta do questionário
const QuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  options: z.record(z.string(), z.string())
});

// Define a estrutura de uma dimensão organizacional
const DimensionSchema = z.object({
  name: z.string(),
  questions: z.array(QuestionSchema)
});

// Define a estrutura da resposta de diagnóstico para uma dimensão
const DiagnosisResponseSchema = z.object({
  dimension: z.string(),
  averageScore: z.number(),
  maturityStage: z.string(),
  improvementPath: z.string()
});

// Define a estrutura completa do diagnóstico organizacional
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

// Tipos TypeScript inferidos dos esquemas Zod
type Question = z.infer<typeof QuestionSchema>;
type Dimension = z.infer<typeof DimensionSchema>;
type DiagnosisResponse = z.infer<typeof DiagnosisResponseSchema>;
type FullDiagnosis = z.infer<typeof FullDiagnosisSchema>;

// Estrutura de dados das dimensões organizacionais
// Define as quatro dimensões principais do diagnóstico organizacional com suas respectivas perguntas
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

// Caminhos de melhoria sugeridos para cada dimensão organizacional
const improvementPaths: { [key: string]: string } = {
  "Pessoas & Cultura": "Fortalecer comunicação, liderança e cultura organizacional",
  "Estrutura & Operações": "Aprimorar processos, delegação e autonomia",
  "Mercado & Clientes": "Melhorar escuta de clientes, sinergia comercial e adaptação ao mercado",
  "Direção & Futuro": "Alinhar estratégia, propósito e inovação"
};

// Função auxiliar para calcular o estágio de maturidade baseado na pontuação média
function calculateMaturityStage(average: number): string {
  if (average >= 1.0 && average <= 1.9) return "Inicial";
  if (average >= 2.0 && average <= 2.4) return "Básico";
  if (average >= 2.5 && average <= 3.4) return "Intermediário";
  if (average >= 3.5 && average <= 4.0) return "Avançado";
  return "Indefinido";
}

// Classe principal do serviço de diagnóstico organizacional
// Gerencia a integração com Gemini e coordena o processo de diagnóstico
class DiagnosticService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string = '';

  // Construtor da classe - inicializa o cliente Gemini com validação da chave API
  constructor(apiKey: string) {
    this.apiKey = apiKey;

    if (apiKey && apiKey !== 'your-api-key-here' && apiKey.startsWith('AIzaSy')) {
      // Ambiente do navegador - inicializa cliente Gemini
      if (typeof window !== 'undefined') {
        this.genAI = new GoogleGenerativeAI(apiKey);
        console.log('🔑 Gemini API inicializada com sucesso');
      } else {
        throw new Error('Não está em ambiente de navegador. Este serviço requer um navegador para uso cliente-side do Gemini.');
      }
    } else {
      throw new Error('Nenhuma chave API válida fornecida. Forneça uma chave API válida do Gemini começando com "AIzaSy".');
    }
  }


  // Gera o diagnóstico completo baseado nas respostas coletadas
  // Calcula pontuações por dimensão, gera análises específicas e recomendações gerais
  async generateDiagnosis(responses: { [key: string]: { question: string; answer: string; score: number } }): Promise<FullDiagnosis> {
    const diagnosis: DiagnosisResponse[] = [];
    const dimensionScores: { [key: string]: number[] } = {};

    // Calcula pontuações por dimensão
    for (const dimension of dimensions) {
      const scores: number[] = [];
      for (const question of dimension.questions) {
        scores.push(responses[question.id]?.score || 1);
      }
      dimensionScores[dimension.name] = scores;
    }

    // Gera diagnóstico para cada dimensão
    for (const dimension of dimensions) {
      const scores = dimensionScores[dimension.name];
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const maturityStage = calculateMaturityStage(average);
      const improvementPath = improvementPaths[dimension.name];

      diagnosis.push({
        dimension: dimension.name,
        averageScore: Math.round(average * 100) / 100,
        maturityStage: maturityStage,
        improvementPath: improvementPath
      });
    }

    // Gera resumos específicos por dimensão
    const dimensionSummaries: { [key: string]: { strengths: string[]; weaknesses: string[] } } = {};

    for (const dim of diagnosis) {
      const dimensionPrompt = `Você é um consultor especialista em diagnóstico organizacional.
      Analise a dimensão "${dim.dimension}" com pontuação ${dim.averageScore}/4 (${dim.maturityStage}) e gere:
      1. Pontos fortes específicos desta dimensão (2-3 itens)
      2. Pontos a melhorar específicos desta dimensão (2-3 itens)

      Foque apenas nesta dimensão e seja específico sobre os aspectos positivos e negativos relacionados a ela.

      Responda em formato JSON com as chaves: strengths, weaknesses como arrays de strings.`;

      try {
        const model = this.genAI!.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(dimensionPrompt);
        const responseText = result.response.text().trim();
        if (responseText) {
          const parsed = JSON.parse(responseText);
          dimensionSummaries[dim.dimension] = {
            strengths: parsed.strengths || [],
            weaknesses: parsed.weaknesses || []
          };
        } else {
          dimensionSummaries[dim.dimension] = { strengths: [], weaknesses: [] };
        }
      } catch (error) {
        console.error(`Erro ao gerar resumo para ${dim.dimension}:`, error);
        dimensionSummaries[dim.dimension] = { strengths: [], weaknesses: [] };
      }
    }

    // Gera recomendações gerais
    let recommendations: string[] = [];
    const recommendationsPrompt = `Você é um consultor especialista em diagnóstico organizacional.
    Com base nos dados de diagnóstico organizacional abaixo, gere 3-5 recomendações gerais de melhoria para a organização:

    Dados:
    ${JSON.stringify(diagnosis, null, 2)}

    Responda apenas com um array JSON de strings com as recomendações.`;

    try {
      const model = this.genAI!.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(recommendationsPrompt);
      const recommendationsText = result.response.text().trim();
      if (recommendationsText) {
        recommendations = JSON.parse(recommendationsText);
      }
    } catch (error) {
      console.error("Erro ao gerar recomendações:", error);
    }

    // Combina todos os pontos fortes e fracos das dimensões para compatibilidade retroativa
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

  // Gera diagnóstico segmentado baseado em dados de formulário específicos
  // Processa apenas as dimensões selecionadas e gera análises individuais
  async generateSegmentedDiagnosis(formData: any): Promise<{ [key: string]: { strengths: string[]; weaknesses: string[] } }> {
    const segmented: { [key: string]: { strengths: string[]; weaknesses: string[] } } = {};

    const dimensionMap: { [key: string]: string } = {
      'pessoasCultura': 'Pessoas & Cultura',
      'estruturaOperacoes': 'Estrutura & Operações',
      'mercadoClientes': 'Mercado & Clientes'
      // 'direcaoFuturo': 'Direção & Futuro' // Commented out as per user focus on three dimensions
    };

    const selectedDimensions = formData.dimensoesAvaliar || [];
    console.log('🔍 Dimensões selecionadas:', selectedDimensions);
    console.log('📝 Dados do formulário:', formData);

    // Chamadas reais para a API OpenAI para dimensões selecionadas
    for (const dim of selectedDimensions) {
      const dimName = dimensionMap[dim];
      if (!dimName) continue;

      // Encontra a dimensão correspondente nas dimensões definidas
      const dimension = dimensions.find(d => d.name === dimName);
      if (!dimension) continue;

      // Constrói o contexto das perguntas e respostas
      let questionsContext = 'Perguntas e respostas para esta dimensão:\n';
      const dimensionAnswers: { [key: string]: any } = {};
      let totalScore = 0;
      let questionCount = 0;

      for (const question of dimension.questions) {
        const formValue = formData[question.id];
        if (formValue !== undefined) {
          const score = parseInt(formValue.toString());
          const answerText = question.options[score.toString()] || "Resposta inválida";
          dimensionAnswers[question.id] = { score, answer: answerText };
          questionsContext += `- ${question.text}\n  Resposta: ${answerText} (Pontuação: ${score}/4)\n`;
          totalScore += score;
          questionCount++;
        }
      }

      const averageScore = questionCount > 0 ? totalScore / questionCount : 0;
      console.log(`🔄 Processando dimensão: ${dimName} (Média: ${averageScore.toFixed(1)})`);
      console.log('Perguntas e respostas:', questionsContext);

      const prompt = `Você é um consultor especialista em diagnóstico organizacional.

Dimensão analisada: ${dimName}
Pontuação média: ${averageScore.toFixed(1)}/4

${questionsContext}

Baseado nas respostas acima, gere EXATAMENTE:
- 3 pontos fortes: Frases curtas e concisas (máximo 15 palavras cada) destacando aspectos positivos baseados nas respostas de alta pontuação.
- 3 pontos a melhorar: Frases curtas e concisas (máximo 15 palavras cada) destacando oportunidades de melhoria baseadas nas respostas de baixa pontuação.

Exemplos:
- Pontos fortes: ["Comunicação fluida entre equipes.", "Liderança inspiradora e motivadora.", "Colaboração eficaz em times."]
- Pontos a melhorar: ["Melhorar escuta ativa.", "Definir processos claros.", "Aumentar flexibilidade na rotina."]

IMPORTANTE: Responda APENAS com JSON válido, SEM QUALQUER texto adicional fora do JSON. Use exatamente este formato:
{
  "strengths": ["frase1", "frase2", "frase3"],
  "weaknesses": ["frase1", "frase2", "frase3"]
}`;

      // Retry logic to ensure we get complete responses
      const maxRetries = 3;
      let attempt = 0;
      let success = false;

      while (attempt < maxRetries && !success) {
        attempt++;
        console.log(`🤖 Tentativa ${attempt}/${maxRetries} para ${dimName}...`);

        try {
          const model = this.genAI!.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: {
              temperature: 0.1,
              maxOutputTokens: 200
            }
          });
          const result = await model.generateContent(prompt);
          const responseText = result.response.text().trim();
          console.log(`📄 Resposta bruta do Gemini para ${dimName} (tentativa ${attempt}):`, responseText);

          if (responseText) {
            console.log(`📄 Resposta completa do Gemini para ${dimName}:`, responseText); // Log full response for debugging
            // Tenta extrair JSON da resposta
            const jsonText = this.extractJSON(responseText);
            console.log(`🔍 JSON extraído para ${dimName}:`, jsonText || 'Nenhum JSON encontrado');
            if (jsonText) {
              try {
                const parsed = JSON.parse(jsonText);
                console.log(`✅ JSON parseado para ${dimName}:`, parsed);
                // Verifica se os arrays têm exatamente 3 itens cada
                if (parsed && Array.isArray(parsed.strengths) && Array.isArray(parsed.weaknesses) &&
                    parsed.strengths.length === 3 && parsed.weaknesses.length === 3 &&
                    parsed.strengths.every((s: any) => s && typeof s === 'string' && s.trim().length > 0) &&
                    parsed.weaknesses.every((w: any) => w && typeof w === 'string' && w.trim().length > 0)) {
                  segmented[dim] = {
                    strengths: parsed.strengths,
                    weaknesses: parsed.weaknesses
                  };
                  console.log(`✅ Resposta completa obtida para ${dimName} na tentativa ${attempt}`);
                  success = true;
                } else {
                  console.warn(`⚠️ JSON parseado mas incompleto para ${dimName} (tentativa ${attempt}): strengths=${parsed?.strengths?.length || 0}, weaknesses=${parsed?.weaknesses?.length || 0}`);
                  if (attempt === maxRetries) {
                    // Try text extraction as final fallback
                    const textFallback = this.extractArraysFromText(responseText);
                    if (textFallback.strengths.length >= 3 && textFallback.weaknesses.length >= 3) {
                      segmented[dim] = textFallback;
                      console.log(`✅ Usando extração de texto como fallback final para ${dimName}`);
                      success = true;
                    } else {
                      segmented[dim] = this.getDefaultPhrases(dimName, averageScore);
                      console.log(`⚠️ Fallback para defaults em ${dimName} após ${maxRetries} tentativas`);
                      success = true;
                    }
                  }
                }
              } catch (parseError) {
                console.error(`❌ Erro ao fazer parse do JSON extraído para ${dimName} (tentativa ${attempt}):`, parseError);
                if (attempt === maxRetries) {
                  // Try text extraction as final fallback
                  const textFallback = this.extractArraysFromText(responseText);
                  if (textFallback.strengths.length >= 3 && textFallback.weaknesses.length >= 3) {
                    segmented[dim] = textFallback;
                    console.log(`✅ Usando extração de texto como fallback final para ${dimName}`);
                    success = true;
                  } else {
                    segmented[dim] = this.getDefaultPhrases(dimName, averageScore);
                    console.log(`⚠️ Fallback para defaults em ${dimName} após ${maxRetries} tentativas`);
                    success = true;
                  }
                }
              }
            } else {
              console.error(`❌ Não foi possível extrair JSON da resposta para ${dimName} (tentativa ${attempt})`);
              if (attempt === maxRetries) {
                // Try text extraction as final fallback
                const textFallback = this.extractArraysFromText(responseText);
                if (textFallback.strengths.length >= 3 && textFallback.weaknesses.length >= 3) {
                  segmented[dim] = textFallback;
                  console.log(`✅ Usando extração de texto como fallback final para ${dimName}`);
                  success = true;
                } else {
                  segmented[dim] = this.getDefaultPhrases(dimName, averageScore);
                  console.log(`⚠️ Fallback para defaults em ${dimName} após ${maxRetries} tentativas`);
                  success = true;
                }
              }
            }
          } else {
            console.warn(`⚠️ Resposta vazia do Gemini para ${dimName} (tentativa ${attempt})`);
            if (attempt === maxRetries) {
              segmented[dim] = this.getDefaultPhrases(dimName, averageScore);
              console.log(`⚠️ Fallback para defaults em ${dimName} após ${maxRetries} tentativas`);
              success = true;
            }
          }
        } catch (error) {
          console.error(`❌ Erro ao gerar diagnóstico para ${dim} (tentativa ${attempt}):`, error);
          if (attempt === maxRetries) {
            segmented[dim] = this.getDefaultPhrases(dimName, averageScore);
            console.log(`⚠️ Fallback para defaults em ${dimName} após ${maxRetries} tentativas`);
            success = true;
          }
        }
      }
    }

    console.log('🎯 Resultado final do diagnóstico segmentado:', segmented);
    return segmented;
  }

  // Método auxiliar para extrair JSON da resposta do Gemini
  private extractJSON(text: string): string | null {
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return text.substring(start, end + 1);
    }
    return null;
  }

  // Método auxiliar para extrair arrays de texto quando JSON falha (mantido como backup)
  private extractArraysFromText(text: string): { strengths: string[]; weaknesses: string[] } {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    // Tenta encontrar padrões no texto
    const lines = text.split('\n');
    let currentSection = '';

    for (const line of lines) {
      const lowerLine = line.toLowerCase().trim();
      if (lowerLine.includes('strengths') || lowerLine.includes('"strengths"') || lowerLine.includes('pontos fortes')) {
        currentSection = 'strengths';
        continue;
      }
      if (lowerLine.includes('weaknesses') || lowerLine.includes('"weaknesses"') || (lowerLine.includes('pontos') && lowerLine.includes('melhorar'))) {
        currentSection = 'weaknesses';
        continue;
      }

      const trimmedLine = line.trim();
      if (currentSection === 'strengths' && (trimmedLine.startsWith('-') || trimmedLine.startsWith('"') || trimmedLine.includes(':'))) {
        let item = trimmedLine;
        if (trimmedLine.startsWith('-')) item = item.substring(1).trim();
        if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
        if (item) strengths.push(item);
      }
      if (currentSection === 'weaknesses' && (trimmedLine.startsWith('-') || trimmedLine.startsWith('"') || trimmedLine.includes(':'))) {
        let item = trimmedLine;
        if (trimmedLine.startsWith('-')) item = item.substring(1).trim();
        if (item.startsWith('"') && item.endsWith('"')) item = item.slice(1, -1);
        if (item) weaknesses.push(item);
      }
    }

    return { strengths: strengths.slice(0, 3), weaknesses: weaknesses.slice(0, 3) };
  }

  // Frases padrão para pontos fortes por dimensão
  private getDefaultStrengths(dimName: string): string[] {
    const defaults: { [key: string]: string[] } = {
      'Pessoas & Cultura': ['Comunicação fluida entre equipes.', 'Liderança inspiradora e motivadora.', 'Colaboração eficaz em times.'],
      'Estrutura & Operações': ['Processos bem definidos e eficientes.', 'Delegação clara de responsabilidades.', 'Alta autonomia operacional.'],
      'Mercado & Clientes': ['Escuta ativa dos clientes.', 'Sinergia entre vendas e atendimento.', 'Adaptação rápida ao mercado.']
    };
    return defaults[dimName] || ['Forte presença de valores organizacionais.', 'Equipe engajada e colaborativa.', 'Cultura inovadora.'];
  }

  // Frases padrão para pontos a melhorar por dimensão
  private getDefaultWeaknesses(dimName: string): string[] {
    const defaults: { [key: string]: string[] } = {
      'Pessoas & Cultura': ['Melhorar comunicação interna.', 'Fortalecer liderança colaborativa.', 'Aumentar flexibilidade na rotina.'],
      'Estrutura & Operações': ['Definir processos mais claros.', 'Aprimorar delegação de tarefas.', 'Garantir padrões de qualidade.'],
      'Mercado & Clientes': ['Intensificar escuta de clientes.', 'Melhorar colaboração comercial.', 'Acompanhar metas com rigor.']
    };
    return defaults[dimName] || ['Reduzir falhas na comunicação.', 'Desenvolver habilidades de liderança.', 'Implementar rotinas adaptáveis.'];
  }

  // Fallback para frases baseadas na pontuação média (se disponível)
  private getDefaultPhrases(dimName: string, averageScore: number): { strengths: string[]; weaknesses: string[] } {
    const baseStrengths = this.getDefaultStrengths(dimName);
    const baseWeaknesses = this.getDefaultWeaknesses(dimName);

    // Se pontuação alta (>2.5), enfatiza mais strengths; senão, mais weaknesses
    if (averageScore > 2.5) {
      return {
        strengths: baseStrengths,
        weaknesses: baseWeaknesses.slice(0, 2) // Menos weaknesses
      };
    } else {
      return {
        strengths: baseStrengths.slice(0, 2), // Menos strengths
        weaknesses: baseWeaknesses
      };
    }
  }

  // Executa o diagnóstico organizacional completo baseado nos dados do formulário
  // Processa as respostas fornecidas pelo usuário e gera o diagnóstico completo
  async runFullDiagnostic(formData: any): Promise<FullDiagnosis> {
    console.log("🔄 DIAGNÓSTICO ORGANIZACIONAL INICIADO");
    console.log("⏳ Processando respostas do formulário...");

    // Converte os dados do formulário para o formato esperado
    const responses = this.processFormResponses(formData);

    console.log("✅ Respostas processadas com sucesso!");
    console.log("⏳ Gerando diagnóstico e análise...");

    const fullDiagnosis = await this.generateDiagnosis(responses);

    console.log("✅ Diagnóstico concluído com sucesso!");
    console.log("🎉 DIAGNÓSTICO ORGANIZACIONAL FINALIZADO");
    console.log("📊 Resultados prontos para visualização");

    // Exibe automaticamente o diagnóstico formatado
    this.printFormattedDiagnosis(fullDiagnosis);

    return fullDiagnosis;
  }

  // Processa as respostas do formulário e converte para o formato interno
  // Mapeia as respostas do formulário para o formato esperado pelo diagnóstico
  private processFormResponses(formData: any): { [key: string]: { question: string; answer: string; score: number } } {
    const responses: { [key: string]: { question: string; answer: string; score: number } } = {};

    // Itera por todas as dimensões e perguntas para mapear as respostas
    for (const dimension of dimensions) {
      for (const question of dimension.questions) {
        const formValue = formData[question.id];
        if (formValue !== undefined) {
          const score = parseInt(formValue.toString());
          const answerText = question.options[score.toString()] || "Resposta inválida";

          responses[question.id] = {
            question: question.text,
            answer: answerText,
            score: score
          };
        } else {
          // Se não houver resposta, assume valor padrão
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

  // Imprime o diagnóstico completo no terminal
  // Exibe respostas, diagnóstico por dimensão, pontos fortes, fragilidades e recomendações
  printDiagnosisToTerminal(diagnosis: FullDiagnosis): void {
    console.log("\n=== DIAGNÓSTICO ORGANIZACIONAL ===\n");

    console.log("RESPOSTAS:");
    Object.entries(diagnosis.responses).forEach(([id, response]) => {
      console.log(`${id}: ${response.question} - ${response.answer} (Pontuação: ${response.score})`);
    });

    console.log("\nDIAGNÓSTICO POR DIMENSÃO:");
    diagnosis.diagnosis.forEach(dim => {
      console.log(`${dim.dimension}:`);
      console.log(`  Pontuação média: ${dim.averageScore}`);
      console.log(`  Estágio de maturidade: ${dim.maturityStage}`);
      console.log(`  Trilha de melhoria: ${dim.improvementPath}`);
    });

    console.log("\nPONTOS FORTES:");
    diagnosis.summary.strengths.forEach(strength => console.log(`- ${strength}`));

    console.log("\nFRAGILIDADES:");
    diagnosis.summary.weaknesses.forEach(weakness => console.log(`- ${weakness}`));

    console.log("\nRECOMENDAÇÕES:");
    diagnosis.summary.recommendations.forEach(rec => console.log(`- ${rec}`));
  }

  // Imprime o diagnóstico formatado de forma estruturada
  // Exibe análise detalhada por dimensão com pontos fortes, fragilidades e sugestões de melhoria
  printFormattedDiagnosis(diagnosis: FullDiagnosis): void {
    console.log("\n" + "=".repeat(50));
    console.log("**Análise das Respostas**");
    console.log("=".repeat(50));

    // Calcula pontuação geral de maturidade
    const overallScore = diagnosis.diagnosis.reduce((sum, dim) => sum + dim.averageScore, 0) / diagnosis.diagnosis.length;

    diagnosis.diagnosis.forEach(dim => {
      console.log(`\n**Dimensão: ${dim.dimension}**`);
      console.log(`* Estágio de maturidade: ${dim.averageScore}/4 (${this.getMaturityLevel(dim.averageScore)} em uma escala de 1 a 4)`);

      // Obtém pontos fortes e fragilidades para esta dimensão
      const dimStrengths = diagnosis.summary.strengths.filter(s =>
        s.toLowerCase().includes(dim.dimension.toLowerCase().split(' ')[0])
      );
      const dimWeaknesses = diagnosis.summary.weaknesses.filter(w =>
        w.toLowerCase().includes(dim.dimension.toLowerCase().split(' ')[0])
      );

      console.log("* Pontos fortes:");
      if (dimStrengths.length > 0) {
        dimStrengths.forEach(strength => console.log(`\t+ ${strength}`));
      } else {
        console.log("\t+ Comunicação eficaz");
        console.log("\t+ Liderança colaborativa e comunicativa");
        console.log("\t+ Times eficazes em resolver problemas");
      }

      console.log("* Fragilidades:");
      if (dimWeaknesses.length > 0) {
        dimWeaknesses.forEach(weakness => console.log(`\t+ ${weakness}`));
      } else {
        console.log("\t+ Ocasiões de comunicação confusa ou não muito eficaz");
        console.log("\t+ Falhas na liderança quando necessário");
        console.log("\t+ Rotina de trabalho não flexível ou adaptável");
      }

      console.log("* Trilhas de melhoria recomendadas:");
      console.log(`\t1. Melhorar a comunicação em situações críticas e evitar falhas.`);
      console.log(`\t2. Desenvolver habilidades de liderança mais colaborativas e comunicativas.`);
      console.log(`\t3. Implementar mudanças na rotina de trabalho para torná-la mais flexível e adaptável.`);
    });

    console.log("\n" + "=".repeat(50));
    console.log("**Sugestões Gerais**");
    console.log("=".repeat(50));

    console.log("* Fomentar a comunicação eficaz em todos os níveis da empresa para evitar erros e melhorar a colaboração entre equipes.");
    console.log("* Desenvolver habilidades de liderança mais eficazes e delegação para melhorar a coordenação e a resolução de problemas.");
    console.log("* Implementar mudanças na estrutura operacional e no planejamento de contingência para torná-la mais flexível e adaptável às mudanças no mercado.");
  }

  // Determina o nível de maturidade organizacional baseado na pontuação
  // Retorna uma string descrevendo o estágio de maturidade
  private getMaturityLevel(score: number): string {
    if (score >= 3.5) return "Avançado";
    if (score >= 2.5) return "Intermediário";
    if (score >= 2.0) return "Básico";
    return "Inicial";
  }
}

export default DiagnosticService;
export type { FullDiagnosis, DiagnosisResponse };
