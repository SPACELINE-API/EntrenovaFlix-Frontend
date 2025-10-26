import React, { useState, useEffect } from "react";

interface ConfirmEmailProps {
  email: string;
  onConfirm: () => void;
}

const SIMULATED_CODE = "123456";

const ConfirmEmail: React.FC<ConfirmEmailProps> = ({ email, onConfirm }) => {
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [erro, setErro] = useState<string | null>(null);
  const [emailConfirmado, setEmailConfirmado] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const enviarCodigo = async (isFirstAttempt = false) => {
    setLoadingSend(true);
    setErro(null);
    setSuccessMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEnviado(true);

      if (!isFirstAttempt) {
        setSuccessMessage(`Código reenviado para ${email}. Verifique o console.`);
        setTimeout(() => setSuccessMessage(null), 5000);
      } else {
        setSuccessMessage(`Código enviado para ${email}. Verifique o console.`);
        setTimeout(() => setSuccessMessage(null), 5000);
      }

      console.log(`Código de verificação (simulação) para ${email}: ${SIMULATED_CODE}`);
    } catch {
      setErro("Não foi possível simular o envio do código.");
    } finally {
      setLoadingSend(false);
    }
  };

  useEffect(() => {
    if (!emailConfirmado && !enviado) {
      enviarCodigo(true);
    }
  }, [emailConfirmado, enviado]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);
    setErro(null);
    if (value && index < 5) {
      const nextInput = document.getElementById(`codigo-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      const prevInput = document.getElementById(`codigo-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verificarCodigo = async () => {
    const codigoCompleto = codigo.join("");
    if (codigoCompleto.length !== 6) {
      setErro("Por favor, preencha todos os 6 dígitos.");
      return;
    }

    setLoadingVerify(true);
    setErro(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (codigoCompleto === SIMULATED_CODE) {
        setEmailConfirmado(true);
        onConfirm();
      } else {
        setErro("Código incorreto. Verifique e tente novamente.");
      }
    } catch {
      setErro("Erro ao simular a verificação do código.");
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="confirm-email-container">
      <h3 className="form-subtitle">Confirme seu Email</h3>
      <p className="form-desc1">
        {enviado ? `Enviamos um código de 6 dígitos para:` : `Enviaremos um código para:`} <b>{email}</b>
      </p>

      {erro && <p className="error">{erro}</p>}
      {successMessage && <p className="info">{successMessage}</p>}
      {emailConfirmado && <p className="success">Email confirmado com sucesso!</p>}

      {!emailConfirmado && (
        <>
          <label htmlFor="codigo-0" className=".form-desc-sub">Código de Verificação:</label>
          <div className="codigo-inputs">
            {codigo.map((digito, idx) => (
              <input
                key={idx}
                id={`codigo-${idx}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                className={`codigo-digit ${erro ? 'input-error' : ''}`}
                value={digito}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                aria-label={`Dígito ${idx + 1} do código`}
                disabled={loadingVerify || loadingSend}
              />
            ))}
          </div>

          <div className="buttons-group">
            <button 
              className="button-primary" 
              onClick={verificarCodigo} 
              disabled={loadingVerify || loadingSend || codigo.join("").length !== 6}
            >
              {loadingVerify ? "Verificando..." : "Confirmar Código"}
            </button>
            <button 
              className="button-secondary" 
              onClick={() => enviarCodigo(false)} 
              disabled={loadingSend || loadingVerify}
            >
              {loadingSend ? "Enviando..." : (enviado ? "Reenviar Código" : "Enviar Código")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ConfirmEmail;