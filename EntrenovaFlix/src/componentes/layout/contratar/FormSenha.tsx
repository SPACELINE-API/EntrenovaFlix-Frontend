import "../../../styles/estiloForms.css";
import "../../../styles/contratar.css";
import "../../../styles/passwordInput.css";
import { FormSenhaProps } from "./types";
import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

function FormSenha({ dadosSenha, onChange, emailCorporativo, errors }: FormSenhaProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-section">
            <h2 className="form-title">Crie sua senha</h2>
            <p className="form-desc">Configure seu acesso à plataforma.</p>

            <div className="form-grid">
                {/* Exibição Email */}
                <div className="form-field full">
                    <label htmlFor="emailCorporativo" className="label">
                        E-mail corporativo:
                    </label>
                    <input
                        id="emailCorporativo"
                        type="email"
                        className="input input-disabled"
                        value={emailCorporativo}
                        disabled
                    />
                </div>

                {/* Senha */}
                <div className="form-field">
                    <label htmlFor="senha" className="label">
                        Crie sua senha:
                    </label>
                    <div className="password-input-container">
                        <input
                            id="senha"
                            name="senha"
                            type={showPassword ? "text" : "password"}
                            placeholder="Digite sua senha"
                            className={`input ${errors?.senha ? 'input-error' : ''}`}
                            value={dadosSenha.senha}
                            onChange={onChange}
                        />
                        <button 
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors?.senha && (
                        <p className="error">{errors.senha[0]}</p>
                    )}

                    <small className="form-text text-muted">
                        A senha deve conter:<br />
                        • Pelo menos 6 caracteres<br />
                        • Pelo menos uma letra maiúscula<br />
                        • Pelo menos uma letra minúscula<br />
                        • Pelo menos um número<br />
                        • Pelo menos um caractere especial
                    </small>
                </div>

                {/* Confirmar Senha */}
                <div className="form-field">
                    <label htmlFor="confirmarSenha" className="label">
                        Confirme sua senha:
                    </label>
                    <input
                        id="confirmarSenha"
                        name="confirmarSenha"
                        type="password"
                        placeholder="Digite sua senha novamente"
                        className={`input ${errors?.confirmarSenha ? 'input-error' : ''}`}
                        value={dadosSenha.confirmarSenha}
                        onChange={onChange}
                    />
                    {errors?.confirmarSenha && (
                        <p className="error">{errors.confirmarSenha[0]}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FormSenha;