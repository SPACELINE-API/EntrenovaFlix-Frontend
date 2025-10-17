import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSolicitante from '../../componentes/layout/contratar/FormSolicitante';
import FormEmpresa from '../../componentes/layout/contratar/FormEmpresa';
import '../../styles/estiloForms.css';
import '../../styles/contratar.css';


function TelaCadastro() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const handleFinish = () => {
        navigate('./pagamento/'); // Ajuste a rota conforme necessário
    };

    return (
        <div className="cadastro-wrapper">
            <div className="cadastro-container">
                {step === 1 && <FormSolicitante />}
                {step === 2 && <FormEmpresa />}
                <div className={`form-buttons ${step > 1 ? 'form-buttons--between' : 'form-buttons--end'}`}>
                    {step > 1 && (
                        <button onClick={prevStep} className='button-primary'>Voltar</button>
                    )}
                    {step < 2 && (
                        <button type="button" className="button-primary" onClick={nextStep}>
                            Próximo
                        </button>
                    )}
                    {step === 2 && (
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