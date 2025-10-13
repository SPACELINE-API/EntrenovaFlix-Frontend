import { useState } from 'react';
import '../../styles/funcionariosRH.css';

function FuncionariosRH() {
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [cpfError, setCpfError] = useState('');
  const [telefoneError, setTelefoneError] = useState('');

  const validaCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/[^\d]+/g, '');
    if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
      return false;
    }
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) {
      return false;
    }
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(cpfLimpo.substring(10, 11))) {
      return false;
    }
    return true;
  };

  const validateEmail = (value: string) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Formato de e-mail inválido');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleCpfChange = (e: { target: { value: string; }; }) => {
    const valorApenasDigitos = e.target.value.replace(/\D/g, '');
    let valorFormatado = valorApenasDigitos
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    if (valorFormatado.length > 14) {
      valorFormatado = valorFormatado.substring(0, 14);
    }
    setCpf(valorFormatado);

    if (valorFormatado.length === 14) {
      if (!validaCPF(valorFormatado)) {
        setCpfError('CPF inválido');
      } else {
        setCpfError('');
      }
    } else if (valorFormatado) {
      setCpfError('CPF incompleto');
    } else {
      setCpfError('');
    }
  };

  const handleTelefoneChange = (e: { target: { value: string; }; }) => {
    const valorApenasDigitos = e.target.value.replace(/\D/g, '');
    let valorFormatado = valorApenasDigitos
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');

    if (valorFormatado.length > 15) {
      valorFormatado = valorFormatado.substring(0, 15);
    }
    setTelefone(valorFormatado);

    if (valorFormatado && valorFormatado.length < 15) {
      setTelefoneError('Telefone incompleto');
    } else {
      setTelefoneError('');
    }
  };

  const atribuirSenhaPadrao = () => {
    if (!dataNascimento) {
      alert('Por favor, preencha a data de nascimento primeiro!');
      return;
    }
    const senhaPadrao = dataNascimento.split('-').reverse().join('');
    setSenha(senhaPadrao);
    setConfirmarSenha(senhaPadrao);
  };

  return (
    <div className="rh-form-container">
      <h1>Cadastro de Novo Funcionário</h1>
      <p>Preencha os dados abaixo para dar acesso aos cursos.</p>
      <form className="rh-form">
        <div className="rh-form-group">
          <label htmlFor="nome">Nome Completo</label>
          <input id="nome" type="text" placeholder="Ex: João da Silva" name="nome" />
        </div>
        <div className="rh-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ex: joao.silva@empresa.com"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>
        <div className="rh-form-group">
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            name="cpf"
            value={cpf}
            onChange={handleCpfChange}
          />
          {cpfError && <span className="error-message">{cpfError}</span>}
        </div>
        <div className="rh-form-group">
          <label htmlFor="telefone">Telefone</label>
          <input
            id="telefone"
            type="tel"
            placeholder="(XX) XXXXX-XXXX"
            name="telefone"
            value={telefone}
            onChange={handleTelefoneChange}
          />
          {telefoneError && <span className="error-message">{telefoneError}</span>}
        </div>
        <div className="rh-form-group">
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input id="dataNascimento" type="date" name="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} />
        </div>
        <div className="rh-form-group">
          <label htmlFor="senha">Senha</label>
          <div className="password-group">
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Crie uma senha forte"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>
        <div className="rh-form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            id="confirmarSenha"
            type={showPassword ? 'text' : 'password'}
            placeholder="Digite a senha novamente"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>
        <div className="rh-form-actions">
          <button type="button" className="rh-btn rh-btn-secondary" onClick={atribuirSenhaPadrao}>
            Atribuir Senha Padrão
          </button>
          <button type="submit" className="rh-btn rh-btn-primary">
            Cadastrar Funcionário
          </button>
        </div>
      </form>
    </div>
  );
}

export default FuncionariosRH;