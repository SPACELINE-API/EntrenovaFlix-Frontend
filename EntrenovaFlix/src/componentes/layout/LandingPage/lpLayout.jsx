import { Outlet } from 'react-router-dom';
import Cabeçalho from './lpCabe';
import '../../../styles/lp.css'

// Este componente serve como um "molde" para as páginas
function LpLayout() {
  return (
    <div className='bodyLp'>
      <Cabeçalho />
      <main>
        {/* O Outlet é onde o React Router vai renderizar a página da rota atual */}
        <Outlet />
      </main>
      {/* Você pode adicionar um <Footer /> aqui também */}
    </div>
  );
}
export default LpLayout;