import {Link} from 'react-router-dom';
import { useQuestionnaire } from '../../contexts/QuestionnaireContext';
import '../../styles/global.css';

function Header() {
  const { isQuestionnaireCompleted, hasDiagnosticResult } = useQuestionnaire();

  return (
    <header className='headerContainer'>

        <div className='usuario'>
            <span>Nome do Usuario</span>
        </div>

      <nav className='navigation'>
        <Link to="/trilhas" className='active'>Trilhas</Link>
        <Link to="/forum">Fórum</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/diagnostico">Diagnóstico</Link>
        {isQuestionnaireCompleted && hasDiagnosticResult && (
          <Link to="/diagnostico-teste" className='diagnostic-test-link'>
            📊 Diagnóstico Teste
          </Link>
        )}
      </nav>

      <div className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </div>
    </header>
  );
}
export default Header;
