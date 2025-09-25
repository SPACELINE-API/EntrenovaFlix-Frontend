import {NavLink} from 'react-router-dom';
import '../../styles/global.css';

function Header() {
  return (
    <header className='headerContainer'>

        <div className='usuario'>
            <span>Nome do Usuario</span>             
        </div>

      <nav className='navigation'>
        <NavLink to="/colaboradores" end>Trilhas</NavLink>
        <NavLink to="/forum" end>Fórum</NavLink>
        <NavLink to="/colaboradores/dashboard" end>Dashboard</NavLink>
      </nav>

      <div className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </div>
    </header>
  );
}
export default Header;