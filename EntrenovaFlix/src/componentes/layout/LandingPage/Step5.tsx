
import { Link } from 'react-router-dom';

export default function Step5() {
  return (
    <div className="secao-final">

      <h2 className="form-title">Obrigado!</h2>
      <p className="form-desc">
        Seu diagnóstico inicial foi enviado com sucesso.
        Com base nas suas respostas, estamos preparando seu relatório personalizado, que incluirá:
      </p>

      <ul className="lista-resultados">
        <li>Um Radar das Dimensões escolhidas.</li>
        <li>O estágio de maturidade atual em cada uma delas.</li>
        <li>Recomendações de trilhas de melhoria personalizadas para sua equipe.</li>
      </ul>

      <p className="form-desc">
        Você receberá o resultado em breve.
      </p>

      <div className="step5-actions">
        <Link to="/diagnostico-teste" className="btn btn-primary">
          Ver Diagnóstico Teste
        </Link>
      </div>
    </div>
  );
}

