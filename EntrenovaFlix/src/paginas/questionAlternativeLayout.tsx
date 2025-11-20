import React, { useState } from "react";

interface Question {
  id: number;
  text: string;
  alternatives: string[];
}

const dummyQuestions: Question[] = [];

const QuestionAlternativeLayout: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(
    null
  );

  const currentQuestion = dummyQuestions[currentQuestionIndex];

  const handleAnswer = (alternative: string) => {
    setSelectedAlternative(alternative);
  };

  const handleNext = () => {
    if (currentQuestionIndex < dummyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAlternative(null);
    } else {
      alert("Fim do diagnóstico de aprimoramento!");
      
    }
  };

  return (
    <div className="aprimoramento-card">
      <h2>
        Pergunta {currentQuestion.id} de {dummyQuestions.length}
      </h2>
      <p className="question-text">{currentQuestion.text}</p>
      <div className="alternatives-list">
        {currentQuestion.alternatives.map((alt, index) => (
          <button
            key={index}
            className={`alternative-button ${
              selectedAlternative === alt ? "selected" : ""
            }`}
            onClick={() => handleAnswer(alt)}
          >
            {alt}
          </button>
        ))}
      </div>
      <button
        className="aprimoramento-button"
        onClick={handleNext}
        disabled={!selectedAlternative}
      >
        {currentQuestionIndex < dummyQuestions.length - 1
          ? "Próxima Pergunta"
          : "Finalizar Aprimoramento"}
      </button>
    </div>
  );
};

export default QuestionAlternativeLayout;
