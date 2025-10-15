import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

async function postAI(form:string | null){
  if (!form) {
    console.error("Erro: A string do formulário está vazia e não pode ser convertida.");
    return;
  }

  try{
    const formJSON = JSON.parse(form)
    const response = await fetch("http://127.0.0.1:8000/api/diagnostico/avaliar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ responses: formJSON }),
    })

    if (!response.ok) {
      throw new Error("Falha na resposta do servidor.");
    }else{
      const result = await response.json()
      if (result && result.summary) {
        localStorage.setItem('segmentedDiagnosis', JSON.stringify(result));
        window.location.reload(); 
      }
    }


  }catch(error){
    console.log(error)

  }

}

interface QuestionnaireContextType {
  isQuestionnaireCompleted: boolean;
  setQuestionnaireCompleted: (completed: boolean, diagnosticData?: any) => void;
  hasDiagnosticResult: boolean;
  diagnosticResult: any | null;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (!context) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};

interface QuestionnaireProviderProps {
  children: ReactNode;
}

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {
  const [isQuestionnaireCompleted, setIsQuestionnaireCompletedState] = useState(false);
  const [hasDiagnosticResult, setHasDiagnosticResult] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any | null>(null);

  useEffect(() => {
    const completed = localStorage.getItem('questionnaireCompleted') === 'true';
    const storedResult = localStorage.getItem('segmentedDiagnosis');

    setIsQuestionnaireCompletedState(completed);
    setHasDiagnosticResult(!!storedResult);
    setDiagnosticResult(storedResult ? JSON.parse(storedResult) : null);
  }, []);

  const setQuestionnaireCompleted = (completed: boolean, diagnosticData?: any) => {
    setIsQuestionnaireCompletedState(completed);
    localStorage.setItem('questionnaireCompleted', String(completed));
    console.log(`O questionário completo: ${typeof(localStorage.getItem('userFormAnswers'))}`)
    postAI(localStorage.getItem('userFormAnswers'))

    if (diagnosticData) {
      localStorage.setItem('segmentedDiagnosis', JSON.stringify(diagnosticData));
      setDiagnosticResult(diagnosticData);
      setHasDiagnosticResult(true);
    } else {
      const storedResult = localStorage.getItem('segmentedDiagnosis');
      setDiagnosticResult(storedResult ? JSON.parse(storedResult) : null);
      setHasDiagnosticResult(!!storedResult);
    }
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        isQuestionnaireCompleted,
        setQuestionnaireCompleted,
        hasDiagnosticResult,
        diagnosticResult,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};
