import { ChangeEvent } from 'react';

export interface DadosSolicitante {
    nomeCompleto: string;
    emailCorporativo: string;
    telefone: string;
    cpf: string;
    nomeEmpresa: string;
    porteEmpresa: string;
}

export interface DadosEmpresa {
    cnpj: string;
    razaoSocial: string;
    cep: string;
    rua: string;
    numero: string;
    complemento:string;
    bairro: string;
    cidade: string;
    estado: string;
}

export interface DadosSenha {
    senha: string;
    confirmarSenha: string;
}

export interface DadosPagamento {
    numeroCartao: string;
    dataValidade: string;
    cvv: string;
    nomeCartao: string;
    formaPagamento: 'debito' | 'credito' | 'pix' | 'boleto' | '';
    plano: PlanoEscolhido;
}
export type PlanoEscolhido = 'essencial' | 'premium' | 'diamante' | '';

export interface ValidationErrors {
    nomeCompleto?: string[];
    emailCorporativo?: string[];
    telefone?: string[];
    cpf?: string[];
    nomeEmpresa?: string[];
    porteEmpresa?: string[];
    cnpj?: string[];
    razaoSocial?: string[];
    cep?: string[];
    rua?: string[];
    complemento?: string[];
    numero?: string[];
    bairro?: string[];
    cidade?: string[];
    estado?: string[];
    senha?: string[];
    confirmarSenha?: string[];
    numeroCartao?: string[];
    dataValidade?: string[];
    cvv?: string[];
    nomeCartao?: string[];
    formaPagamento?: string[];
    plano?: string[];
}

type onChangeType = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;

export interface FormSolicitanteProps {
    dadosSolicitante: DadosSolicitante;
    onChange: onChangeType;
    errors?: ValidationErrors;
}

export interface FormEmpresaProps {
    dadosEmpresa: DadosEmpresa;
    onChange: onChangeType;
    errors?: ValidationErrors;
}

export interface FormSenhaProps {
    dadosSenha: DadosSenha;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    emailCorporativo: string;
    errors?: ValidationErrors;
}

export interface FormPagamentoProps {
    dadosPagamento: DadosPagamento;
    onChange: onChangeType;
    errors?: ValidationErrors;
}