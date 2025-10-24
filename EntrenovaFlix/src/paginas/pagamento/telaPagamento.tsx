import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import FormPagamento from '../../componentes/layout/contratacaoPlanos/FormPagamento';
import PixDisplay from '../pagamento/pixDisplay'; 
import BoletoDisplay from '../pagamento/boletoDisplay'; 
import { pagamentoSchema } from '../../componentes/layout/contratacaoPlanos/validation'; 
import { ValidationErrors, DadosPagamento, PlanoEscolhido } from '../../componentes/layout/contratacaoPlanos/types'; 
import { formataData } from '../../utils/formatters'; 

type FormaPagamentoOpcoes = DadosPagamento['formaPagamento'];

function TelaPagamento() {
    const navigate = useNavigate();
    const location = useLocation();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const planoInicial = (location.state?.plano as PlanoEscolhido) || '';

    const [dadosPagamento, setDadosPagamento] = useState<DadosPagamento>({
        numeroCartao: '',
        dataValidade: '',
        cvv: '',
        nomeCartao: '',
        formaPagamento: '',
        plano: planoInicial
    });

    const [formaSelecionada, setFormaSelecionada] = useState<FormaPagamentoOpcoes>('');

    useEffect(() => {
        setDadosPagamento(prev => ({ ...prev, formaPagamento: formaSelecionada }));
    }, [formaSelecionada]);

    useEffect(() => {
        if (!planoInicial) {
            navigate('/cadastro'); 
        }
    }, [planoInicial, navigate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (name === 'numeroCartao' || name === 'dataValidade' || name === 'cvv') {
            processedValue = value.replace(/\D/g, '');
        }
        setDadosPagamento(prev => ({ ...prev, [name]: processedValue }));
    };

    const handleFormaPagamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormaSelecionada(e.target.value as FormaPagamentoOpcoes);
        setValidationErrors({});
    };

    const validaEtapa = async (schema: z.Schema, data: unknown): Promise<boolean> => {
        const validationResult = await schema.safeParseAsync(data);
        if (!validationResult.success) {
            const errors: ValidationErrors = {};
            validationResult.error.issues.forEach(error => {
                if (error.path[0]) { errors[error.path[0] as keyof ValidationErrors] = [error.message]; }
            });
            setValidationErrors(errors);
            return false;
        }
        setValidationErrors({});
        return true;
    };

   const validatePagamento = async () => {
    const baseSchema = z.object({
        plano: z.enum(['essencial', 'premium', 'diamante'], { required_error: "Plano é obrigatório" }),
        formaPagamento: z.enum(['credito', 'debito', 'pix', 'boleto'], { required_error: "Forma de pagamento é obrigatória" })
    });
    const baseData = { plano: dadosPagamento.plano, formaPagamento: formaSelecionada };
    const baseValid = await validaEtapa(baseSchema, baseData);
    if (!baseValid) return false;

    if (formaSelecionada === 'credito' || formaSelecionada === 'debito') {
        const cartaoSchema = pagamentoSchema.pick({
            numeroCartao: true, dataValidade: true, cvv: true, nomeCartao: true
        });
        const dadosCartaoParaValidar = {
            ...dadosPagamento, 
            dataValidade: formataData(dadosPagamento.dataValidade)
        };
        return validaEtapa(cartaoSchema, dadosCartaoParaValidar);
    }
    return true;
};
    const handleIniciarAssinatura = async () => {
        const isValid = await validatePagamento();
        if (isValid) {
            if (formaSelecionada === 'credito' || formaSelecionada === 'debito') {
            } else if (formaSelecionada === 'pix') {
                return;
            } else if (formaSelecionada === 'boleto') {
                 return;
            }
            navigate('/login');
        } else {
            
        }
    };
    const handleVoltar = () => {
        navigate('/cadastro'); 
    };
    const dadosCartao = {
        numeroCartao: dadosPagamento.numeroCartao,
        dataValidade: dadosPagamento.dataValidade,
        cvv: dadosPagamento.cvv,
        nomeCartao: dadosPagamento.nomeCartao,
    };

    return (
        <div className="cadastro-wrapper">
            <div className="cadastro-container">
                <h2 className="form-titulo">Pagamento</h2>
                <div style={{ marginBottom: '1.0rem', paddingBottom: '1rem', borderBottom: '1px solid var(--cor-borda)', textAlign: 'center' }}>
                    <p className="form-desc" style={{ marginBottom: '0.3rem', fontWeight: '400' }}>Plano:</p>
                    <h3 style={{ color: 'var(--cor-primaria)', textTransform: 'capitalize' }}>
                        {dadosPagamento.plano || 'Nenhum'}
                    </h3>
                </div>
                <div className="form-field full">
                    <label className="label">Escolha a Forma de Pagamento</label>
                    <div className="radio-group" style={{ flexDirection: 'row', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {(['credito', 'debito', 'pix', 'boleto'] as FormaPagamentoOpcoes[]).map((forma) => (
                           forma &&
                           <label key={forma} className="radio-option">
                               <input
                                   type="radio"
                                   name="formaPagamentoSelecionada"
                                   value={forma}
                                   checked={formaSelecionada === forma}
                                   onChange={handleFormaPagamentoChange}
                               />
                               <span>{forma.charAt(0).toUpperCase() + forma.slice(1)}</span>
                           </label>
                        ))}
                    </div>
                     {validationErrors?.formaPagamento && !formaSelecionada && (
                        <p className="error">{validationErrors.formaPagamento[0]}</p>
                    )}
                </div>

                <div style={{marginTop: '1.5rem'}}>
                    { (formaSelecionada === 'credito' || formaSelecionada === 'debito') && (
                        <FormPagamento
                            dadosCartao={dadosCartao}
                            onChange={handleInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
                            errors={validationErrors}
                        />
                    )}
                    { formaSelecionada === 'pix' && <PixDisplay /> }
                    { formaSelecionada === 'boleto' && <BoletoDisplay /> }
                </div>

                <div className="form-buttons form-buttons--between" style={{marginTop: '2rem'}}>
                    <button onClick={handleVoltar} className="button-primary"> Voltar </button>
                    {formaSelecionada && (
                        <button type="button" className="button-primary" onClick={handleIniciarAssinatura}>
                            {formaSelecionada === 'pix' || formaSelecionada === 'boleto' ? 'Gerar' : 'Confirmar Pagamento'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TelaPagamento;