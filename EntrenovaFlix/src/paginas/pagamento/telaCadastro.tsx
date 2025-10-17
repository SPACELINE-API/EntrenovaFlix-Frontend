import FormSolicitante from '../../componentes/layout/contratar/FormSolicitante';
import '../../styles/estiloForms.css';
import '../../styles/contratar.css';

function TelaCadastro() {
    return (
        <div className="cadastro-wrapper">
            <div className="cadastro-container">
                <FormSolicitante />
                <div className="form-buttons">
                    <button type="button" className="button-primary">
                        Próximo
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TelaCadastro;