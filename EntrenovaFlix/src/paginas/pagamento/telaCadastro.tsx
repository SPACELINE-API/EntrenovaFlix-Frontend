import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import FormSolicitante from '../../componentes/layout/contratacaoPlanos/FormSolicitante';
import FormEmpresa from '../../componentes/layout/contratacaoPlanos/FormEmpresa';
import FormSenha from '../../componentes/layout/contratacaoPlanos/FormSenha';
import { solicitanteSchema, empresaSchema, senhaSchema } from '../../componentes/layout/contratacaoPlanos/validation';
import { ValidationErrors, DadosSolicitante, DadosEmpresa, DadosSenha, PlanoEscolhido } from '../../componentes/layout/contratacaoPlanos/types';

function TelaCadastro() {
  const [step, setStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const navigate = useNavigate();
  const location = useLocation();
  const [planoPreSelecionado, setPlanoPreSelecionado] = useState<PlanoEscolhido>('');
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const [dadosSolicitante, setDadosSolicitante] = useState<DadosSolicitante>({
    nome: '', sobrenome: '', emailCorporativo: '', telefone: '', cpf: '', nomeEmpresa: '', porteEmpresa: ''
  });

  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    cnpj: '', razaoSocial: '', cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: ''
  });

  const [dadosSenha, setDadosSenha] = useState<DadosSenha>({
    senha: '', confirmarSenha: ''
  });

  useEffect(() => {
    if (location.state?.plano) {
      setPlanoPreSelecionado(location.state.plano as PlanoEscolhido);
    }
  }, [location.state]);

  const handleSolicitanteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const processedValue = (name === 'cpf' || name === 'telefone') ? value.replace(/\D/g, '') : value;
    setDadosSolicitante(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const processedValue = (name === 'cnpj' || name === 'cep') ? value.replace(/\D/g, '') : value;
    if (name === 'cep') setCepError(null);
    setDadosEmpresa(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setCepError(null);
    if (cep.length !== 8) return;

    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error('Erro ao buscar CEP');

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
        setValidationErrors(prev => ({
          ...prev,
          rua: undefined,
          bairro: undefined,
          cidade: undefined,
          estado: undefined
        }));
      }
    } catch {
      setCepError('Não foi possível buscar o CEP. Verifique sua conexão.');
      setDadosEmpresa(prev => ({ ...prev, rua: '', bairro: '', cidade: '', estado: '' }));
    } finally {
      setIsLoadingCep(false);
    }
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDadosSenha(prev => ({ ...prev, [name]: value }));
  };

  const validaEtapa = async (schema: z.Schema, data: unknown): Promise<boolean> => {
    const validationResult = await schema.safeParseAsync(data);
    if (!validationResult.success) {
      const errors: ValidationErrors = {};
      validationResult.error.issues.forEach(error => {
        if (error.path[0]) errors[error.path[0] as keyof ValidationErrors] = [error.message];
      });
      setValidationErrors(errors);
      return false;
    }
    setValidationErrors({});
    return true;
  };

  const validateCurrentStep = async () => {
    switch (step) {
      case 1: return await validaEtapa(solicitanteSchema, dadosSolicitante);
      case 2: return await validaEtapa(empresaSchema, dadosEmpresa);
      case 3: return await validaEtapa(senhaSchema, dadosSenha);
      default: return false;
    }
  };

  const nextStep = async () => {
    if (await validateCurrentStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const handleFinish = async () => {
    if (await validateCurrentStep()) {
      const dadosCompletosCadastro = {
        dadosSolicitante: { ...dadosSolicitante, plano: planoPreSelecionado || 'essencial' },
        dadosEmpresa,
        dadosSenha
      };
      navigate('/cadastro/pagamento', {
        state: { cadastroData: dadosCompletosCadastro, plano: planoPreSelecionado || 'essencial' }
      });
    }
  };

  return (
    <div className="cadastro-wrapper">
      <div className="cadastro-container">
        {step === 1 && (
          <FormSolicitante dadosSolicitante={dadosSolicitante} onChange={handleSolicitanteChange} errors={validationErrors} />
        )}
        {step === 2 && (
          <FormEmpresa
            dadosEmpresa={dadosEmpresa}
            onChange={handleEmpresaChange}
            errors={validationErrors}
            onCepBlur={handleCepBlur}
            isLoadingCep={isLoadingCep}
            cepError={cepError}
          />
        )}
        {step === 3 && (
          <FormSenha
            dadosSenha={dadosSenha}
            onChange={handleSenhaChange}
            emailCorporativo={dadosSolicitante.emailCorporativo}
            errors={validationErrors}
          />
        )}

        <div className={`form-buttons ${step > 1 ? 'form-buttons--between' : 'form-buttons--end'}`}>
          {step > 1 && <button onClick={prevStep} className='button-primary'>Voltar</button>}
          {step < 3 ? (
            <button type="button" className="button-primary" onClick={nextStep}>Próximo</button>
          ) : (
            <button type="button" className="button-primary" onClick={handleFinish}>
              Finalizar e Fazer o pagamento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default TelaCadastro;