import { useFormContext} from 'react-hook-form';

export default function Step3() {
  const {register, watch } = useFormContext();
  const selectedDimensions = watch('dimensoesAvaliar') || [];

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
      <h2 className="form-title">Diagnóstico das Dimensões</h2>
      <p className="form-desc">Responda conforme as dimensões que você escolheu anteriormente.</p>

      {/* Pessoas & Cultura */}
      {selectedDimensions.includes('pessoasCultura') && (
        <div className="dimension-group">
          <h3 className="dimension-title">Pessoas & Cultura</h3>

          <div className="input-group">
            <label className="form-label" >De 0 a 5, quão claras estão as funções e responsabilidades?</label>
            {renderLikert('pessoasCultura_clarezaFuncoes')}
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, como avalia a comunicação entre líderes e equipes?</label>
            {renderLikert('pessoasCultura_comunicacao')}
          </div>

          <div className="input-group">
            <label className="form-label">Quando alguém comete um erro, o que costuma acontecer?</label>
            <textarea {...register('pessoasCultura_erroReacao')} className="input" />
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, como avalia a colaboração entre equipes?</label>
            {renderLikert('pessoasCultura_colaboracao')}
          </div>

          <div className="input-group">
            <label className="form-label">O que mais motiva os colaboradores?</label>
            <div className="radio-group">
              <label><input {...register('pessoasCultura_motivacao')} type="radio" value="Reconhecimento" /> Reconhecimento</label>
              <label><input {...register('pessoasCultura_motivacao')} type="radio" value="Estabilidade" /> Estabilidade</label>
              <label><input {...register('pessoasCultura_motivacao')} type="radio" value="Aprendizado" /> Aprendizado</label>
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">Como os conflitos são resolvidos?</label>
            <textarea {...register('pessoasCultura_conflitos')} className="input" />
          </div>
        </div>
      )}

      {/* Estrutura & Operações */}
      {selectedDimensions.includes('estruturaOperacoes') && (
        <div className="dimension-group">
          <h3 className="dimension-title">Estrutura & Operações</h3>

          <div className="input-group">
            <label className="form-label">De 0 a 5, os treinamentos atendem às reais necessidades?</label>
            {renderLikert('estruturaOperacoes_treinamentos')}
          </div>

          <div className="input-group">
            <label className="form-label">Quando surgem várias demandas, como definem prioridades?</label>
            <textarea {...register('estruturaOperacoes_priorizacao')} className="input" />
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, como avalia a agilidade das decisões?</label>
            {renderLikert('estruturaOperacoes_decisoes')}
          </div>

          <div className="input-group">
            <label className="form-label">Quando alguém precisa decidir algo simples, o que faz?</label>
            <div className="radio-group">
              <label><input {...register('estruturaOperacoes_decisaoSimples')} type="radio" value="Decide sozinho" /> Decide sozinho</label>
              <label><input {...register('estruturaOperacoes_decisaoSimples')} type="radio" value="Consulta o gestor" /> Consulta o gestor</label>
              <label><input {...register('estruturaOperacoes_decisaoSimples')} type="radio" value="Aguarda orientação" /> Aguarda orientação</label>
            </div>
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, os processos contribuem para produtividade?</label>
            {renderLikert('estruturaOperacoes_processos')}
          </div>

          <div className="input-group">
            <label className="form-label">Existe clareza sobre responsáveis e entregas?</label>
            <textarea {...register('estruturaOperacoes_clarezaResponsaveis')} className="input" />
          </div>
        </div>
      )}

      {/* Mercado & Clientes */}
      {selectedDimensions.includes('mercadoClientes') && (
        <div className="dimension-group">
          <h3 className="dimension-title">Mercado & Clientes</h3>

          <div className="input-group">
            <label className="form-label">De 0 a 5, a empresa se adapta bem às mudanças externas?</label>
            {renderLikert('mercadoClientes_adaptabilidade')}
          </div>

          <div className="input-group">
            <label className="form-label">Quando um cliente traz uma demanda inesperada, qual é a reação?</label>
            <textarea {...register('mercadoClientes_demandaInesperada')} className="input" />
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, a empresa ouve e aplica feedback de clientes?</label>
            {renderLikert('mercadoClientes_feedback')}
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, como avalia a capacidade de inovar?</label>
            {renderLikert('mercadoClientes_inovacao')}
          </div>

          <div className="input-group">
            <label className="form-label">Em uma frase, como se diferencia da concorrência?</label>
            <textarea {...register('mercadoClientes_diferencial')} className="input" />
          </div>
        </div>
      )}

      {/* Direção & Futuro */}
      {selectedDimensions.includes('direcaoFuturo') && (
        <div className="dimension-group">
          <h3 className="dimension-title">Direção & Futuro</h3>

          <div className="input-group">
            <label className="form-label">De 0 a 5, os colaboradores conhecem a visão de futuro?</label>
            {renderLikert('direcaoFuturo_visao')}
          </div>

          <div className="input-group">
            <label className="form-label">Resuma a visão de futuro da empresa:</label>
            <textarea {...register('direcaoFuturo_resumoVisao')} className="input" />
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, como avalia o desenvolvimento de novos líderes?</label>
            {renderLikert('direcaoFuturo_lideres')}
          </div>

          <div className="input-group">
            <label className="form-label">De 0 a 5, as metas estratégicas são claras?</label>
            {renderLikert('direcaoFuturo_metas')}
          </div>

          <div className="input-group">
            <label className="form-label">Qual é a maior oportunidade e o maior risco para os próximos 3 anos?</label>
            <textarea {...register('direcaoFuturo_riscoOportunidade')} className="input" />
          </div>
        </div>
      )}
    </div>
  );
}
