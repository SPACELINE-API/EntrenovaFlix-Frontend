import { ChangeEvent } from 'react';
import { ValidationErrors } from './validationErrors';

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
    bairro: string;
    cidade: string;
    estado: string;
}

export interface DadosSenha {
    senha: string;
    confirmarSenha: string;
}

export interface FormSolicitanteProps {
    dadosSolicitante: DadosSolicitante;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors?: ValidationErrors;
}

export interface FormEmpresaProps {
    dadosEmpresa: DadosEmpresa;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors?: ValidationErrors;
}

export interface FormSenhaProps {
    dadosSenha: DadosSenha;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    emailCorporativo: string;
    errors?: ValidationErrors;
}

export interface DadosPagamento {
    numeroCartao: string;
    dataValidade: string;
    cvv: string;
    nomeCartao: string;
    formaPagamento: 'debito' | 'credito' | '';
    plano: 'essencial' | 'premium' | 'diamante' | '';
}

export interface FormPagamentoProps {
    dadosPagamento: DadosPagamento;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    errors?: ValidationErrors;
}