import React from 'react';
import './LoginScreen.css';

function LoginScreen() {
  return (
    <div className="login-container">
      <div className="login-header"> {/* Nova div para o cabeçalho */}
        <h1>Login</h1>
        <p className="welcome-message">Olá, bem-vindo de volta</p>
      </div>
      
      <form className="login-form"> {/* Adicionado uma classe para o formulário */}
        <div className="input-group">
          <label htmlFor="cpf">CPF</label>
          <input type="text" id="cpf" placeholder="Seu CPF" />
        </div>
        
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input type="password" id="password" placeholder="Sua senha" />
        </div>

        <div className="links">
          <a href="#" className="forgot-password">Esqueci a minha senha</a>
          <a href="#" className="signup">Ainda não tem uma conta?</a>
        </div>

        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default LoginScreen;