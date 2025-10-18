import { FormPagamentoProps } from './types';
import '../../../styles/estiloForms.css';
import '../../../styles/contratar.css';
import '../../../styles/errorStyles.css';

function FormPagamento({ dadosPagamento, onChange, errors }: FormPagamentoProps) {
    // Função para formatar o número do cartão
    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        const limited = cleaned.slice(0, 16);
        // Adiciona espaços a cada 4 dígitos para melhor visualização
        return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    };

    // Função para formatar a data de validade (MM/AA)
    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    // Função para formatar CVV
    const formatCVV = (value: string) => {
        return value.replace(/\D/g, '').slice(0, 4);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCardNumber(e.target.value);
        onChange({
            ...e,
            target: {
                ...e.target,
                name: 'numeroCartao',
                value: formatted
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatExpiryDate(e.target.value);
        onChange({
            ...e,
            target: {
                ...e.target,
                name: 'dataValidade',
                value: formatted
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCVV(e.target.value);
        onChange({
            ...e,
            target: {
                ...e.target,
                name: 'cvv',
                value: formatted
            }
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="form-section">
            <h2 className="form-title">Dados de Pagamento</h2>
            <p className="form-desc">Preencha os dados do seu cartão e escolha seu plano</p>
            
            <div className="form-grid">
                {/* Número do Cartão */}
                <div className="form-field">
                    <label htmlFor="numeroCartao" className="label">Número do Cartão</label>
                    <input
                        type="text"
                        id="numeroCartao"
                        name="numeroCartao"
                        className={`input ${errors?.numeroCartao ? 'input-error' : ''}`}
                        value={dadosPagamento.numeroCartao}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                    />
                    {errors?.numeroCartao && (
                        <p className="error">{errors.numeroCartao[0]}</p>
                    )}
                </div>

                {/* Nome do Cartão */}
                <div className="form-field">
                    <label htmlFor="nomeCartao" className="label">Nome do Cartão</label>
                    <input
                        type="text"
                        id="nomeCartao"
                        name="nomeCartao"
                        className={`input ${errors?.nomeCartao ? 'input-error' : ''}`}
                        value={dadosPagamento.nomeCartao}
                        onChange={onChange}
                        placeholder="Nome como impresso no cartão"
                    />
                    {errors?.nomeCartao && (
                        <p className="error">{errors.nomeCartao[0]}</p>
                    )}
                </div>

                {/* Data de Validade */}
                <div className="form-field">
                    <label htmlFor="dataValidade" className="label">Data de Validade</label>
                    <input
                        type="text"
                        id="dataValidade"
                        name="dataValidade"
                        className={`input ${errors?.dataValidade ? 'input-error' : ''}`}
                        value={dadosPagamento.dataValidade}
                        onChange={handleExpiryDateChange}
                        placeholder="MM/AA"
                    />
                    {errors?.dataValidade && (
                        <p className="error">{errors.dataValidade[0]}</p>
                    )}
                </div>

                {/* CVV */}
                <div className="form-field">
                    <label htmlFor="cvv" className="label">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className={`input ${errors?.cvv ? 'input-error' : ''}`}
                        value={dadosPagamento.cvv}
                        onChange={handleCVVChange}
                        placeholder="123"
                    />
                    {errors?.cvv && (
                        <p className="error">{errors.cvv[0]}</p>
                    )}
                </div>

                {/* Forma de Pagamento */}
                <div className="form-field full">
                    <label className="label">Forma de Pagamento</label>
                    <div className="radio-group">
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="formaPagamento"
                                value="debito"
                                checked={dadosPagamento.formaPagamento === 'debito'}
                                onChange={onChange}
                            />
                            <span>Débito</span>
                        </label>
                        <label className="radio-option">
                            <input
                                type="radio"
                                name="formaPagamento"
                                value="credito"
                                checked={dadosPagamento.formaPagamento === 'credito'}
                                onChange={onChange}
                            />
                            <span>Crédito</span>
                        </label>
                    </div>
                    {errors?.formaPagamento && (
                        <p className="error">{errors.formaPagamento[0]}</p>
                    )}
                </div>

                {/* Escolha do Plano */}
                <div className="form-field full">
                    <label htmlFor="plano" className="label">Escolha o Plano</label>
                    <select
                        id="plano"
                        name="plano"
                        className={`select ${errors?.plano ? 'input-error' : ''}`}
                        value={dadosPagamento.plano}
                        onChange={onChange}
                    >
                        <option value="">Selecione um plano</option>
                        <option value="essencial">Essencial</option>
                        <option value="premium">Premium</option>
                        <option value="diamante">Diamante</option>
                    </select>
                    {errors?.plano && (
                        <p className="error">{errors.plano[0]}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FormPagamento;