import '../../../styles/estiloForms.css';
import '../../../styles/contratar.css';
import '../../../styles/errorStyles.css';
import { FormEmpresaProps } from './types';

const formatCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, '');
    if (numbers.length === 14) {
        return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return numbers;
};

const formatCEP = (cep: string) => {
    const numbers = cep.replace(/\D/g, '');
    if (numbers.length === 8) {
        return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    }
    return numbers;
};

export default function FormEmpresa({ dadosEmpresa, onChange, errors }: FormEmpresaProps) {
    return (
        <div className="form-section">
            <h2 className="form-title">Dados da Empresa</h2>
            <p className="form-desc">Complete as informações da sua empresa.</p>

            <div className="form-grid">
                {/* CNPJ */}
                <div className="form-field">
                    <label htmlFor="cnpj" className="label">CNPJ:</label>
                    <input
                        id="cnpj"
                        name="cnpj"
                        type="text"
                        className={`input ${errors?.cnpj ? 'input-error' : ''}`}
                        placeholder="00.000.000/0000-00"
                        value={formatCNPJ(dadosEmpresa.cnpj)}
                        onChange={onChange}
                        maxLength={18}
                    />
                    {errors?.cnpj && (
                        <p className="error">{errors.cnpj[0]}</p>
                    )}
                </div>

                {/* Razão Social */}
                <div className="form-field">
                    <label htmlFor="razaoSocial" className="label">Razão Social:</label>
                    <input
                        id="razaoSocial"
                        name="razaoSocial"
                        type="text"
                        className={`input ${errors?.razaoSocial ? 'input-error' : ''}`}
                        placeholder="Razão Social da empresa"
                        value={dadosEmpresa.razaoSocial}
                        onChange={onChange}
                    />
                    {errors?.razaoSocial && (
                        <p className="error">{errors.razaoSocial[0]}</p>
                    )}
                </div>

                {/* CEP */}
                <div className="form-field">
                    <label htmlFor="cep" className="label">CEP:</label>
                    <input
                        id="cep"
                        name="cep"
                        type="text"
                        className={`input ${errors?.cep ? 'input-error' : ''}`}
                        placeholder="00000-000"
                        value={formatCEP(dadosEmpresa.cep)}
                        onChange={onChange}
                        maxLength={9}
                    />
                    {errors?.cep && (
                        <p className="error">{errors.cep[0]}</p>
                    )}
                </div>

                {/* Rua */}
                <div className="form-field">
                    <label htmlFor="rua" className="label">Rua:</label>
                    <input
                        id="rua"
                        name="rua"
                        type="text"
                        className={`input ${errors?.rua ? 'input-error' : ''}`}
                        placeholder="Nome da rua"
                        value={dadosEmpresa.rua}
                        onChange={onChange}
                    />
                    {errors?.rua && (
                        <p className="error">{errors.rua[0]}</p>
                    )}
                </div>

                {/* Número */}
                <div className="form-field">
                    <label htmlFor="numero" className="label">Número:</label>
                    <input
                        id="numero"
                        name="numero"
                        type="text"
                        className={`input ${errors?.numero ? 'input-error' : ''}`}
                        placeholder="Nº"
                        value={dadosEmpresa.numero}
                        onChange={onChange}
                    />
                    {errors?.numero && (
                        <p className="error">{errors.numero[0]}</p>
                    )}
                </div>

                {/* Bairro */}
                <div className="form-field">
                    <label htmlFor="bairro" className="label">Bairro:</label>
                    <input
                        id="bairro"
                        name="bairro"
                        type="text"
                        className={`input ${errors?.bairro ? 'input-error' : ''}`}
                        placeholder="Nome do bairro"
                        value={dadosEmpresa.bairro}
                        onChange={onChange}
                    />
                    {errors?.bairro && (
                        <p className="error">{errors.bairro[0]}</p>
                    )}
                </div>

                {/* Cidade */}
                <div className="form-field">
                    <label htmlFor="cidade" className="label">Cidade:</label>
                    <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        className="input"
                        placeholder="Nome da cidade"
                        value={dadosEmpresa.cidade}
                        onChange={onChange}
                    />
                </div>

                {/* Estado */}
                <div className="form-field">
                    <label htmlFor="estado" className="label">Estado:</label>
                    <select
                        id="estado"
                        name="estado"
                        className="select"
                        value={dadosEmpresa.estado}
                        onChange={onChange}>
                        <option value="">Selecione o estado</option>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                    </select>
                </div>
            </div>
        </div>
    );
}