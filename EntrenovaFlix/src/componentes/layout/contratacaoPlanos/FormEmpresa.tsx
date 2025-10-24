import { FormEmpresaProps as OriginalFormEmpresaProps } from './types'; 
import { formataCNPJ, formataCEP } from '../../../utils/formatters';

interface FormEmpresaProps extends OriginalFormEmpresaProps {
    onCepBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    isLoadingCep: boolean;
    cepError: string | null;
}
export default function FormEmpresa({
    dadosEmpresa,
    onChange,
    errors,
    onCepBlur,
    isLoadingCep,
    cepError
}: FormEmpresaProps) {
    return (
        <div className="form-section">
            <h2 className="form-title">Dados da Empresa</h2>
            <p className="form-desc">Complete as informações da sua empresa.</p>
            <div className="form-grid">
                <div className="form-field">
                    <label htmlFor="cnpj" className="label">CNPJ</label>
                    <input id="cnpj" name="cnpj" type="text" className={`input ${errors?.cnpj ? 'input-error' : ''}`} placeholder="00.000.000/0000-00" value={formataCNPJ(dadosEmpresa.cnpj)} onChange={onChange} maxLength={18} />
                    {errors?.cnpj && (<p className="error">{errors.cnpj[0]}</p> )}
                </div>
                <div className="form-field">
                    <label htmlFor="razaoSocial" className="label">Razão Social</label>
                    <input id="razaoSocial" name="razaoSocial" type="text" className={`input ${errors?.razaoSocial ? 'input-error' : ''}`} placeholder="Nome da empresa" value={dadosEmpresa.razaoSocial} onChange={onChange} />
                    {errors?.razaoSocial && (<p className="error">{errors.razaoSocial[0]}</p> )}
                </div>
                <div className="form-field">
                    <label htmlFor="cep" className="label">CEP</label>
                    <input
                        id="cep"
                        name="cep"
                        type="text"
                        inputMode='numeric'
                        className={`input ${errors?.cep || cepError ? 'input-error' : ''}`} 
                        placeholder="00000-000"
                        value={formataCEP(dadosEmpresa.cep)} 
                        onChange={onChange} 
                        maxLength={9}
                        onBlur={onCepBlur} 
                        disabled={isLoadingCep}
                    />
                    {isLoadingCep && <span style={{ fontSize: '0.8rem', color: 'var(--cor-texto-secundario)' }}> Buscando...</span>}
                    {cepError && <p className="error">{cepError}</p>}
                    {errors?.cep && !cepError && <p className="error">{errors.cep[0]}</p>} 
                </div>
                <div className="form-field">
                    <label htmlFor="rua" className="label">Rua</label>
                    <input
                        id="rua"
                        name="rua"
                        type="text"
                        className={`input ${errors?.rua ? 'input-error' : ''}`}
                        placeholder="Nome da rua"
                        value={dadosEmpresa.rua}
                        onChange={onChange}
                        disabled={isLoadingCep} 
                        readOnly={!isLoadingCep && dadosEmpresa.rua !== ''} 
                    />
                    {errors?.rua && (<p className="error">{errors.rua[0]}</p> )}
                </div>
                <div className="form-field">
                    <label htmlFor="numero" className="label">Número</label>
                    <input
                        id="numero"
                        name="numero"
                        type="text"
                        className={`input ${errors?.numero ? 'input-error' : ''}`}
                        placeholder="Nº"
                        value={dadosEmpresa.numero}
                        onChange={onChange}
                    />
                    {errors?.numero && (<p className="error">{errors.numero[0]}</p> )}
                </div>
                  <div className="form-field">
                    <label htmlFor="complemento" className="label">Complemento</label>
                    <input
                        id="complemento"
                        name="complemento"
                        type="text"
                        className={`input ${errors?.complemento ? 'input-error' : ''}`}
                        placeholder="Apto / Bloco"
                        value={dadosEmpresa.complemento}
                        onChange={onChange}
                    />   
                    {errors?.complemento && (<p className="error">{errors.complemento[0]}</p> )}
                </div>
                <div className="form-field">
                    <label htmlFor="bairro" className="label">Bairro</label>
                    <input
                        id="bairro"
                        name="bairro"
                        type="text"
                        className={`input ${errors?.bairro ? 'input-error' : ''}`}
                        placeholder="Nome do bairro"
                        value={dadosEmpresa.bairro}
                        onChange={onChange}
                        disabled={isLoadingCep}
                        readOnly={!isLoadingCep && dadosEmpresa.bairro !== ''}
                    />
                    {errors?.bairro && (<p className="error">{errors.bairro[0]}</p> )}
                </div>
                <div className="form-field">
                    <label htmlFor="cidade" className="label">Cidade</label>
                    <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        className={`input ${errors?.cidade ? 'input-error' : ''}`}
                        placeholder="Nome da cidade"
                        value={dadosEmpresa.cidade}
                        onChange={onChange}
                        disabled={isLoadingCep} 
                        readOnly={!isLoadingCep && dadosEmpresa.cidade !== ''} 
                    />
                    {errors?.cidade && (<p className="error">{errors.cidade[0]}</p> )}
                </div>
                <div className="form-field">
                   <label htmlFor="estado" className="label">Estado</label>
                    <input
                        type="text"
                        id="estado"
                        name="estado"
                        className={`input ${errors?.estado ? 'input-error' : ''}`}
                        placeholder="UF"
                        value={dadosEmpresa.estado}
                        onChange={onChange}
                        disabled={isLoadingCep}
                        readOnly={!isLoadingCep && dadosEmpresa.estado !== ''}
                        maxLength={2}
                    />
                    {errors?.estado && (<p className="error">{errors.estado[0]}</p> )}
                    </div>
                </div>
        </div>
    );
}