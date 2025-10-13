import { useFormContext, Controller } from 'react-hook-form';

export default function Step4() {
  const { control, formState: { errors }, watch } = useFormContext();
  const decisor = watch('decisorContratacao');

  return (
    <div className="form-section">
      <h2 className="form-title">Investimento, Inovação & Urgência</h2>
      <p className="form-desc">Para finalizar, algumas perguntas sobre o momento atual da sua empresa.</p>

      <div className="grupo-de-perguntas">
        <div className="input-group">
          <label className="form-label">Qual a faixa de investimento disponível para treinamentos atualmente? </label>
          <Controller
            name="faixaInvestimento"
            control={control}
            render={({ field }) => (
              <div className="radio-group">
                <label><input {...field} type="radio" value="ate10k" checked={field.value === 'ate10k'} /> Até R$ 10 mil </label>
                <label><input {...field} type="radio" value="10ka50k" checked={field.value === '10ka50k'} /> Entre R$ 10 mil e R$ 50 mil </label>
                <label><input {...field} type="radio" value="acima50k" checked={field.value === 'acima50k'} /> Acima de R$ 50 mil </label>
              </div>
            )}
          />
          {errors.faixaInvestimento?.message && <p className="error">{errors.faixaInvestimento.message as string}</p>}
        </div>

        <div className="input-group">
          <label className="form-label">Quem geralmente decide sobre a contratação de treinamentos? </label>
          <Controller
            name="decisorContratacao"
            control={control}
            render={({ field }) => (
              <div className="radio-group">
                <label><input {...field} type="radio" value="CEO/Diretor" checked={field.value === 'CEO/Diretor'} /> CEO/ Diretor</label>
                <label><input {...field} type="radio" value="RH/T&D" checked={field.value === 'RH/T&D'} /> RH/Treinamento e Desenvolvimento </label>
                <label><input {...field} type="radio" value="Marketing" checked={field.value === 'Marketing'} /> Marketing / Comunicação </label>
                <label><input {...field} type="radio" value="Outro" checked={field.value === 'Outro'} /> Outro: </label>
              </div>
            )}
          />
          {decisor === 'Outro' && (
            <Controller
              name="decisorContratacaoOutro"
              control={control}
              render={({ field }) => <input {...field} type="text" placeholder="Por favor, especifique" className="input" style={{ marginTop: '10px' }} />}
            />
          )}
          {errors.decisorContratacao?.message && <p className="error">{errors.decisorContratacao.message as string}</p>}
          {errors.decisorContratacaoOutro?.message && <p className="error">{errors.decisorContratacaoOutro.message as string}</p>}
        </div>

        <div className="input-group">
          <label className="form-label">Vocês preferem treinamentos: </label>
          <Controller
            name="preferenciaTreinamento"
            control={control}
            render={({ field }) => (
              <div className="radio-group">
                <label><input {...field} type="radio" value="Presenciais" checked={field.value === 'Presenciais'} /> Presenciais </label>
                <label><input {...field} type="radio" value="Online" checked={field.value === 'Online'} /> Online </label>
                <label><input {...field} type="radio" value="Hibridos" checked={field.value === 'Hibridos'} /> Híbridos </label>
              </div>
            )}
          />
          {errors.preferenciaTreinamento?.message && <p className="error">{errors.preferenciaTreinamento.message as string}</p>}
        </div>

        <div className="input-group">
          <label className="form-label">De 1 a 5, como você classificaria a abertura da sua empresa para ideias inovadoras e métodos criativos de aprendizagem? </label>
          <Controller
            name="aberturaInovacao"
            control={control}
            render={({ field }) => (
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map(value => (
                  <label key={value}>
                    <input {...field} type="radio" value={String(value)} checked={field.value === String(value)} />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.aberturaInovacao?.message && <p className="error">{errors.aberturaInovacao.message as string}</p>}
        </div>

        <div className="input-group rating-multiple">
          <label className="form-label">De 1 a 5, o quanto você considera importante: </label>
          <div className="rating-item">
            <p>Investir em desenvolvimento profissional dos colaboradores </p>
            <Controller name="importanciaDesenvolvimento" control={control} render={({ field }) => (
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map(v => <label key={v}><input {...field} type="radio" value={String(v)} checked={field.value === String(v)} /><span>{v}</span></label>)}
              </div>
            )} />
            {errors.importanciaDesenvolvimento?.message && <p className="error">{errors.importanciaDesenvolvimento.message as string}</p>}
          </div>
          <div className="rating-item">
            <p>Desenvolver soft skills (comunicação, liderança, etc.) </p>
            <Controller name="importanciaSoftSkills" control={control} render={({ field }) => (
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map(v => <label key={v}><input {...field} type="radio" value={String(v)} checked={field.value === String(v)} /><span>{v}</span></label>)}
              </div>
            )} />
            {errors.importanciaSoftSkills?.message && <p className="error">{errors.importanciaSoftSkills.message as string}</p>}
          </div>
          <div className="rating-item">
            <p>Incentivar cultura, arte e hobbies </p>
            <Controller name="importanciaCultura" control={control} render={({ field }) => (
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map(v => <label key={v}><input {...field} type="radio" value={String(v)} checked={field.value === String(v)} /><span>{v}</span></label>)}
              </div>
            )} />
            {errors.importanciaCultura?.message && <p className="error">{errors.importanciaCultura.message as string}</p>}
          </div>
          <div className="rating-item">
            <p>Reconhecer impacto do desenvolvimento humano na performance da empresa </p>
            <Controller name="importanciaImpacto" control={control} render={({ field }) => (
              <div className="rating-group">
                {[1, 2, 3, 4, 5].map(v => <label key={v}><input {...field} type="radio" value={String(v)} checked={field.value === String(v)} /><span>{v}</span></label>)}
              </div>
            )} />
            {errors.importanciaImpacto?.message && <p className="error">{errors.importanciaImpacto.message as string}</p>}
          </div>
        </div>

        <div className="input-group">
          <label className="form-label">Vocês já implementaram projetos inovadores em treinamentos anteriores? </label>
          <Controller
            name="implementouProjetosInovadores"
            control={control}
            render={({ field }) => (
              <div className="radio-group">
                <label><input {...field} type="radio" value="Sim" checked={field.value === 'Sim'} /> Sim </label>
                <label><input {...field} type="radio" value="Nao" checked={field.value === 'Nao'} /> Não </label>
              </div>
            )}
          />
          {errors.implementouProjetosInovadores?.message && <p className="error">{errors.implementouProjetosInovadores.message as string}</p>}
        </div>

        <div className="input-group">
          <label className="form-label">Em quanto tempo vocês desejam iniciar o treinamento? </label>
          <Controller
            name="tempoInicio"
            control={control}
            render={({ field }) => (
              <div className="radio-group">
                <label><input {...field} type="radio" value="Imediatamente" checked={field.value === 'Imediatamente'} /> Imediatamente </label>
                <label><input {...field} type="radio" value="ate3meses" checked={field.value === 'ate3meses'} /> Em até 3 meses </label>
                <label><input {...field} type="radio" value="6mesesoumais" checked={field.value === '6mesesoumais'} /> Em 6 meses ou mais </label>
              </div>
            )}
          />
          {errors.tempoInicio?.message && <p className="error">{errors.tempoInicio.message as string}</p>}
        </div>
      </div>
    </div>
  );
}