import {Link, link} from 'react-router-dom';

function cabecalho() {
  return (
    <header style={{ padding: '20px', backgroundColor: '#141414' }}>
      <nav>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/diagnóstico">Diagnóstico</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Sign Up</Link>
      </nav>
    </header>
  );
}
export default cabecalho;