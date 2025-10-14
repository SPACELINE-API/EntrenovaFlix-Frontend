import { useFormContext } from 'react-hook-form';

export default function Step6() {
  const { register, formState: { errors }} = useFormContext();

  const renderLikert = (name: string) => (
    <div className="rating-group">
      {[0, 1, 2, 3, 4, 5].map(v => (
        <label key={v}>
          <input {...register(name)} type="radio" value={String(v)} />
          <span>{v}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="form-section">
      <h2 className="form-title">ESG + DHO Integral</h2>
      <p className="form-desc">Avalie práticas de desenvolvimento humano, social e cultural da empresa.</p>

      <div className="input-group">
        <label className="form-label">Nos últimos 12 meses, colaboradores tiveram treinamentos formais?</label>
        <div className="radio-group">
          <label><input {...register('treinamentosRecentes')} type="radio" value="Sim" /> Sim</label>
          <label><input {...register('treinamentosRecentes')} type="radio" value="Nao" /> Não</label>
        </div>
        {errors.treinamentosRecentes?.message && <p className="error">{errors.treinamentosRecentes.message as string}</p>}
      </div>

      <div className="input-group">
        <label className="form-label">Os benefícios atendem às necessidades reais da equipe?</label>
        <div className="radio-group">
          <label><input {...register('beneficiosSuficientes')} type="radio" value="Sim" /> Sim</label>
          <label><input {...register('beneficiosSuficientes')} type="radio" value="Parcialmente" /> Parcialmente</label>
          <label><input {...register('beneficiosSuficientes')} type="radio" value="Nao" /> Não</label>
        </div>
        {errors.beneficiosSuficientes?.message && <p className="error">{errors.beneficiosSuficientes.message as string}</p>}
      </div>

      <div className="input-group">
        <label className="form-label">De 0 a 5, como avalia a transparência nas promoções e reconhecimentos?</label>
        {renderLikert('transparenciaPromocoes')}
        {errors.transparenciaPromocoes?.message && <p className="error">{errors.transparenciaPromocoes.message as string}</p>}
      </div>

      <div className="input-group">
        <label className="form-label">A empresa apoia ações sociais e ambientais?</label>
        <div className="radio-group">
          <label><input {...register('acoesSociaisAmbientais')} type="radio" value="Sim" /> Sim</label>
          <label><input {...register('acoesSociaisAmbientais')} type="radio" value="Parcialmente" /> Parcialmente</label>
          <label><input {...register('acoesSociaisAmbientais')} type="radio" value="Nao" /> Não</label>
        </div>
        {errors.acoesSociaisAmbientais?.message && <p className="error">{errors.acoesSociaisAmbientais.message as string}</p>}
      </div>

      <div className="input-group">
        <label className="form-label">A empresa incentiva cultura, arte ou criatividade?</label>
        <div className="radio-group">
          <label><input {...register('iniciativasCulturais')} type="radio" value="Sim" /> Sim</label>
          <label><input {...register('iniciativasCulturais')} type="radio" value="Parcialmente" /> Parcialmente</label>
          <label><input {...register('iniciativasCulturais')} type="radio" value="Nao" /> Não</label>
        </div>
        {errors.iniciativasCulturais?.message && <p className="error">{errors.iniciativasCulturais.message as string}</p>}
      </div>

      <div className="input-group">
        <label className="form-label">Há espaço para hobbies e talentos pessoais?</label>
        <div className="radio-group">
          <label><input {...register('apoioHobbies')} type="radio" value="Sim" /> Sim</label>
          <label><input {...register('apoioHobbies')} type="radio" value="Parcialmente" /> Parcialmente</label>
          <label><input {...register('apoioHobbies')} type="radio" value="Nao" /> Não</label>
        </div>
        {errors.apoioHobbies?.message && <p className="error">{errors.apoioHobbies.message as string}</p>}
      </div>

      <div className="input-group">
        <label className="form-label">De 0 a 5, quanto a empresa valoriza aprendizado não formal (arte, esporte, criatividade)?</label>
        {renderLikert('valorizaAprendizadoNaoFormal')}
      </div>
      {errors.valorizaAprendizadoNaoFormal?.message && <p className="error">{errors.valorizaAprendizadoNaoFormal.message as string}</p>}
    </div>
  );
}
