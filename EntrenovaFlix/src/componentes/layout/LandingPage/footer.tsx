import { FiGlobe } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import '../../../styles/lp.css';

export default function Footer() {
  const numeroWhatsapp = "5512997650432"; 
  const mensagemPadrao = "Olá! Tenho uma dúvida sobre a EntrenovaFlix.";
  const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemPadrao)}`;

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <p className="footer-intro">
          Dúvidas?{' '}
          <a 
            href={urlWhatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Entre em contato<FaWhatsapp />
          </a>.
        </p>

        <div className="footer-grid">

          <ul className="footer-column">
            <li><a href="#">Preferências de Cookies</a></li>
            <li><a href="https://entrenova.com.br">Informações Corporativas</a></li>
          </ul>

          <ul className="footer-column">
            <li><a href="/diagnostico/devolutiva">Nossos Planos</a></li>
            <li><a href="#">Fale Conosco</a></li>
          </ul>
          
          <ul className="footer-column">
            <li><a href="#">Termos de Uso</a></li>
            <li><a href="#">Cursos Exclusivos</a></li>
          </ul>
        </div>

        {/* <button className="language-selector">
          <FiGlobe className="globe-icon" />
          Português
        </button> */}

        <p className="footer-brand">EntrenovaFlix</p>
      </div>
    </footer>
  );
}