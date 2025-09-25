import { NavLink } from 'react-router-dom';
import '../../styles/global.css';

function Header() {
  return (
    <header className='headerContainer'>

      <div className='usuario'>
        <span>Nome do Usuario</span>
      </div>

      <nav className='navigation'>
        <NavLink to="/trilhas">Trilhas</NavLink>
        <NavLink to="/forum">Fórum</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>

      <div className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </div>
    </header>
  );
}
export default Header;