import '../../../styles/estiloForms.css';
import '../../../styles/contratar.css';

export default function FormEmpresa() {
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
                        type="text"
                        className="input"
                        placeholder="00.000.000/0000-00"
                    />
                </div>

                {/* Razão Social */}
                <div className="form-field">
                    <label htmlFor="razaoSocial" className="label">Razão Social:</label>
                    <input
                        id="razaoSocial"
                        type="text"
                        className="input"
                        placeholder="Razão Social da empresa"
                    />
                </div>

                {/* CEP */}
                <div className="form-field">
                    <label htmlFor="cep" className="label">CEP:</label>
                    <input
                        id="cep"
                        type="text"
                        className="input"
                        placeholder="00000-000"
                    />
                </div>

                {/* Rua */}
                <div className="form-field">
                    <label htmlFor="rua" className="label">Rua:</label>
                    <input
                        id="rua"
                        type="text"
                        className="input"
                        placeholder="Nome da rua"
                    />
                </div>

                {/* Número */}
                <div className="form-field">
                    <label htmlFor="numero" className="label">Número:</label>
                    <input
                        id="numero"
                        type="text"
                        className="input"
                        placeholder="Nº"
                    />
                </div>

                {/* Bairro */}
                <div className="form-field">
                    <label htmlFor="bairro" className="label">Bairro:</label>
                    <input
                        id="bairro"
                        type="text"
                        className="input"
                        placeholder="Nome do bairro"
                    />
                </div>

                {/* Cidade */}
                <div className="form-field">
                    <label htmlFor="cidade" className="label">Cidade:</label>
                    <input
                        id="cidade"
                        type="text"
                        className="input"
                        placeholder="Nome da cidade"
                    />
                </div>

                {/* Estado */}
                <div className="form-field">
                    <label htmlFor="estado" className="label">Estado:</label>
                    <select id="estado" className="select">
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