import {NavLink} from 'react-router-dom';
import { useQuestionnaire } from '../../../contexts/QuestionnaireContext'
import '../../../styles/lp.css'
import '../../../styles/global.css'

export default function Cabeçalho() { 
  const { isQuestionnaireCompleted } = useQuestionnaire();

  return (
    <header className='headerLp'>

      <nav className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </nav>
      <nav className='navigation-lp'>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/" onClick={() => document.getElementById("motivos")?.scrollIntoView({ behavior: "smooth" })} style={{cursor:'pointer'}}>Sobre</NavLink>
        {isQuestionnaireCompleted && (
          <NavLink to="/diagnostico" className="btn-diagnostico-destaque">
            Meu Diagnóstico
          </NavLink>
        )}
        
      </nav>
      <nav className='userIn'>
        <NavLink to='/login'>Login</NavLink>  
      </nav>
    </header>
  );
}