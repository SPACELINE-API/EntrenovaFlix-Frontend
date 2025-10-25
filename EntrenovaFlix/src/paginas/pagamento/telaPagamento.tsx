import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import FormPagamento from '../../componentes/layout/contratacaoPlanos/FormPagamento';
import PixDisplay from '../pagamento/pixDisplay'; 
import BoletoDisplay from '../pagamento/boletoDisplay'; 
import { pagamentoSchema } from '../../componentes/layout/contratacaoPlanos/validation'; 
import { ValidationErrors, DadosPagamento, PlanoEscolhido } from '../../componentes/layout/contratacaoPlanos/types'; 
import { formataData } from '../../utils/formatters';
import api from '../../services/apiService';

type FormaPagamentoOpcoes = DadosPagamento['formaPagamento'];

function TelaPagamento() {
    const navigate = useNavigate();
    const location = useLocation();
    const cadastroData = location.state?.cadastroData;
    const planoInicial = (location.state?.plano as PlanoEscolhido) || '';

    const [dadosPagamento, setDadosPagamento] = useState<DadosPagamento | null>(null);
    const [formaSelecionada, setFormaSelecionada] = useState<FormaPagamentoOpcoes>('');
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    useEffect(() => {
        if (!cadastroData) {
            navigate('/cadastro');
            return;
        }

        setDadosPagamento({
            numeroCartao: '',
            dataValidade: '',
            cvv: '',
            nomeCartao: '',
            formaPagamento: '',
            plano: planoInicial || ''
        });
    }, [cadastroData, navigate, planoInicial]);

    useEffect(() => {
        if (dadosPagamento) {
            setDadosPagamento(prev => prev ? { ...prev, formaPagamento: formaSelecionada } : prev);
        }
    }, [formaSelecionada]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (!dadosPagamento) return;
        const processedValue = ['numeroCartao', 'dataValidade', 'cvv'].includes(name) ? value.replace(/\D/g, '') : value;
        setDadosPagamento(prev => prev ? { ...prev, [name]: processedValue } : prev);
    };

    const handleFormaPagamentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormaSelecionada(e.target.value as FormaPagamentoOpcoes);
        setValidationErrors({});
    };

    const validaEtapa = async (schema: z.Schema, data: unknown) => {
        const result = await schema.safeParseAsync(data);
        if (!result.success) {
            const errors: ValidationErrors = {};
            result.error.issues.forEach(err => {
                if (err.path[0]) errors[err.path[0] as keyof ValidationErrors] = [err.message];
            });
            setValidationErrors(errors);
            return false;
        }
        setValidationErrors({});
        return true;
    };

    const validatePagamento = async () => {
        if (!dadosPagamento) return false;

        const baseSchema = z.object({
            plano: z.enum(['essencial', 'premium', 'diamante'], { required_error: "Plano é obrigatório" }),
            formaPagamento: z.enum(['credito', 'debito', 'pix', 'boleto'], { required_error: "Forma de pagamento é obrigatória" })
        });

        const baseData = { plano: dadosPagamento.plano, formaPagamento: formaSelecionada };
        const baseValid = await validaEtapa(baseSchema, baseData);
        if (!baseValid) return false;

        if (['credito', 'debito'].includes(formaSelecionada)) {
            const cartaoSchema = pagamentoSchema.pick({ numeroCartao: true, dataValidade: true, cvv: true, nomeCartao: true });
            const dadosCartao = { ...dadosPagamento, dataValidade: formataData(dadosPagamento.dataValidade) };
            return validaEtapa(cartaoSchema, dadosCartao);
        }

        return true;
    };

    const handleIniciarAssinatura = async () => {
        if (!formaSelecionada) {
            alert("Selecione uma forma de pagamento");
            return;
        }

        const isValid = await validatePagamento();
        if (!isValid || !dadosPagamento) return;

        if (!cadastroData) {
            console.error("Erro: Dados de cadastro não encontrados!");
            alert("Erro ao processar. Tente voltar e preencher os dados novamente.");
            return;
        }

        const payload = { 
            cadastro: cadastroData, 
            pagamento: { ...dadosPagamento, formaPagamento: formaSelecionada } 
        };

        console.log('ENVIANDO PARA O BACKEND:', JSON.stringify(payload, null, 2));

        try {
            await api.post('/register-empresa', payload);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao criar assinatura:', error);
            alert("Ocorreu um erro ao criar assinatura. Verifique os dados e tente novamente.");
        }
    };

    const handleVoltar = () => navigate('/cadastro');

    if (!dadosPagamento) return null;

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

                <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--cor-borda)', textAlign: 'center' }}>
                    <p className="form-desc" style={{ marginBottom: '0.3rem', fontWeight: 400 }}>Plano:</p>
                    <h3 style={{ color: 'var(--cor-primaria)', textTransform: 'capitalize' }}>
                        {dadosPagamento.plano || 'Nenhum'}
                    </h3>
                </div>

                <div className="form-field full">
                    <label className="label">Escolha a Forma de Pagamento</label>
                    <div className="radio-group" style={{ flexDirection: 'row', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {(['credito','debito','pix','boleto'] as FormaPagamentoOpcoes[]).map(forma => (
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
                        <p className="error-message">{validationErrors.formaPagamento[0]}</p>
                    )}
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    {['credito','debito'].includes(formaSelecionada) && (
                        <FormPagamento dadosCartao={dadosCartao} onChange={handleInputChange as any} errors={validationErrors} />
                    )}
                    {formaSelecionada === 'pix' && <PixDisplay />}
                    {formaSelecionada === 'boleto' && <BoletoDisplay />}
                </div>

                <div className="form-buttons form-buttons--between" style={{ marginTop: '2rem' }}>
                    <button onClick={handleVoltar} className="button-primary">Voltar</button>
                    {formaSelecionada && (
                        <button type="button" className="button-primary" onClick={handleIniciarAssinatura}>
                            {['pix','boleto'].includes(formaSelecionada) ? 'Gerar' : 'Confirmar Pagamento'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TelaPagamento;
