import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/aprimoramento.css'

interface Question {
    id: number;
    text: string;
    alternatives: string[];
}

type Answer = {
    questionId: number;
    questionText: string;
    answer: string;
};

const dummyQuestions: Question[] = [
    {
    id: 1,
    text: "Quais atividades você mais gosta de fazer no tempo livre?",
    alternatives: [
      "Ler livros",
      "Ver filmes/séries",
      "Praticar esportes",
      "Jogar videogame",
      "Outros"
    ]
  },
  {
    id: 2,
    text: "Quais dos seguintes hobbies melhor representam você?",
    alternatives: [
      "Fotografia",
      "Dança",
      "Jardinagem",
      "Escrita",
      "Outros"
    ]
  },
  {
    id: 3,
    text: "Como você prefere aprender algo novo?",
    alternatives: [
      "Vídeos / Aulas online",
      "Leitura (artigos, livros, documentação)",
      "Prática direta (mão na massa)",
      "Observando outras pessoas",
      "Outros"
    ]
  },
  {
    id: 4,
    text: "Quais soft skills você deseja aprimorar?",
    alternatives: [
      "Comunicação",
      "Organização e gestão do tempo",
      "Pensamento crítico",
      "Trabalho em equipe",
      "Outros"
    ]
  },
  {
    id: 5,
    text: "Quais dos seguintes objetivos você considera importantes para seu desenvolvimento pessoal?",
    alternatives: [
      "Melhorar foco e produtividade",
      "Reduzir estresse / Melhorar bem-estar",
      "Construir hábitos saudáveis",
      "Desenvolver habilidades profissionais",
      "Outros"
    ]
  }
];

const Aprimoramento: React.FC = () => {
    const navigate = useNavigate();
    const [isStarted, setIsStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAlternative, setSelectedAlternative] = useState<string | null>(null);
    
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherAnswer, setOtherAnswer] = useState('');

    const [answers, setAnswers] = useState<Answer[]>([]);
    
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const currentQuestion = dummyQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === dummyQuestions.length - 1;

    const handleStart = () => {
        setIsStarted(true);
    };

    const handleAnswer = (alternative: string) => {
        setSelectedAlternative(alternative);
        
        const shouldShowOther = alternative === 'Outros';
        setShowOtherInput(shouldShowOther);

        if (!shouldShowOther) {
            setOtherAnswer('');
        }
    };

    const handleNext = () => {
        if (!selectedAlternative) return;

        if (selectedAlternative === 'Outros' && otherAnswer.trim() === '') {
            alert('Por favor, descreva sua resposta em "Outros".');
            return;
        }

        const currentAnswerValue = selectedAlternative === 'Outros' ? otherAnswer : selectedAlternative;

        const newAnswer: Answer = {
            questionId: currentQuestion.id,
            questionText: currentQuestion.text,
            answer: currentAnswerValue,
        };
        
        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (isLastQuestion) {
            localStorage.setItem('aprimoramentoAnswers', JSON.stringify(updatedAnswers));
            
            setShowSuccessModal(true);
            
            setTimeout(() => {
                navigate('/colaboradores');
            }, 5000);
            
            return;
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAlternative(null);
            setShowOtherInput(false);
            setOtherAnswer('');
        }
    };

    if (showSuccessModal) {
        return (
            <div className="aprimoramento-container">
                <div className="aprimoramento-card success-card">
                    <h2>✅ Questionário Finalizado com Sucesso!</h2>
                    <p>Você será redirecionado em instantes.</p>
                </div>
            </div>
        );
    }

    if (!isStarted) {
        return (
            <div className="aprimoramento-container">
                <div className="aprimoramento-card">
                    <h1>Bem-vindo à sua jornada de Aprimoramento Pessoal!</h1>
                    <p>
                        Para começar, explore as trilhas de aprendizado personalizadas que preparamos para você.
                        Elas foram desenvolvidas para impulsionar suas habilidades e conhecimentos.
                    </p>
                    <button className="aprimoramento-button" onClick={handleStart}>
                        Começar Agora
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="aprimoramento-container">
            <div className="aprimoramento-card">
                <h2>Pergunta {currentQuestion.id} de {dummyQuestions.length}</h2>
                <p className="question-text">{currentQuestion.text}</p>
                <div className="alternatives-list">
                    {currentQuestion.alternatives.map((alt, index) => (
                        <button
                            key={index}
                            className={`alternative-button ${selectedAlternative === alt ? 'selected' : ''}`}
                            onClick={() => handleAnswer(alt)}
                        >
                            {alt}
                        </button>
                    ))}
                </div>
                
                {showOtherInput && (
                    <textarea
                        className="other-input-field"
                        placeholder="Descreva sua resposta aqui..."
                        value={otherAnswer}
                        onChange={(e) => setOtherAnswer(e.target.value)}
                        rows={3}
                    />
                )}
                
                <button
                    className="aprimoramento-button"
                    onClick={handleNext}
                    disabled={!selectedAlternative}
                >
                    {isLastQuestion ? 'Finalizar e Ver Trilhas' : 'Responder e Próxima'}
                </button>
            </div>
        </div>
    );
};

export default Aprimoramento;