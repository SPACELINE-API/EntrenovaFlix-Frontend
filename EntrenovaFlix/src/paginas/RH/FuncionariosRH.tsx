import { useState, useEffect } from "react";
import "../../styles/funcionariosRH.css";
import api from "../../services/apiService";

async function postFuncionarios(dados: {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  data_nascimento: string;
  password: string;
}) {
  try {
    const response = await api.post("/register", dados);
    return response.data;
  } catch (error: any) {
    console.error("Erro ao enviar mensagem:", error);

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Erro no cadastro!");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
    throw error;
  }
}

function FuncionariosRH() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [telefoneError, setTelefoneError] = useState("");
  const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });
  const [countFuncionarios, setCountFuncionarios] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await api.get("/funcionario");
        setCountFuncionarios(response.data.length);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFuncionarios();
  }, []);

  const validaCPF = (cpf: string) => {
    const cpfLimpo = cpf.replace(/[^\d]+/g, "");
    if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) return false;
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpfLimpo.substring(10, 11));
  };

  const validateEmail = (value: string) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Formato de e-mail inválido");
    } else {
      setEmailError("");
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorApenasDigitos = e.target.value.replace(/\D/g, "");
    let valorFormatado = valorApenasDigitos
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    if (valorFormatado.length > 14) valorFormatado = valorFormatado.substring(0, 14);
    setCpf(valorFormatado);

    if (valorFormatado.length === 14) {
      if (!validaCPF(valorFormatado)) setCpfError("CPF inválido");
      else setCpfError("");
    } else if (valorFormatado) setCpfError("CPF incompleto");
    else setCpfError("");
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorApenasDigitos = e.target.value.replace(/\D/g, "");
    let valorFormatado = valorApenasDigitos
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");

    if (valorFormatado.length > 15) valorFormatado = valorFormatado.substring(0, 15);
    setTelefone(valorFormatado);
    if (valorFormatado && valorFormatado.length < 15) setTelefoneError("Telefone incompleto");
    else setTelefoneError("");
  };

  const atribuirSenhaPadrao = () => {
    if (!nascimento) {
      alert("Por favor, preencha a data de nascimento primeiro!");
      return;
    }
    const senhaPadrao = nascimento.split("-").reverse().join("");
    setSenha(senhaPadrao);
    setConfirmarSenha(senhaPadrao);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ message: "", type: "" });

    if (countFuncionarios >= 60) {
      setSubmitStatus({
        message: "Limite de 60 funcionários atingido para o plano premium.",
        type: "error",
      });
      return;
    }

    const dadosFuncionario = {
      nome,
      email,
      cpf,
      telefone,
      data_nascimento: nascimento,
      password: senha,
    };

    try {
      const responseData = await postFuncionarios(dadosFuncionario);
      setSubmitStatus({
        message: responseData.message || "Funcionário cadastrado com sucesso!",
        type: "success",
      });

      setNome("");
      setEmail("");
      setCpf("");
      setTelefone("");
      setNascimento("");
      setSenha("");
      setConfirmarSenha("");
      setEmailError("");
      setCpfError("");
      setTelefoneError("");
      setCountFuncionarios(countFuncionarios + 1);

      setTimeout(() => {
        setSubmitStatus({
          message: "Insira os dados do funcionário que será cadastrado",
          type: "info",
        });
      }, 2000);
    } catch (error: any) {
      setSubmitStatus({
        message: error.message || "Erro ao cadastrar funcionário.",
        type: "error",
      });
    }
  };

  return (
    <div className="rh-form-container">
      <h1>Cadastro de Novo Funcionário</h1>
      <p>Preencha os dados abaixo para dar acesso aos cursos.</p>

      <form className="rh-form" onSubmit={handleSubmit}>
        <div className="rh-form-group">
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            placeholder="Ex: João"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="rh-form-group">
          <label htmlFor="sobrenome">Sobrenome</label>
          <input
            id="sobrenome"
            type="text"
            placeholder="Ex: Silva"
            name="sobrenome"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
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
          <label htmlFor="nascimento">Data de Nascimento</label>
          <input
            id="nascimento"
            type="date"
            name="nascimento"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
          />
        </div>

        <div className="rh-form-group">
          <label htmlFor="senha">Senha</label>
          <div className="password-group">
            <input
              id="senha"
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha forte"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <div className="rh-form-group">
          <label htmlFor="confirmarSenha">Confirmar Senha</label>
          <input
            id="confirmarSenha"
            type={showPassword ? "text" : "password"}
            placeholder="Digite a senha novamente"
            name="confirmarSenha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </div>

        {submitStatus.message && (
          <div
            className={
              submitStatus.type === "success"
                ? "success-message"
                : "error-message"
            }
          >
            {submitStatus.message}
          </div>
        )}

        <div className="rh-form-actions">
          <button
            type="button"
            className="rh-btn rh-btn-secondary"
            onClick={atribuirSenhaPadrao}
          >
            Atribuir Senha Padrão
          </button>
          <button
            type="submit"
            className="rh-btn rh-btn-primary"
            disabled={countFuncionarios >= 60}
          >
            {countFuncionarios >= 60 ? "Limite Atingido" : "Cadastrar Funcionário"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FuncionariosRH;
