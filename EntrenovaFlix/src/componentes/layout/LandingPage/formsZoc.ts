import { z } from "zod";

export const step1Schema = z.object({
  nomeEmpresa: z.string().min(1, { message: "Por favor, preencha o nome." }),
  telefone: z.string()
    .min(1, { message: 'O telefone é obrigatório.' })
    .refine(value => {
      const numericValue = value.replace(/\D/g, '');
      return numericValue.length === 10 || numericValue.length === 11;
    }, {
      message: 'Número de telefone inválido. Use o formato (XX) XXXXX-XXXX.'
    }),
  setorPrincipal: z.enum(["Indústria", "Serviços", "Comércio / Varejo", "Tecnologia / Startups", "Educação / Cultura"], {
    message: "Selecione o setor.",
  }),

  porteEmpresa: z.enum(["Startup", "PME", "Grande Empresa"], {
    message: "Selecione o porte.",
  }),

  localizacao: z.string().min(1, { message: "Por favor, selecione uma localização." }),

  numeroColaboradores: z.enum(["ate10", "11a30", "30a100", "acima100", "acima500"], {
    message: "Selecione o número de colaboradores.",
  }),
});

export const step2Schema = z.object({
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

export const step3Schema = z
  .object({
    dimensoesAvaliar: z.array(z.string())
      .min(1, { message: "Selecione pelo menos uma dimensão." })
      .max(3, { message: "Selecione no máximo 3 dimensões." }),

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

    mercadoClientes_escuta: z.string().optional(),
    mercadoClientes_colaboracao: z.string().optional(),

    direcaoFuturo_visao: z.string().optional(),
    direcaoFuturo_estrategia: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const checkFields = (prefix: string, fields: string[]) => {
      if (data.dimensoesAvaliar?.includes(prefix)) {
        fields.forEach(field => {
          const key = `${prefix}_${field}` as keyof typeof data;
          if (!data[key]) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Campo obrigatório",
              path: [key],
            });
          }
        });
      } 
    };

    checkFields("pessoasCultura", ["comunicacao", "lideranca", "resolucaoProblemas", "rotina", "valores", "ferramentas"]);
    checkFields("estruturaOperacoes", ["trocaInformacoes","delegacao","processos","autonomia","qualidade","ferramentas"]);
    checkFields("mercadoClientes", ["escuta","colaboracao"]);
    checkFields("direcaoFuturo", ["visao","estrategia"]);
  });


export const step4Schema = z.object({
  faixaInvestimento: z.enum(["ate10k", "10ka50k", "acima50k"], {
    message: "Selecione uma faixa de investimento.",
  }),

  aberturaInovacao: z.enum(["1", "2", "3", "4", "5"], {
    message: "Classifique a abertura para inovação.",
  }),
});


export const fullFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);


export type FormData = z.infer<typeof fullFormSchema>;
