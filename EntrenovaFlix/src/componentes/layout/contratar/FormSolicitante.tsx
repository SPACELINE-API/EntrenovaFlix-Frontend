import "../../../styles/estiloForms.css";
import "../../../styles/contratar.css";

export default function FormSolicitante() {
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
                        type="text"
                        className="input"
                        placeholder="Digite seu nome completo"
                    />
                </div>

                {/* Email corporativo */}
                <div className="form-field">
                    <label htmlFor="emailCorporativo" className="label">
                        E-mail corporativo:
                    </label>
                    <input
                        id="emailCorporativo"
                        type="email"
                        placeholder="seuemail@empresa.com"
                        className="input"
                    />
                </div>

                {/* Telefone */}
                <div className="form-field">
                    <label htmlFor="telefone" className="label">
                        Telefone:
                    </label>
                    <input
                        id="telefone"
                        type="text"
                        placeholder="(00) 00000-0000"
                        className="input"
                    />
                </div>

                {/* Nome da Empresa */}
                <div className="form-field">
                    <label htmlFor="nomeEmpresa" className="label">
                        Nome da Empresa:
                    </label>
                    <input
                        id="nomeEmpresa"
                        type="text"
                        className="input"
                        placeholder="Nome da sua empresa"
                    />
                </div>

                {/* CPF */}
                <div className="form-field">
                    <label htmlFor="cpf" className="label">
                        CPF:
                    </label>
                    <input
                        id="cpf"
                        type="text"
                        placeholder="000.000.000-00"
                        className="input"
                    />
                </div>

                {/* Porte */}
                <div className="form-field">
                    <label htmlFor="porteEmpresa" className="label">
                        Porte da empresa:
                    </label>
                    <select id="porteEmpresa" className="select">
                        <option value="">Selecione...</option>
                        <option value="Startup">Startup</option>
                        <option value="PME">PME (Pequena/Média)</option>
                        <option value="Grande Empresa">Grande Empresa</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
