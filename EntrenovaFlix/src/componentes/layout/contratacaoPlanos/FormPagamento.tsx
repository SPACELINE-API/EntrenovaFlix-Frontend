import React from 'react'; 
import { ValidationErrors } from './types'; 
import {formataNumCartao, formataData, formataCVV} from '../../../utils/formatters'; 

interface FormCartaoProps {
    dadosCartao: { 
        numeroCartao: string;
        dataValidade: string;
        cvv: string;
        nomeCartao: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    errors?: ValidationErrors;
}

function FormPagamento({ dadosCartao, onChange, errors }: FormCartaoProps) {
    if (!dadosCartao) {
        return <div>Erro ao carregar formulário de pagamento.</div>; 
    }
    return (
        <div className="form-grid"> 
            <div className="form-field">
                <label htmlFor="numeroCartao" className="label">Número do Cartao</label>
                <input
                    type="text"
                    id="numeroCartao"
                    name="numeroCartao"
                    className={`input ${errors?.numeroCartao ? 'input-error' : ''}`}
                    value={formataNumCartao(dadosCartao.numeroCartao)}
                    onChange={onChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                />
                {errors?.numeroCartao && (
                    <p className="error">{errors.numeroCartao[0]}</p>
                )}
            </div>
            <div className="form-field">
                <label htmlFor="nomeCartao" className="label">Nome no Cartão</label>
                <input
                    type="text"
                    id="nomeCartao"
                    name="nomeCartao"
                    className={`input ${errors?.nomeCartao ? 'input-error' : ''}`}
                    value={dadosCartao.nomeCartao}
                    onChange={onChange}
                    placeholder="Nome impresso no cartão"
                />
                {errors?.nomeCartao && (
                    <p className="error">{errors.nomeCartao[0]}</p>
                )}
            </div>
            <div className="form-field">
                <label htmlFor="dataValidade" className="label">Validade</label>
                <input
                    type="text"
                    id="dataValidade"
                    name="dataValidade"
                    className={`input ${errors?.dataValidade ? 'input-error' : ''}`}
                    value={formataData(dadosCartao.dataValidade)}
                    onChange={onChange}
                    placeholder="MM/AA"
                    maxLength={5}
                />
                {errors?.dataValidade && (
                    <p className="error">{errors.dataValidade[0]}</p>
                )}
            </div>

            <div className="form-field">
                <label htmlFor="cvv" className="label">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    className={`input ${errors?.cvv ? 'input-error' : ''}`}
                    value={formataCVV(dadosCartao.cvv)}
                    onChange={onChange}
                    placeholder="123"
                    maxLength={4}
                />
                {errors?.cvv && (
                    <p className="error">{errors.cvv[0]}</p>
                )}
            </div>
        </div>
    );
}

export default FormPagamento;