import { NavLink } from 'react-router-dom';
import { useQuestionnaire } from '../../contexts/QuestionnaireContext';
import '../../styles/global.css';

function Header() {
  const { isQuestionnaireCompleted, hasDiagnosticResult } = useQuestionnaire();

  return (
    <header className='headerContainer1'>
        <div className='usuario'>
            <span>Nome do Usuario</span>
        </div>
      <nav className='navigation'>
        <NavLink to="/colaboradores" end>Trilhas</NavLink>
        <NavLink to="/colaboradores/forum" end>Fórum</NavLink>
        <NavLink to="/colaboradores/dashboard" end>Dashboard</NavLink>
      </nav>

      <div className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </div>
    </header>
  );
}
export default Header;