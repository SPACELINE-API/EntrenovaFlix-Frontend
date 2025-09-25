import React from "react";
import { Link } from "react-router-dom";
import styles from "./botao.module.css";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
};

function Button({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const buttonClasses = `${styles.button} ${styles[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
