import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface QuestionnaireContextType {
  isQuestionnaireCompleted: boolean;
  setQuestionnaireCompleted: (completed: boolean) => void;
  hasDiagnosticResult: boolean;
}

const QuestionnaireContext = createContext<QuestionnaireContextType | undefined>(undefined);

export const useQuestionnaire = () => {
  const context = useContext(QuestionnaireContext);
  if (context === undefined) {
    throw new Error('useQuestionnaire must be used within a QuestionnaireProvider');
  }
  return context;
};

interface QuestionnaireProviderProps {
  children: ReactNode;
}

export const QuestionnaireProvider: React.FC<QuestionnaireProviderProps> = ({ children }) => {
  const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] = useState(false);
  const [hasDiagnosticResult, setHasDiagnosticResult] = useState(false);

  useEffect(() => {
    // Check if questionnaire was completed on page load
    const completed = localStorage.getItem('questionnaireCompleted') === 'true';
    const diagnosticResult = localStorage.getItem('lastDiagnosticResult');

    setIsQuestionnaireCompleted(completed);
    setHasDiagnosticResult(!!diagnosticResult);
  }, []);

  const setQuestionnaireCompleted = (completed: boolean) => {
    setIsQuestionnaireCompleted(completed);
    localStorage.setItem('questionnaireCompleted', completed.toString());

    // Also check for diagnostic result when marking as completed
    const diagnosticResult = localStorage.getItem('lastDiagnosticResult');
    setHasDiagnosticResult(!!diagnosticResult);
  };

  return (
    <QuestionnaireContext.Provider
      value={{
        isQuestionnaireCompleted,
        setQuestionnaireCompleted,
        hasDiagnosticResult,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
};
