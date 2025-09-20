import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step1() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-section">
      <h2 className="form-title">Sobre sua empresa</h2>
      <p className="form-desc">Informações básicas para entendermos seu contexto.</p>
      
      <div className="form-grid">
        {/* Setor principal */}
        <div className="form-field">
          <label htmlFor="setorPrincipal" className="label">Setor principal:</label>
          <input 
            id="setorPrincipal" 
            type="text" 
            {...register('setorPrincipal')} 
            className="input" 
          />
          {errors.setorPrincipal && <p className="error">{errors.setorPrincipal.message}</p>}
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
          {errors.porteEmpresa && <p className="error">{errors.porteEmpresa.message}</p>}
        </div>
        
        {/* Localização */}
        <div className="form-field full">
          <label htmlFor="localizacao" className="label">Localização:</label>
          <select id="localizacao" {...register('localizacao')} className="select">
            <option value="">Selecione...</option>
            <option value="Sudeste">Sudeste</option>
            <option value="Sul">Sul</option>
            <option value="Nordeste">Nordeste</option>
            <option value="Norte">Norte</option>
            <option value="Centro-Oeste">Centro-Oeste</option>
          </select>
          {errors.localizacao && <p className="error">{errors.localizacao.message}</p>}
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
          {errors.numeroColaboradores && <p className="error">{errors.numeroColaboradores.message}</p>}
        </div>
      </div>
    </div>
  );
}
