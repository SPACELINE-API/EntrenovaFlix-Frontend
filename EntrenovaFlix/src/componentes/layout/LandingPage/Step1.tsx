import { useFormContext } from 'react-hook-form';

export default function Step1() {
  const { register, formState: { errors }, watch } = useFormContext();
  const setorPrincipalValue = watch('setorPrincipal');

  return (
    <div className="form-section">
      <h2 className="form-title">Sobre sua empresa</h2>
      <p className="form-desc">Informações básicas para entendermos seu contexto.</p>
      
      <div className="form-grid">
        {/* Nome da Empresa */}
        <div className="form-field">
          <label htmlFor="nomeEmpresa" className="label">Nome da Empresa:</label>
          <input 
            id="nomeEmpresa" 
            type="text" 
            {...register('nomeEmpresa')} 
            className="input" 
          />
          {errors.nomeEmpresa?.message && (
            <p className="error">{errors.nomeEmpresa.message as string}</p>
          )}
        </div>

        {/* Telefone */}
        <div className="form-field">
          <label htmlFor="telefone" className="label">Telefone:</label>
          <input 
            id="telefone" 
            type="tel" 
            {...register('telefone')} 
            className="input" 
          />
          {errors.telefone?.message && (
            <p className="error">{errors.telefone.message as string}</p>
          )}
        </div>

        {/* Setor principal */}
        <div className="form-field full">
          <label className="label">Setor principal da sua empresa:</label>
          <div className="radio-group">
            <label><input type="radio" value="Indústria" {...register('setorPrincipal')} /> Indústria</label>
            <label><input type="radio" value="Serviços" {...register('setorPrincipal')} /> Serviços</label>
            <label><input type="radio" value="Comércio / Varejo" {...register('setorPrincipal')} /> Comércio / Varejo</label>
            <label><input type="radio" value="Tecnologia / Startups" {...register('setorPrincipal')} /> Tecnologia / Startups</label>
            <label><input type="radio" value="Educação / Cultura" {...register('setorPrincipal')} /> Educação / Cultura</label>
            <label><input type="radio" value="Outro" {...register('setorPrincipal')} /> Outro:</label>
          </div>
          {/* Input condicional para "Outro" */}
          {setorPrincipalValue === 'Outro' && (
            <div style={{ marginTop: '10px' }}>
              <input 
                id="setorPrincipalOutro" 
                type="text" 
                placeholder="Por favor, especifique"
                {...register('setorPrincipalOutro')} 
                className="input" 
              />
              {errors.setorPrincipalOutro?.message && (
                <p className="error">{errors.setorPrincipalOutro.message as string}</p>
              )}
            </div>
          )}
          {errors.setorPrincipal?.message && (
            <p className="error">{errors.setorPrincipal.message as string}</p>
          )}
        </div>
        
        {/* Porte */}
        <div className="form-field">
          <label htmlFor="porteEmpresa" className="label">Porte:</label>
          <select id="porteEmpresa" {...register('porteEmpresa')} className="select">
            <option value="">Selecione...</option>
            <option value="Startup">Startup</option>
            <option value="PME">PME (Pequena/Média)</option>
            <option value="Grande Empresa">Grande Empresa</option>
          </select>
          {errors.porteEmpresa?.message && (
            <p className="error">{errors.porteEmpresa.message as string}</p>
          )}
        </div>
        
        {/* Localização */}
        <div className="form-field">
          <label htmlFor="localizacao" className="label">Localização:</label>
          <select id="localizacao" {...register('localizacao')} className="select">
            <option value="">Selecione...</option>
            <option value="Sudeste">Sudeste</option>
            <option value="Sul">Sul</option>
            <option value="Nordeste">Nordeste</option>
            <option value="Norte">Norte</option>
            <option value="Centro-Oeste">Centro-Oeste</option>
          </select>
          {errors.localizacao?.message && (
            <p className="error">{errors.localizacao.message as string}</p>
          )}
        </div>
        
        {/* Número de colaboradores */}
        <div className="form-field full">
          <label className="label">Número de colaboradores:</label>
          <div className="radio-group">
            <label><input type="radio" value="ate10" {...register('numeroColaboradores')} /> Até 10</label>
            <label><input type="radio" value="11a30" {...register('numeroColaboradores')} /> 11–30</label>
            <label><input type="radio" value="30a100" {...register('numeroColaboradores')} /> 30–100</label>
            <label><input type="radio" value="acima100" {...register('numeroColaboradores')} /> +100</label>
            <label><input type="radio" value="acima500" {...register('numeroColaboradores')} /> +500</label>
          </div>
          {errors.numeroColaboradores?.message && (
            <p className="error">{errors.numeroColaboradores.message as string}</p>
          )}
        </div>
      </div>
    </div>
  );
}