import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface QuestionnaireContextType {
  isQuestionnaireCompleted: boolean;
  setQuestionnaireCompleted: (completed: boolean, onSuccess?: () => void) => void;
  hasDiagnosticResult: boolean;
  diagnosticResult: any | null;
  isSubmitting: boolean;
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('questionnaireCompleted') === 'true';
    const storedResult = localStorage.getItem('segmentedDiagnosis');
    setIsQuestionnaireCompletedState(completed);
    setHasDiagnosticResult(!!storedResult);
    setDiagnosticResult(storedResult ? JSON.parse(storedResult) : null);
  }, []);

  async function postAI(form: string | null, onSuccess?: () => void) {
    if (!form) {
      console.error("Erro: A string do formulário está vazia.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Analisando seu diagnóstico...');

    try {
      const formJSON = JSON.parse(form);
      const payload = { responses: formJSON };

      const response = await fetch("http://127.0.0.1:8000/api/diagnostico/avaliar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.summary) { // Validação explícita da resposta
        throw new Error("A resposta da IA não contém um diagnóstico válido.");
      }
      
      localStorage.setItem('segmentedDiagnosis', JSON.stringify(result));
      setDiagnosticResult(result);
      setHasDiagnosticResult(true);
      setIsQuestionnaireCompletedState(true);

      toast.dismiss(loadingToast);
      toast.success('Diagnóstico analisado com sucesso!');
      
      onSuccess?.(); 

    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro ao gerar o diagnóstico.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const setQuestionnaireCompleted = (completed: boolean, onSuccess?: () => void) => {
    localStorage.setItem('questionnaireCompleted', String(completed));
    if (completed) {
      postAI(localStorage.getItem('userFormAnswers'), onSuccess);
    } else {
      setIsQuestionnaireCompletedState(false);
    }
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        isQuestionnaireCompleted,
        setQuestionnaireCompleted,
        hasDiagnosticResult,
        diagnosticResult,
        isSubmitting,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};