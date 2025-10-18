import "../../../styles/estiloForms.css";
import "../../../styles/contratar.css";
import "../../../styles/errorStyles.css";
import { FormSolicitanteProps } from "./types";

export default function FormSolicitante({ dadosSolicitante, onChange, errors }: FormSolicitanteProps) {
    return (
        <div className="form-section">
            <h2 className="form-title">Dados do Solicitante</h2>
            <p className="form-desc">Preencha com suas informações para continuar.</p>

            <div className="form-grid">
                {/* Nome completo */}
                <div className="form-field">
                    <label htmlFor="nomeCompleto" className="label">
                        Nome completo:
                    </label>
                    <input
                        id="nomeCompleto"
                        name="nomeCompleto"
                        type="text"
                        className={`input ${errors?.nomeCompleto ? 'input-error' : ''}`}
                        placeholder="Digite seu nome completo"
                        value={dadosSolicitante.nomeCompleto}
                        onChange={onChange}
                    />
                    {errors?.nomeCompleto && (
                        <p className="error">{errors.nomeCompleto[0]}</p>
                    )}
                </div>

                {/* Email corporativo */}
                <div className="form-field">
                    <label htmlFor="emailCorporativo" className="label">
                        E-mail corporativo:
                    </label>
                    <input
                        id="emailCorporativo"
                        name="emailCorporativo"
                        type="email"
                        placeholder="seuemail@empresa.com"
                        className={`input ${errors?.emailCorporativo ? 'input-error' : ''}`}
                        value={dadosSolicitante.emailCorporativo}
                        onChange={onChange}
                    />
                    {errors?.emailCorporativo && (
                        <p className="error">{errors.emailCorporativo[0]}</p>
                    )}
                </div>

                {/* Telefone */}
                <div className="form-field">
                    <label htmlFor="telefone" className="label">
                        Telefone:
                    </label>
                    <input
                        id="telefone"
                        name="telefone"
                        type="text"
                        placeholder="(00) 00000-0000"
                        className={`input ${errors?.telefone ? 'input-error' : ''}`}
                        value={dadosSolicitante.telefone}
                        onChange={onChange}
                    />
                    {errors?.telefone && (
                        <p className="error">{errors.telefone[0]}</p>
                    )}
                </div>

                {/* Nome da Empresa */}
                <div className="form-field">
                    <label htmlFor="nomeEmpresa" className="label">
                        Nome da Empresa:
                    </label>
                    <input
                        id="nomeEmpresa"
                        name="nomeEmpresa"
                        type="text"
                        className={`input ${errors?.nomeEmpresa ? 'input-error' : ''}`}
                        placeholder="Nome da sua empresa"
                        value={dadosSolicitante.nomeEmpresa}
                        onChange={onChange}
                    />
                    {errors?.nomeEmpresa && (
                        <p className="error">{errors.nomeEmpresa[0]}</p>
                    )}
                </div>

                {/* CPF */}
                <div className="form-field">
                    <label htmlFor="cpf" className="label">
                        CPF:
                    </label>
                    <input
                        id="cpf"
                        name="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        className={`input ${errors?.cpf ? 'input-error' : ''}`}
                        value={dadosSolicitante.cpf ? 
                            dadosSolicitante.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 
                            ''}
                        onChange={onChange}
                        maxLength={14}
                    />
                    {errors?.cpf && (
                        <p className="error">{errors.cpf[0]}</p>
                    )}
                </div>

                {/* Porte */}
                <div className="form-field">
                    <label htmlFor="porteEmpresa" className="label">
                        Porte da empresa:
                    </label>
                    <select 
                        id="porteEmpresa" 
                        name="porteEmpresa"
                        className={`select ${errors?.porteEmpresa ? 'input-error' : ''}`}
                        value={dadosSolicitante.porteEmpresa}
                        onChange={onChange}
                    >
                        <option value="">Selecione...</option>
                        <option value="Startup">Startup</option>
                        <option value="PME">PME (Pequena/Média)</option>
                        <option value="Grande Empresa">Grande Empresa</option>
                    </select>
                    {errors?.porteEmpresa && (
                        <p className="error">{errors.porteEmpresa[0]}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
