import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormSolicitante from '../../componentes/layout/contratacaoPlanos/FormSolicitante';
import FormEmpresa from '../../componentes/layout/contratacaoPlanos/FormEmpresa';
import FormSenha from '../../componentes/layout/contratacaoPlanos/FormSenha';
import ConfirmEmail from '../../componentes/layout/contratacaoPlanos/ConfirmEmail';
import { solicitanteSchema, empresaSchema, senhaSchema } from '../../componentes/layout/contratacaoPlanos/validation';
import { ValidationErrors, DadosSolicitante, DadosEmpresa, DadosSenha, PlanoEscolhido } from '../../componentes/layout/contratacaoPlanos/types';
import api from '../../services/apiService';

const getDiagnosticoFromStorage = () => {
  const savedData = localStorage.getItem('userFormAnswers');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch {
      return {};
    }
  }
  return {};
};

const splitNomeSobrenome = (nomeCompleto: string | undefined) => {
  if (!nomeCompleto) return { nome: '', sobrenome: '' };
  const partes = nomeCompleto.trim().split(' ');
  const nome = partes.shift() || '';
  const sobrenome = partes.join(' ') || '';
  return { nome, sobrenome };
};

function TelaCadastro() {
  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();
  const location = useLocation();

  const diagnosticoData = getDiagnosticoFromStorage();
  const planoPreSelecionadoInicial = (location.state?.plano as PlanoEscolhido) || '';
  const { nome: nomeInicial, sobrenome: sobrenomeInicial } = splitNomeSobrenome(diagnosticoData?.nomePes);

  const [planoPreSelecionado, setPlanoPreSelecionado] = useState<PlanoEscolhido>(planoPreSelecionadoInicial);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [emailConfirmado, setEmailConfirmado] = useState(false);
  const [isLoadingCnpj, setIsLoadingCnpj] = useState(false);
  const [cnpjError, setCnpjError] = useState<string | null>(null);
  const [isLoadingCpf, setIsLoadingCpf] = useState(false);
  const [cpfError, setCpfError] = useState<string | null>(null);
  
  const cnpjForm = (diagnosticoData?.cnpj || '').replace(/\D/g, '');
  const cpfInicial = (diagnosticoData?.cpf || '').replace(/\D/g, '');

  const [dadosSolicitante, setDadosSolicitante] = useState<DadosSolicitante>({
    nome: nomeInicial,
    sobrenome: sobrenomeInicial,
    emailCorporativo: diagnosticoData?.email || '',
    telefone: (diagnosticoData?.telefone || '').replace(/\D/g, ''),
    cpf: cpfInicial,
    nomeEmpresa: diagnosticoData?.nomeEmpresa || '',
    porteEmpresa: diagnosticoData?.porteEmpresa || ''
  });

  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    cnpj: cnpjForm,
    razaoSocial: diagnosticoData?.nomeEmpresa || '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const [dadosSenha, setDadosSenha] = useState<DadosSenha>({ senha: '', confirmarSenha: '' });

  const handleSolicitanteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const processedValue = (name === 'cpf' || name === 'telefone') ? value.replace(/\D/g, '') : value;
    if (name === 'cpf') setCpfError(null);
    setDadosSolicitante(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const processedValue = (name === 'cnpj' || name === 'cep') ? value.replace(/\D/g, '') : value;
    if (name === 'cep') setCepError(null);
    if (name === 'cnpj') setCnpjError(null);
    setDadosEmpresa(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setCepError(null);
    if (cep.length !== 8) return;
    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setCepError('CEP não encontrado.');
        setDadosEmpresa(prev => ({ ...prev, rua: '', bairro: '', cidade: '', estado: '' }));
      } else {
        setDadosEmpresa(prev => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        }));
      }
    } finally {
      setIsLoadingCep(false);
    }
  };

  const checkCnpj = async (cnpjValue: string): Promise<boolean | null> => {
    const cnpjLimpo = cnpjValue.replace(/\D/g, '');
    if (cnpjLimpo.length !== 14) return false;
    try {
      // CORRIGIDO: Removido o /accounts/
      const response = await api.post('/check-cnpj', { cnpj: cnpjLimpo });
      return response.data.exists;
    } catch {
      console.error("Falha ao verificar CNPJ");
      return null;
    }
  };

  const checkCpf = async (cpfValue: string): Promise<boolean | null> => {
    const cpfLimpo = cpfValue.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) return false;
    try {
      // CORRIGIDO: Removido o /accounts/
      const response = await api.post('/check-cpf', { cpf: cpfLimpo });
      return response.data.exists;
    } catch {
      console.error("Falha ao verificar CPF");
      return null;
    }
  };

  const handleCpfBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.replace(/\D/g, '').length !== 11) return;
    setIsLoadingCpf(true);
    const exists = await checkCpf(value);
    
    if (exists === true) {
      setCpfError('Este CPF já está cadastrado.');
    } else if (exists === null) {
      setCpfError('Falha ao verificar o CPF. Tente novamente.');
    } else {
      setCpfError(null);
    }
    setIsLoadingCpf(false);
  };

  const handleCnpjBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.replace(/\D/g, '').length !== 14) return;
    setIsLoadingCnpj(true);
    const exists = await checkCnpj(value);
    
    if (exists === true) {
      setCnpjError('Este CNPJ já está cadastrado.');
    } else if (exists === null) {
      setCnpjError('Falha ao verificar o CNPJ. Tente novamente.');
    } else {
      setCnpjError(null);
    }
    setIsLoadingCnpj(false);
  };

  useEffect(() => {
    if (cnpjForm) handleCnpjBlur({ target: { value: cnpjForm } } as any);
    if (cpfInicial) handleCpfBlur({ target: { value: cpfInicial } } as any);
  }, []);

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosSenha(prev => ({ ...prev, [name]: value }));
  };

  const validaEtapa = async (schema: any, data: unknown): Promise<boolean> => {
    const validationResult = await schema.safeParseAsync(data);
    if (!validationResult.success) {
      const errors: ValidationErrors = {};
      validationResult.error.issues.forEach((error: any) => {
        if (error.path[0]) errors[error.path[0] as keyof ValidationErrors] = [error.message];
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    switch (step) {
      case 1:
        return await validaEtapa(solicitanteSchema, dadosSolicitante);
      case 2:
        return await validaEtapa(empresaSchema, dadosEmpresa);
      case 3:
        return emailConfirmado;
      case 4:
        return await validaEtapa(senhaSchema, dadosSenha);
      default:
        return false;
    }
  };

  const nextStep = async () => {
    if (isLoadingCpf || isLoadingCnpj) {
      alert("Aguarde a verificação dos dados...");
      return;
    }

    if (step === 1 && cpfError) {
      return;
    }
    if (step === 2 && cnpjError) {
      return;
    }

    const isZodValid = await validateCurrentStep();
    if (!isZodValid) return;

    if (step === 1) {
      setIsLoadingCpf(true);
      const exists = await checkCpf(dadosSolicitante.cpf);
      setIsLoadingCpf(false);
      
      if (exists === true) {
        setCpfError('Este CPF já está cadastrado.');
        return;
      } else if (exists === null) {
        setCpfError('Falha ao verificar o CPF. Tente novamente.');
        return;
      }
    }

    if (step === 2) {
      setIsLoadingCnpj(true);
      const exists = await checkCnpj(dadosEmpresa.cnpj);
      setIsLoadingCnpj(false);
      
      if (exists === true) {
        setCnpjError('Este CNPJ já está cadastrado.');
        return;
      } else if (exists === null) {
        setCnpjError('Falha ao verificar o CNPJ. Tente novamente.');
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleFinish = async () => {
    if (isLoadingCpf || isLoadingCnpj) {
      alert("Aguarde a verificação dos dados...");
      return;
    }

    const isStep4Valid = await validateCurrentStep();
    if (!isStep4Valid) return;

    if (!emailConfirmado) {
      alert("Por favor, confirme seu email antes de prosseguir.");
      setStep(3);
      return;
    }

    const [isStep1ZodValid, isStep2ZodValid, cpfExists, cnpjExists] = await Promise.all([
      validaEtapa(solicitanteSchema, dadosSolicitante),
      validaEtapa(empresaSchema, dadosEmpresa),
      checkCpf(dadosSolicitante.cpf),
      checkCnpj(dadosEmpresa.cnpj)
    ]);
    
    if (cpfExists) {
        setCpfError('Este CPF já está cadastrado.');
        setStep(1);
        return;
    }
    
    if (cnpjExists) {
        setCnpjError('Este CNPJ já está cadastrado.');
        setStep(2);
        return;
    }
    
    if (!isStep1ZodValid) {
        setStep(1);
        return;
    }
    
    if (!isStep2ZodValid) {
        setStep(2);
        return;
    }
    
    const dadosCompletosCadastro = {
      dadosSolicitante: { ...dadosSolicitante, plano: planoPreSelecionadoInicial || 'essencial' },
      dadosEmpresa,
      dadosSenha
    };
    navigate('/cadastro/pagamento', {
      state: { cadastroData: dadosCompletosCadastro, plano: planoPreSelecionadoInicial || 'essencial' }
    });
  };

  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-container">
        {step === 1 && (
          <FormSolicitante
            dadosSolicitante={dadosSolicitante}
            onChange={handleSolicitanteChange}
            errors={{ ...validationErrors, ...(cpfError && { cpf: [cpfError] }) }}
            onCpfBlur={handleCpfBlur}
            isLoadingCpf={isLoadingCpf}
          />
        )}
        {step === 2 && (
          <FormEmpresa
            dadosEmpresa={dadosEmpresa}
            onChange={handleEmpresaChange}
            errors={{ ...validationErrors, ...(cnpjError && { cnpj: [cnpjError] }) }}
            onCepBlur={handleCepBlur}
            isLoadingCep={isLoadingCep}
            cepError={cepError}
            onCnpjBlur={handleCnpjBlur}
            isLoadingCnpj={isLoadingCnpj}
          />
        )}
        {step === 3 && dadosSolicitante.emailCorporativo && (
          <ConfirmEmail email={dadosSolicitante.emailCorporativo} onConfirm={() => setEmailConfirmado(true)} />
        )}
        {step === 4 && (
          <FormSenha
            dadosSenha={dadosSenha}
            onChange={handleSenhaChange}
            emailCorporativo={dadosSolicitante.emailCorporativo}
            errors={validationErrors}
          />
        )}
        <div className={`form-buttons ${step > 1 ? 'form-buttons--between' : 'form-buttons--end'}`}>
          {step > 1 && <button onClick={prevStep} className="button-primary">Voltar</button>}
          <button
            type="button"
            className="button-primary"
            onClick={step < 4 ? nextStep : handleFinish}
            disabled={isLoadingCpf || isLoadingCnpj}
          >
            {step < 4 ? 'Próximo' : 'Finalizar e Fazer o pagamento'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TelaCadastro;