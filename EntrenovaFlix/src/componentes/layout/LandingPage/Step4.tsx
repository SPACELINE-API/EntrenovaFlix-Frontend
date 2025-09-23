import { useFormContext } from 'react-hook-form';

export default function Step4() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-section">
      <h2 className="form-title">Investimento, Inovação & Urgência</h2>
      <p className="form-desc">Para finalizar, algumas perguntas sobre o momento atual da sua empresa.</p>

      <div className="grupo-de-perguntas">
        <div className="input-group">
          <label className="form-label">Qual a faixa de investimento disponível para treinamentos?</label>
          <div className="radio-group">
            <label><input type="radio" value="ate10k" {...register('faixaInvestimento')} /> Até R$ 10 mil</label>
            <label><input type="radio" value="10ka50k" {...register('faixaInvestimento')} /> Entre R$ 10 mil e R$ 50 mil</label>
            <label><input type="radio" value="acima50k" {...register('faixaInvestimento')} /> Acima de R$ 50 mil</label>
          </div>
          {errors.faixaInvestimento?.message && (
            <p className="error">{errors.faixaInvestimento.message as string}</p>
          )}
        </div>

        <div className="input-group">
          <label className="form-label">De 1 a 5, como você classificaria a abertura da sua empresa para ideias inovadoras?</label>
          <div className="rating-group">
            {[1, 2, 3, 4, 5].map(value => (
              <label key={value}>
                <input type="radio" value={String(value)} {...register('aberturaInovacao')} />
                <span>{value}</span>
              </label>
            ))}
          </div>
          {errors.aberturaInovacao?.message && (
            <p className="error">{errors.aberturaInovacao.message as string}</p>
          )}
        </div>
      </div>
    </div>
  );
}
