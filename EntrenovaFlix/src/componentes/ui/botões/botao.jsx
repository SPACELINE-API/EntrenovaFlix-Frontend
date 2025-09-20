import React from 'react';
import { Link } from 'react-router-dom';
import styles from './botao.module.css';

// Nosso componente de botão genérico
function Button({ children, to, onClick, variant = 'primary', className = '' }) {
  // Combina as classes do módulo com qualquer classe extra passada via props
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  // Se a prop 'to' for fornecida, renderiza um Link do React Router
  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  // Caso contrário, renderiza um botão normal
  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;