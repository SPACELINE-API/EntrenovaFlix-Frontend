import { useState, useRef, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DiagnosticService from '../../../../services/diagnosticService';
import { useQuestionnaire } from '../../../../contexts/QuestionnaireContext';

import { step1Schema, step2Schema, step3Schema, step4Schema, FormData, step5Schema, step6Schema } from './formsZoc';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './step6';
import Step7 from './step7';

const steps = [
  { id: 1, title: 'Perfil da Empresa' },
  { id: 2, title: 'Desafios e Objetivos' },
  { id: 3, title: 'Diagnóstico' },
  { id: 4, title: 'Investimento' },
  { id: 5, title: 'Aprendizagem' },
  { id: 6, title: 'ESG + DHO' },
  { id: 7, title: 'FIM' },
];

export default function Formulario() {
  const navigate = useNavigate();
  const { setQuestionnaireCompleted } = useQuestionnaire();
  const savedProgress = localStorage.getItem('formProgress');
  const questionnaireCompleted = localStorage.getItem('questionnaireCompleted') === 'true';
  const initialData = savedProgress ? JSON.parse(savedProgress).data : {};

  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (questionnaireCompleted) return 7; 
    if (savedProgress) return JSON.parse(savedProgress).step;
    return 1; 
  });

  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    if (questionnaireCompleted) return [1,2,3,4,5,6]; 
    if (savedProgress) {
      const step = JSON.parse(savedProgress).step;
      return Array.from({ length: step - 1 }, (_, i) => i + 1);
    }
    return [];
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const stepSchemas = [step1Schema, step2Schema, step3Schema, step4Schema, step5Schema, step6Schema];

  const methods = useForm<FormData>({
    resolver: zodResolver(
      step1Schema
        .merge(step2Schema)
        .merge(step3Schema)
        .merge(step4Schema)
        .merge(step5Schema)
        .merge(step6Schema)
    ),
    mode: 'onChange',
    defaultValues: {
      desafiosPrioritarios: [],
      objetivosPrincipais: [],
      dimensoesAvaliar: [],
      ...initialData,
    },
  });

  useEffect(() => {
    const subscription = methods.watch((values) => {
      localStorage.setItem(
        'formProgress',
        JSON.stringify({
          step: currentStep,
          data: values,
        })
      );
    });
    return () => subscription.unsubscribe();
  }, [methods, currentStep]);

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
          'pessoasCultura_comunicacao', 'pessoasCultura_lideranca', 'pessoasCultura_resolucaoProblemas',
          'pessoasCultura_rotina', 'pessoasCultura_valores', 'pessoasCultura_ferramentas'
        );
      }
      if (selectedDimensions.includes('estruturaOperacoes')) {
        dynamicFields.push(
          'estruturaOperacoes_trocaInformacoes', 'estruturaOperacoes_delegacao', 'estruturaOperacoes_processos',
          'estruturaOperacoes_autonomia', 'estruturaOperacoes_qualidade', 'estruturaOperacoes_ferramentas'
        );
      }
      if (selectedDimensions.includes('mercadoClientes')) {
        dynamicFields.push(
          'mercadoClientes_escuta', 'mercadoClientes_colaboracao', 'mercadoClientes_reacaoMudanca',
          'mercadoClientes_metas', 'mercadoClientes_diferencial', 'mercadoClientes_ferramentas'
        );
      }
      if (selectedDimensions.includes('direcaoFuturo')) {
        dynamicFields.push(
          'direcaoFuturo_visao', 'direcaoFuturo_estrategia', 'direcaoFuturo_inovacao',
          'direcaoFuturo_conexaoEstrategia', 'direcaoFuturo_proposito', 'direcaoFuturo_ferramentas'
        );
      }

      fieldsToValidate = dynamicFields;
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (!completedSteps.includes(currentStep)) setCompletedSteps(prev => [...prev, currentStep]);
      if (currentStep < steps.length) setCurrentStep(prev => prev + 1);
      scrollToTop();
    } else {
      toast.error('Por favor, preencha todos os campos obrigatórios antes de avançar.');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      scrollToTop();
    }
  };

  const processForm = async (data: FormData) => {
    setIsSubmitting(true);
    const loadingToast = toast.loading('Analisando suas respostas...');

    try {
      localStorage.setItem('userFormAnswers', JSON.stringify(data));
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error('Chave da API do Gemini não encontrada.');

      const mappedData = {
        ...data,
        pessoasCultura_1: data.pessoasCultura_comunicacao,
        pessoasCultura_2: data.pessoasCultura_lideranca,
        pessoasCultura_3: data.pessoasCultura_resolucaoProblemas,
        pessoasCultura_4: data.pessoasCultura_rotina,
        pessoasCultura_5: data.pessoasCultura_valores,
        pessoasCultura_6: data.pessoasCultura_ferramentas,
        estruturaOperacoes_1: data.estruturaOperacoes_trocaInformacoes,
        estruturaOperacoes_2: data.estruturaOperacoes_delegacao,
        estruturaOperacoes_3: data.estruturaOperacoes_processos,
        estruturaOperacoes_4: data.estruturaOperacoes_autonomia,
        estruturaOperacoes_5: data.estruturaOperacoes_qualidade,
        estruturaOperacoes_6: data.estruturaOperacoes_ferramentas,
        mercadoClientes_1: data.mercadoClientes_escuta,
        mercadoClientes_2: data.mercadoClientes_colaboracao,
        mercadoClientes_3: data.mercadoClientes_reacaoMudanca,
        mercadoClientes_4: data.mercadoClientes_metas,
        mercadoClientes_5: data.mercadoClientes_diferencial,
        mercadoClientes_6: data.mercadoClientes_ferramentas,
        direcaoFuturo_1: data.direcaoFuturo_visao,
        direcaoFuturo_2: data.direcaoFuturo_estrategia,
        direcaoFuturo_3: data.direcaoFuturo_inovacao,
        direcaoFuturo_4: data.direcaoFuturo_conexaoEstrategia,
        direcaoFuturo_5: data.direcaoFuturo_proposito,
        direcaoFuturo_6: data.direcaoFuturo_ferramentas
      };

      const service = new DiagnosticService(apiKey);
      const result = await service.generateSegmentedDiagnosis(mappedData);

      localStorage.setItem('segmentedDiagnosis', JSON.stringify(result));
      localStorage.setItem('lastDiagnosticResult', JSON.stringify(result));

      toast.dismiss(loadingToast);
      toast.success('Análise concluída com sucesso!');

      if (!completedSteps.includes(currentStep)) setCompletedSteps(prev => [...prev, currentStep]);
      setCurrentStep(prev => prev + 1);
      scrollToTop();
      setQuestionnaireCompleted(true, result);

    } catch (error) {
      console.error("Erro no processamento do formulário:", error);
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : 'Erro ao gerar diagnóstico.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (errors: any) => {
    console.log("Erros de validação:", errors);
    toast.error('Verifique os campos obrigatórios.');
  };

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(processForm, onInvalid)} className="diagnostico-form">
        <h2 className="form-main-title">Monte seu plano personalizado</h2>
        <p className="form-subtitle">
          O diagnóstico leva menos de 5 minutos e nos ajuda a entender os principais desafios e objetivos da sua empresa.
        </p>

        <div className="stepper-container">
          {steps.map(step => {
            const isCompleted = completedSteps.includes(step.id) || currentStep >= step.id;
            const isActive = currentStep === step.id;
            return (
              <div key={step.id} className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="step-icon-wrapper">
                  {isCompleted ? ( 
                    <svg className="step-icon-svg" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
            {currentStep === 6 && <Step6 />}
            {currentStep === 7 && <Step7 onNavigate={() => navigate('/diagnostico')} />}
          </div>
        </div>

        <div className="form-navigation">
          {currentStep > 1 && currentStep < steps.length && (
            <button type="button" className="btn btn-secondary" onClick={handlePrev} disabled={isSubmitting}>
              Voltar
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Avançar
            </button>
          )}
          {currentStep === steps.length - 1 && (
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Analisando...' : 'Finalizar e Ver Diagnóstico'}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
