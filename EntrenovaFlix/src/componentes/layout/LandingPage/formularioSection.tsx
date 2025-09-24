import { useState, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import DiagnosticService from '../../../services/diagnosticService';
import { useQuestionnaire } from '../../../contexts/QuestionnaireContext';

import { step1Schema, step2Schema, step3Schema, step4Schema, FormData } from './formsZoc';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const steps = [
  { id: 1, title: 'Perfil da Empresa' },
  { id: 2, title: 'Desafios e Objetivos' },
  { id: 3, title: 'Diagnóstico' },
  { id: 4, title: 'Investimento' },
  { id: 5, title: 'FIM' },
];

export default function Formulario() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { setQuestionnaireCompleted } = useQuestionnaire();

  const formRef = useRef<HTMLFormElement>(null);

  const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema];

  const methods = useForm<FormData>({
    resolver: zodResolver(step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema)),
    mode: 'onChange',
    defaultValues: {
      desafiosPrioritarios: [],
      objetivosPrincipais: [],
      dimensoesAvaliar: [],
    },
  });

  const { trigger, handleSubmit, getValues } = methods;

  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = async () => {
    let fieldsToValidate = Object.keys(stepSchemas[currentStep - 1]?.shape || {}) as (keyof FormData)[];

    if (currentStep === 3) {
      const selectedDimensions = getValues('dimensoesAvaliar') || [];
      const dynamicFields: (keyof FormData)[] = ['dimensoesAvaliar'];

      if (selectedDimensions.includes('pessoasCultura')) {
        dynamicFields.push(
          'pessoasCultura_comunicacao', 'pessoasCultura_lideranca',
          'pessoasCultura_resolucaoProblemas', 'pessoasCultura_rotina',
          'pessoasCultura_valores', 'pessoasCultura_ferramentas'
        );
      }
      if (selectedDimensions.includes('estruturaOperacoes')) {
        dynamicFields.push(
          'estruturaOperacoes_trocaInformacoes', 'estruturaOperacoes_delegacao',
          'estruturaOperacoes_processos', 'estruturaOperacoes_autonomia',
          'estruturaOperacoes_qualidade', 'estruturaOperacoes_ferramentas'
        );
      }
      if (selectedDimensions.includes('mercadoClientes')) {
        dynamicFields.push('mercadoClientes_escuta', 'mercadoClientes_colaboracao');
      }
      if (selectedDimensions.includes('direcaoFuturo')) {
        dynamicFields.push('direcaoFuturo_visao', 'direcaoFuturo_estrategia');
      }

      fieldsToValidate = dynamicFields;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (!completedSteps.includes(currentStep)) setCompletedSteps(prev => [...prev, currentStep]);
      if (currentStep < steps.length) setCurrentStep(prev => prev + 1);

      scrollToTop();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      scrollToTop();
    }
  };

  const processForm = async (data: FormData) => {
    toast.success('Formulário enviado com sucesso!');

    if (!completedSteps.includes(currentStep)) setCompletedSteps(prev => [...prev, currentStep]);
    if (!completedSteps.includes(steps.length)) setCompletedSteps(prev => [...prev, steps.length]);

    setCurrentStep(prev => prev + 1);
    scrollToTop();

    // Mark questionnaire as completed and save diagnostic results to localStorage
    setQuestionnaireCompleted(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'your-api-key-here';
      const service = new DiagnosticService(apiKey);
      const result = await service.runFullDiagnostic();
      localStorage.setItem('lastDiagnosticResult', JSON.stringify(result));
      service.printDiagnosisToTerminal(result);
    } catch (error) {
      toast.error('Erro ao gerar diagnóstico. Verifique sua chave da API OpenAI.');
    }
  };

  const onInvalid = (errors: any) => {
    toast.error('Verifique os campos obrigatórios.');
  };

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(processForm, onInvalid)} className="diagnostico-form">
        <h2 className="form-main-title">Responda ao formulário para ter acesso as trilhas</h2>

        <div className="stepper-container">
          {steps.map(step => {
            const isCompleted = completedSteps.includes(step.id) || currentStep > step.id;
            const isActive = currentStep === step.id;
            return (
              <div key={step.id} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-icon-wrapper">
                  {isCompleted && step.id !== steps.length ? (
                    <svg className="step-icon-svg" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className="step-icon-circle"></div>
                  )}
                </div>
                <span className="step-title">{step.title}</span>
              </div>
            );
          })}
        </div>

        <div className="form-content">
          <div className="form-step-wrapper">
            {currentStep === 1 && <Step1 />}
            {currentStep === 2 && <Step2 />}
            {currentStep === 3 && <Step3 />}
            {currentStep === 4 && <Step4 />}
            {currentStep === 5 && <Step5 />}
          </div>
        </div>

        <div className="form-navigation">
          {currentStep > 1 && currentStep < steps.length && (
            <button type="button" className="btn btn-secondary" onClick={handlePrev}>
              Voltar
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Avançar
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
