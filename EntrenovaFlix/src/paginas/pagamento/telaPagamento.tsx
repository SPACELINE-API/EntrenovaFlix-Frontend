import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormPagamento from '../../componentes/layout/contratar/FormPagamento';
import PlanoCard from '../../componentes/layout/contratar/PlanoCard';
import { pagamentoSchema } from '../../componentes/layout/contratar/validation';
import { ValidationErrors } from '../../componentes/layout/contratar/validationErrors';
import '../../styles/estiloForms.css';
import '../../styles/contratar.css';
import '../../styles/devolutiva.css';

function TelaPagamento() {
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    
    const [dadosPagamento, setDadosPagamento] = useState({
        numeroCartao: '',
        dataValidade: '',
        cvv: '',
        nomeCartao: '',
        formaPagamento: '' as 'debito' | 'credito' | '',
        plano: '' as 'essencial' | 'premium' | 'diamante' | ''
    });

    const handlePagamentoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setDadosPagamento(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validatePagamento = async () => {
        try {
            setValidationErrors({});
            const validationResult = await pagamentoSchema.safeParseAsync(dadosPagamento);
            
            if (!validationResult.success) {
                console.log('Erro na validação do pagamento:', validationResult.error);
                const errors: ValidationErrors = {};
                validationResult.error.issues.forEach(error => {
                    if (error.path[0]) {
                        errors[error.path[0] as keyof ValidationErrors] = [error.message];
                    }
                });
                setValidationErrors(errors);
                return false;
            }
            
            console.log('Pagamento validado com sucesso');
            return true;
        } catch (error) {
            console.error('Erro inesperado na validação do pagamento:', error);
            return false;
        }
    };

    const handleIniciarAssinatura = async () => {
        const isValid = await validatePagamento();
        if (isValid) {
            console.log('Dados do pagamento:', dadosPagamento);
            
            // Chamada da API para processar o pagamento
            alert('Assinatura iniciada com sucesso!');
            
            // Redirecionar para o dashboard ou página de confirmação
            navigate('/login');
        }
    };

    const handleVoltar = () => {
        navigate('/cadastro');
    };

    return (
        <div className="cadastro-wrapper">
            <div className="cadastro-container">
                <FormPagamento
                    dadosPagamento={dadosPagamento}
                    onChange={handlePagamentoChange}
                    errors={validationErrors}
                />
                
                {/* Exibir card do plano selecionado */}
                <PlanoCard plano={dadosPagamento.plano} />
                
                <div className="form-buttons form-buttons--between">
                    <button onClick={handleVoltar} className="button-primary">
                        Voltar
                    </button>
                    <button type="button" className="button-primary" onClick={handleIniciarAssinatura}>
                        Iniciar Assinatura
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TelaPagamento;