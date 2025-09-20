import { z } from 'zod';

// Esquema para a Etapa 1
export const step1Schema = z.object({
  setorPrincipal: z.string().min(1, { message: "Por favor, preencha o setor." }),
  // -> 1. Padronizado para 'error', que é o correto para enums obrigatórios
  porteEmpresa: z.enum(['Startup', 'PME', 'Grande Empresa'], { error: "Selecione o porte." }),
  localizacao: z.string().min(1, { message: "Por favor, selecione uma localização." }),
  numeroColaboradores: z.enum(['ate10', '11a30', '30a100', 'acima100', 'acima500'], { error: "Selecione o número de colaboradores." }),
});

// Esquema para a Etapa 2
export const step2Schema = z.object({
  // -> 1. Padronizado para 'message'
  desafiosPrioritarios: z.array(z.string())
    .min(1, { message: "Selecione pelo menos um desafio." })
    .max(3, { message: "Selecione no máximo 3 desafios." }),
  objetivosPrincipais: z.array(z.string())
    .min(1, { message: "Selecione pelo menos um objetivo." })
    .max(3, { message: "Selecione no máximo 3 objetivos." }),
  dimensoesAvaliar: z.array(z.string())
    .min(1, { message: "Selecione pelo menos uma dimensão." })
    .max(3, { message: "Selecione no máximo 3 dimensões." }),
});

// Esquema para a Etapa 3
export const step3Schema = z.object({
  // -> 2. Campo 'dimensoesAvaliar' removido daqui por ser redundante (sua fonte é a Etapa 2)
  pessoasCultura_comunicacao: z.string().optional(),
  pessoasCultura_lideranca: z.string().optional(),
  pessoasCultura_resolucaoProblemas: z.string().optional(),
  pessoasCultura_rotina: z.string().optional(),
  pessoasCultura_valores: z.string().optional(),
  pessoasCultura_ferramentas: z.string().optional(),
  estruturaOperacoes_trocaInformacoes: z.string().optional(),
  estruturaOperacoes_delegacao: z.string().optional(),
  estruturaOperacoes_processos: z.string().optional(),
  estruturaOperacoes_autonomia: z.string().optional(),
  estruturaOperacoes_qualidade: z.string().optional(),
  estruturaOperacoes_ferramentas: z.string().optional(),
}).superRefine((data: any, ctx) => { // Tipar 'data' como 'any' aqui é uma forma simples de acessar as propriedades
  if (data.dimensoesAvaliar?.includes('pessoasCultura')) {
    if (!data.pessoasCultura_comunicacao) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Campo obrigatório", path: ['pessoasCultura_comunicacao'] });
    if (!data.pessoasCultura_lideranca) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Campo obrigatório", path: ['pessoasCultura_lideranca'] });
    // Adicione outras validações para 'pessoasCultura' aqui...
  }
  if (data.dimensoesAvaliar?.includes('estruturaOperacoes')) {
    if (!data.estruturaOperacoes_trocaInformacoes) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Campo obrigatório", path: ['estruturaOperacoes_trocaInformacoes'] });
    // Adicione outras validações para 'estruturaOperacoes' aqui...
  }
});

// Esquema para a Etapa 4
export const step4Schema = z.object({
  faixaInvestimento: z.enum(['ate10k', '10ka50k', 'acima50k'], { error: "Selecione uma faixa de investimento."}),
  aberturaInovacao: z.enum(['1', '2', '3', '4', '5'], { error: "Classifique a abertura para inovação."}),
});

// Junta todos os schemas para a validação final
export const fullFormSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);

// Exporta o tipo inferido do schema completo
export type FormData = z.infer<typeof fullFormSchema>;