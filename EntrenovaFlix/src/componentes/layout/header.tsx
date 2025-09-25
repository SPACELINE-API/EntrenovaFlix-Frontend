import {Link} from 'react-router-dom';
import '../../styles/global.css';

function Header() {
  return (
    <header className='headerContainer'>

        <div className='usuario'>
            <span>Nome do Usuario</span>             
        </div>

      <nav className='navigation'>
        <Link to="/trilhas" className='active'>Trilhas</Link>
        <Link to="/forum">Fórum</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <div className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </div>
    </header>
  );
}
export default Header;