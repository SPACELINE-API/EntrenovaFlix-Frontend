import "../../../styles/contratacaoPlanos.css";
import { FormSolicitanteProps } from "./types";
import { formataCPF, formataTel } from "../../../utils/formatters";

export default function FormSolicitante({ dadosSolicitante, onChange, errors }: FormSolicitanteProps) {
    return (
        <div className="form-section">
            <h2 className="form-title">Dados do Solicitante</h2>
            <p className="form-desc">Preencha com suas informações para continuar.</p>
            <div className="form-grid">
                <div className="form-field">
                    <label htmlFor="nome" className="label">
                        Nome
                    </label>
                    <input
                        id="nome"
                        name="nome"
                        type="text"
                        className={`input ${errors?.nome ? 'input-error' : ''}`}
                        placeholder="Digite seu nome"
                        value={dadosSolicitante.nome}
                        onChange={onChange}
                    />
                    {errors?.nome && (
                        <p className="error">{errors.nome[0]}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="sobrenome" className="label">
                        Sobrenome
                    </label>
                    <input
                        id="sobrenome"
                        name="sobrenome"
                        type="text"
                        className={`input ${errors?.sobrenome ? 'input-error' : ''}`}
                        placeholder="Digite seu sobrenome"
                        value={dadosSolicitante.sobrenome}
                        onChange={onChange}
                    />
                    {errors?.sobrenome && (
                        <p className="error">{errors.sobrenome[0]}</p>
                    )}
                </div>
                <div className="form-field">
                    <label htmlFor="emailCorporativo" className="label">
                        E-mail corporativo
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
                <div className="form-field">
                    <label htmlFor="telefone" className="label">
                        Telefone
                    </label>
                    <input
                        id="telefone"
                        name="telefone"
                        type="text"
                        placeholder="(00) 00000-0000"
                        className={`input ${errors?.telefone ? 'input-error' : ''}`}
                        value={formataTel(dadosSolicitante.telefone)}
                        onChange={onChange}
                        maxLength={15}
                    />
                    {errors?.telefone && (
                        <p className="error">{errors.telefone[0]}</p>
                    )}
              </div>
                <div className="form-field">
                    <label htmlFor="nomeEmpresa" className="label">
                        Nome da Empresa
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

                <div className="form-field">
                    <label htmlFor="cpf" className="label">
                        CPF
               </label>
                    <input
                        id="cpf"
                        name="cpf"
                        type="text"
                     placeholder="000.000.000-00"
                        className={`input ${errors?.cpf ? 'input-error' : ''}`}
                        value={formataCPF(dadosSolicitante.cpf)}
                        onChange={onChange}
                     maxLength={14}
                    />
                    {errors?.cpf && (
                        <p className="error">{errors.cpf[0]}</p>
                    )}
                </div>

                <div className="form-field">                 
                <label htmlFor="porteEmpresa" className="label">
                        Porte da empresa
                    </label>
                    <select 
                        id="porteEmpresa" 
                        name="porteEmpresa"
                        className={`select ${errors?.porteEmpresa ? 'input-error' : ''}`}
                        value={dadosSolicitante.porteEmpresa}
                        onChange={onChange}>
                        <option value="">Selecione...</option>
                        <option value="Startup">1-10 funcionários</option>
                        <option value="PME">11-50 funcionários</option>
                        <option value="Grande Empresa">+50 funcionários</option>
                    </select>
                    {errors?.porteEmpresa && (
                     <p className="error">{errors.porteEmpresa[0]}</p>
                   )}
                </div>
            </div>
        </div>
    );
}