import React from 'react';

interface Step5Props {
  onNavigate: () => void;
}

const Step5: React.FC<Step5Props> = ({ onNavigate }) => {
  return (
    <div className="secao-final" style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}>

      <h2 className="form-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Obrigado!</h2>
      <p className="form-desc" style={{ color: '#C4C4CC', lineHeight: '1.6' }}>
        Seu diagnóstico inicial foi gerado com sucesso.
        Com base nas suas respostas, estamos preparando seu relatório personalizado, que incluirá:
      </p>

      <ul className="lista-resultados" style={{ listStyle: 'none', padding: 0, margin: '2rem 0', textAlign: 'left', display: 'inline-block' }}>
        <li style={{ marginBottom: '0.5rem' }}>✔ Um Radar das Dimensões escolhidas.</li>
        <li style={{ marginBottom: '0.5rem' }}>✔ O estágio de maturidade atual em cada uma delas.</li>
        <li>✔ Recomendações de trilhas de melhoria personalizadas para sua equipe.</li>
      </ul>

      <p className="form-desc" style={{ color: '#C4C4CC', lineHeight: '1.6' }}>
        Clique no botão abaixo para visualizar seu resultado.
      </p>

      <div className="step5-actions" style={{ marginTop: '2rem' }}>
        {/* 2. O Link foi substituído por um botão que usa a função onNavigate 
             recebida do componente pai (Formulario.tsx).
        */}
        <button onClick={onNavigate} className="btn btn-primary">
          Ver Meu Diagnóstico
        </button>
      </div>
    </div>
  );
};

export default Step5;