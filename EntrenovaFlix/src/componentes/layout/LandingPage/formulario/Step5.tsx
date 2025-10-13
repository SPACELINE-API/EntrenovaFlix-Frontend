import { useFormContext } from 'react-hook-form';

export default function Step5() {
 const { register, formState: { errors } } = useFormContext();

 return (
  <div className="form-section">
   <h2 className="form-title">Preferências de Aprendizagem</h2>
   <p className="form-desc">Essas respostas ajudam a personalizar os formatos de desenvolvimento.</p>

   <div className="input-group">
      <label className="form-label">Qual formato sua equipe aproveitaria melhor?</label>
      <div className="radio-group">
        <label><input {...register('preferenciaFormato')} type="radio" value="Vídeo" /> Vídeo</label>
        <label><input {...register('preferenciaFormato')} type="radio" value="Áudio" /> Áudio</label>
        <label><input {...register('preferenciaFormato')} type="radio" value="Leitura" /> Leitura</label>
        <label><input {...register('preferenciaFormato')} type="radio" value="Prática" /> Prática (simulação/jogo)</label>
      </div>
      {errors.preferenciaFormato?.message && <p className="error">{errors.preferenciaFormato.message as string}</p>}
   </div>

   <div className="input-group">
      <label className="form-label">Prefere treinamentos longos ou pílulas curtas?</label>
      <div className="radio-group">
      <label><input {...register('duracaoPreferida')} type="radio" value="Longos" /> Longos (1h+)</label>
      <label><input {...register('duracaoPreferida')} type="radio" value="Curtos" /> Pílulas curtas (até 15min)</label>
      </div>
      {errors.duracaoPreferida?.message && <p className="error">{errors.duracaoPreferida.message as string}</p>} 
   </div>

   <div className="input-group">
    <label className="form-label">Seu time trabalha mais:</label>
    <div className="radio-group">
     <label><input {...register('contextoTrabalho')} type="radio" value="Computador" /> Em computador</label>
     <label><input {...register('contextoTrabalho')} type="radio" value="Deslocamento" /> Em deslocamento</label>
     <label><input {...register('contextoTrabalho')} type="radio" value="Manual" /> Em atividades manuais</label>
    </div>
    {errors.contextoTrabalho?.message && <p className="error">{errors.contextoTrabalho.message as string}</p>}
   </div>

   <div className="input-group">
    <label className="form-label">Quando precisam aprender, normalmente:</label>
    <div className="radio-group">
     <label><input {...register('formaAprendizagem')} type="radio" value="Vídeos" /> Assistem vídeos</label>
     <label><input {...register('formaAprendizagem')} type="radio" value="Áudios" /> Escutam áudios</label>
     <label><input {...register('formaAprendizagem')} type="radio" value="Leitura" /> Leem instruções</label>
    </div>
    {errors.formaAprendizagem?.message && <p className="error">{errors.formaAprendizagem.message as string}</p>}
   </div>

   <div className="input-group">
    <label className="form-label">Aprendem melhor de forma:</label>
    <div className="radio-group">
     <label><input {...register('modoAprendizagem')} type="radio" value="Individual" /> Individual</label>
     <label><input {...register('modoAprendizagem')} type="radio" value="Grupo" /> Em grupo</label>
    </div>
    {errors.modoAprendizagem?.message && <p className="error">{errors.modoAprendizagem.message as string}</p>}
   </div>

   <div className="input-group">
    <label className="form-label">Quantas horas semanais podem dedicar a treinamentos?</label>
    <div className="radio-group">
     <label><input {...register('tempoDisponivel')} type="radio" value="Menos de 1h" /> Menos de 1h</label>
     <label><input {...register('tempoDisponivel')} type="radio" value="1-3h" /> 1-3h</label>
     <label><input {...register('tempoDisponivel')} type="radio" value="3-5h" /> 3-5h</label>
     <label><input {...register('tempoDisponivel')} type="radio" value="Mais de 5h" /> Mais de 5h</label>
    </div>
    {errors.tempoDisponivel?.message && <p className="error">{errors.tempoDisponivel.message as string}</p>}
   </div>
  </div>
 );
}
