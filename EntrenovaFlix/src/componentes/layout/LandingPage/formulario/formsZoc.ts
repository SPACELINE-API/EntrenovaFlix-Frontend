import { z } from "zod";

export const step1Schema = z.object({

  nomePes: z.string().min(1, { message: "Por favor, preencha com seu nome." }),

  cargo:z.string().min(1, { message: "Por favor, preencha com seu cargo." }),

  nomeEmpresa: z.string().min(1, { message: "Por favor, preencha o nome." }),

  cnpj: z.string()
    .min(1, { message: 'Por favor, preencha o campo.' })
    .transform(val => val.replace(/\D/g, ''))
    .pipe(z.string()
        .length(14, { message: "O CNPJ deve ter 14 dígitos." })
        .regex(/^\d+$/, { message: "O CNPJ deve conter apenas números." })
    ),

  telefone: z.string().min(8, { message: 'O telefone deve ter no mínimo 8 dígitos.' }),

  email: z.string()
  .min(1, {message: 'Por favor, preencha o campo'})
  .email({ message: "Por favor, insira um endereço de e-mail válido (ex: nome@dominio.com)." }),
  
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
    mercadoClientes_reacaoMudanca: z.string().optional(),
    mercadoClientes_metas: z.string().optional(),
    mercadoClientes_diferencial: z.string().optional(),
    mercadoClientes_ferramentas: z.string().optional(),

    direcaoFuturo_visao: z.string().optional(),
    direcaoFuturo_estrategia: z.string().optional(),
    direcaoFuturo_inovacao: z.string().optional(),
    direcaoFuturo_conexaoEstrategia: z.string().optional(),
    direcaoFuturo_proposito: z.string().optional(),
    direcaoFuturo_ferramentas: z.string().optional()
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
    checkFields("mercadoClientes", ["escuta","colaboracao", "reacaoMudanca", "metas", "diferencial", "ferramentas"]);
    checkFields("direcaoFuturo", ["visao","estrategia", "inovacao", "conexaoEstrategia", "proposito", "ferramentas"]);
  });


export const step4Schema = z
  .object({
    faixaInvestimento: z.enum(["ate10k", "10ka50k", "acima50k"], {
      message: "Selecione uma faixa de investimento.",
    }),
    decisorContratacao: z.enum(["CEO/Diretor", "RH/T&D", "Marketing", "Outro"], {
      message: "Selecione um decisor.",
    }),
    preferenciaTreinamento: z.enum(["Presenciais", "Online", "Hibridos"], {
      message: "Selecione uma preferência de treinamento.",
    }),
    aberturaInovacao: z.enum(["1", "2", "3", "4", "5"], {
      message: "Classifique a pergunta de acordo.",
    }),
    importanciaDesenvolvimento: z.enum(["1", "2", "3", "4", "5"], {
      message: "Classifique a pergunta de acordo.",
    }),
     importanciaSoftSkills: z.enum(["1", "2", "3", "4", "5"], {
      message: "Classifique a pergunta de acordo.",
    }),
     importanciaCultura: z.enum(["1", "2", "3", "4", "5"], {
      message: "Classifique a pergunta de acordo.",
    }),
     importanciaImpacto: z.enum(["1", "2", "3", "4", "5"], {
      message: "Classifique a pergunta de acordo.",
    }),
    implementouProjetosInovadores: z.enum(["Sim", "Nao"], {
      message: "Selecione uma opção.",
    }),
    tempoInicio: z.enum(["Imediatamente", "ate3meses", "6mesesoumais"], {
      message: "Selecione um tempo para iniciar.",
    }),
  });


export const step5Schema = z.object({
  preferenciaFormato: z.enum(["Vídeo", "Áudio", "Leitura", "Prática"],{ 
    message: "Selecione o formato preferido de aprendizagem."
  }),
  duracaoPreferida: z.enum(["Longos", "Curtos"],{ 
    message: "Selecione a duração preferida dos treinamentos."
  }),
  contextoTrabalho: z.enum(["Computador", "Deslocamento", "Manual"],{ 
    message: "Selecione o principal contexto de trabalho da equipe."
  }),
  formaAprendizagem: z.enum(["Vídeos", "Áudios", "Leitura"],{ 
    message: "Selecione o formato atual de aprendizagem."
  }),
  modoAprendizagem: z.enum(["Individual", "Grupo"],{ 
    message: "Selecione o formato atual de aprendizagem."
  }),
  tempoDisponivel: z.enum(["Menosde1", "1a3h", "3a5h", "Maisde5"],{ 
    message: "Informe o tempo disponível semanal para treinamentos."
  }),
});

export const step6Schema = z.object({
  treinamentosRecentes: z.enum(["Sim", "Nao"],{ 
    message: "Informe se houve treinamentos formais nos últimos 12 meses."
  }),
  beneficiosSuficientes: z.enum(["Sim", "Parcialmente", "Nao"],{ 
    message: "Informe se os benefícios atuais atendem à equipe."
  }),
  transparenciaPromocoes: z.enum(["0", "1", "2", "3", "4", "5"], { message: "Classifique a transparência nas promoções." }),
  acoesSociaisAmbientais: z.enum(["Sim", "Parcialmente", "Nao"],{ 
    message: "Classifique a transparência nas promoções."
  }),
  iniciativasCulturais: z.enum(["Sim", "Parcialmente", "Nao"],{ 
    message: "Informe se a empresa incentiva cultura, arte ou criatividade."
  }),
  apoioHobbies: z.enum(["Sim", "Parcialmente", "Nao"],{ 
    message: "nforme se há espaço para hobbies e talentos pessoais."
  }),
  valorizaAprendizadoNaoFormal: z.enum(["0", "1", "2", "3", "4", "5"], { message: "Classifique o quanto a empresa valoriza aprendizado não formal." }),
});


export const fullFormSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema);


export type FormData = z.infer<typeof fullFormSchema>;
