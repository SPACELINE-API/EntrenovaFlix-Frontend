import {Link} from 'react-router-dom';
import '../../../styles/lp.css'
import '../../../styles/global.css'

function Cabeçalho() {
  return (
    <header className='headerLp'>

      <nav className='brandLogo'>
        <span>ENTRENOVAFLIX</span>
      </nav>
      <nav className='navigation-lp'>
        <Link to="/home">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/diagnóstico">Diagnóstico</Link>
        
      </nav>
      <nav className='userIn'>
        <Link to='/login'>Login</Link>  
      </nav>
      
    </header>
  );
}
export default Cabeçalho;