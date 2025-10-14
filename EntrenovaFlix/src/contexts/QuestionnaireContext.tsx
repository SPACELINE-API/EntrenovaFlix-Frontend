import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
