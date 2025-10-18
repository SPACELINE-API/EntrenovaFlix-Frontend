import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSolicitante from '../../componentes/layout/contratar/FormSolicitante';
import FormEmpresa from '../../componentes/layout/contratar/FormEmpresa';
import FormSenha from '../../componentes/layout/contratar/FormSenha';
import { solicitanteSchema, empresaSchema, senhaSchema } from '../../componentes/layout/contratar/validation';
import { ValidationErrors } from '../../componentes/layout/contratar/validationErrors';
import '../../styles/estiloForms.css';
import '../../styles/contratar.css';


function TelaCadastro() {
    const [step, setStep] = useState(1);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const navigate = useNavigate();

    // Estados para armazenar os dados dos formulários
    const [dadosSolicitante, setDadosSolicitante] = useState({
        nomeCompleto: '',
        emailCorporativo: '',
        telefone: '',
        cpf: '',
        nomeEmpresa: '',
        porteEmpresa: ''
    });

    const [dadosEmpresa, setDadosEmpresa] = useState({
        cnpj: '',
        razaoSocial: '',
        cep: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
    });

    const [dadosSenha, setDadosSenha] = useState({
        senha: '',
        confirmarSenha: ''
    });

    const handleSolicitanteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let processedValue = value;
        
        // Se o elemento for um input, aplica as formatações específicas
        if (e.target instanceof HTMLInputElement) {
            if (name === 'cpf') {
                processedValue = value.replace(/\D/g, '');
            } else if (name === 'telefone') {
                processedValue = value.replace(/\D/g, '');
            }
        }

        setDadosSolicitante(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === 'cnpj' || name === 'cep') {
            processedValue = value.replace(/\D/g, '');
        }

        setDadosEmpresa(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Remove espaços em branco no início e fim da senha
        const processedValue = value.trim();
        setDadosSenha(prev => ({
            ...prev,
            [name]: processedValue
        }));
    };

    const validateCurrentStep = async () => {
        try {
            let validationResult;
            setValidationErrors({});

            switch (step) {
                case 1:
                    validationResult = await solicitanteSchema.safeParseAsync(dadosSolicitante);
                    if (!validationResult.success) {
                        console.log('Erro na validação do solicitante:', validationResult.error);
                        const errors: ValidationErrors = {};
                        validationResult.error.issues.forEach(error => {
                            if (error.path[0]) {
                                errors[error.path[0] as keyof ValidationErrors] = [error.message];
                            }
                        });
                        setValidationErrors(errors);
                        return false;
                    }
                    break;
                case 2:
                    validationResult = await empresaSchema.safeParseAsync(dadosEmpresa);
                    if (!validationResult.success) {
                        console.log('Erro na validação da empresa:', validationResult.error);
                        const errors: ValidationErrors = {};
                        validationResult.error.issues.forEach(error => {
                            if (error.path[0]) {
                                errors[error.path[0] as keyof ValidationErrors] = [error.message];
                            }
                        });
                        setValidationErrors(errors);
                        return false;
                    }
                    break;
                case 3:
                    validationResult = await senhaSchema.safeParseAsync(dadosSenha);
                    if (!validationResult.success) {
                        console.log('Erro na validação da senha:', validationResult.error);
                        const errors: ValidationErrors = {};
                        validationResult.error.issues.forEach(error => {
                            if (error.path[0]) {
                                errors[error.path[0] as keyof ValidationErrors] = [error.message];
                            }
                        });
                        setValidationErrors(errors);
                        return false;
                    }
                    break;
                default:
                    console.log('Step inválido:', step);
                    return false;
            }
            console.log('Step validado com sucesso:', step);
            return true;
        } catch (error) {
            console.error('Erro inesperado na validação:', error);
            return false;
        }
    };

    const nextStep = async () => {
        console.log('Tentando avançar do step:', step);
        const isValid = await validateCurrentStep();
        console.log('Validação retornou:', isValid);
        if (isValid) {
            setStep(prevStep => {
                const newStep = prevStep + 1;
                console.log('Avançando para o step:', newStep);
                return newStep;
            });
        }
    };

    const prevStep = () => {
        console.log('Voltando do step:', step);
        setStep(prevStep => {
            const newStep = prevStep - 1;
            console.log('Voltando para o step:', newStep);
            return newStep;
        });
    };

    const handleFinish = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            // Dados do Solicitante com a senha
            const solicitanteComSenha = {
                ...dadosSolicitante,
                senha: dadosSenha.senha
            };

            console.log('Dados do cadastro:', {
                solicitante: dadosSolicitante,
                empresa: dadosEmpresa
            });

            // Chamada de API para cadastro aqui (?)
            // Ou talvez após o pagamento que acho melhor por causa do voltar... (Mas ai teria que corrigir e enviar os dados pra tela de pagamento)

            navigate('pagamento');
        }
    };

    return (
        <div className="cadastro-wrapper">
            <div className="cadastro-container">
                {step === 1 && (
                    <FormSolicitante
                        dadosSolicitante={dadosSolicitante}
                        onChange={handleSolicitanteChange}
                        errors={validationErrors}
                    />
                )}
                {step === 2 && (
                    <FormEmpresa
                        dadosEmpresa={dadosEmpresa}
                        onChange={handleEmpresaChange}
                        errors={validationErrors}
                    />
                )}
                {step === 3 && (
                    <FormSenha
                        dadosSenha={dadosSenha}
                        onChange={handleSenhaChange}
                        emailCorporativo={dadosSolicitante.emailCorporativo}
                        errors={validationErrors}
                    />
                )}
                <div className={`form-buttons ${step > 1 ? 'form-buttons--between' : 'form-buttons--end'}`}>
                    {step > 1 && (
                        <button onClick={prevStep} className='button-primary'>Voltar</button>
                    )}
                    {step < 3 ? (
                        <button type="button" className="button-primary" onClick={nextStep}>
                            Próximo
                        </button>
                    ) : (
                        <button type="button" className="button-primary" onClick={handleFinish}>
                            Finalizar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TelaCadastro;