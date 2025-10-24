import * as z from 'zod';

export const solicitanteSchema = z.object({
    nomeCompleto: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
    emailCorporativo: z.string().email("Formato de email inválido"),
    telefone: z.string()
        .min(10, "Telefone deve ter pelo menos 10 dígitos")
        .max(11, "Telefone deve ter no máximo 11 dígitos")
        .regex(/^\d+$/, "Telefone deve conter apenas números"),
    cpf: z.string()
        .length(11, "CPF deve ter 11 dígitos")
        .regex(/^\d+$/, "CPF deve conter apenas números"),
    nomeEmpresa: z.string().min(3, "Nome da empresa deve ter pelo menos 3 caracteres"),
    porteEmpresa: z.string().min(1, "Porte da empresa é obrigatório"),
    complemento: z.string().optional()
});

export const empresaSchema = z.object({
    cnpj: z.string()
        .length(14, "CNPJ deve ter 14 dígitos")
        .regex(/^\d+$/, "CNPJ deve conter apenas números"),
    razaoSocial: z.string().min(3, "Razão social deve ter pelo menos 3 caracteres"),
    cep: z.string()
        .length(8, "CEP deve ter 8 dígitos")
        .regex(/^\d+$/, "CEP deve conter apenas números"),
    rua: z.string().min(3, "Rua é obrigatório"),
    numero: z.string().min(1, "Número é obrigatório"),
    bairro: z.string().min(2, "Bairro é obrigatório"),
    cidade: z.string().min(2, "Cidade é obrigatório"),
    estado: z.string().length(2, "Estado é obrigatório")
});

export const senhaSchema = z.object({
    senha: z.string(),
    confirmarSenha: z.string()
}).refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"]
});

export const pagamentoSchema = z.object({
    numeroCartao: z.string()
        .transform((val) => val.replace(/\s/g, '')) 
        .refine((val) => val.length === 16, "Número do cartão deve ter 16 dígitos")
        .refine((val) => /^\d+$/.test(val), "Número do cartão deve conter apenas números"),
    dataValidade: z.string()
        .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Data de validade deve estar no formato MM/AA"),
    cvv: z.string()
        .min(3, "CVV deve ter pelo menos 3 dígitos")
        .max(4, "CVV deve ter no máximo 4 dígitos")
        .regex(/^\d+$/, "CVV deve conter apenas números"),
    nomeCartao: z.string()
        .min(3, "Nome do cartão deve ter pelo menos 3 caracteres")
        .max(50, "Nome do cartão deve ter no máximo 50 caracteres"),
    formaPagamento: z.enum(['debito', 'credito'], {
        message: "Selecione uma forma de pagamento"
    }),
    plano: z.enum(['essencial', 'premium', 'diamante'], {
        message: "Selecione um plano"
    })
});