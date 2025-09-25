import { Outlet } from 'react-router-dom';
import Header from './header';

// Este componente serve como um "molde" para as páginas
function MainLayout() {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px',}}>
        {/* O Outlet é onde o React Router vai renderizar a página da rota atual */}
        <Outlet />
      </main>
      {/* Você pode adicionar um <Footer /> aqui também */}
    </div>
  );
}
export default MainLayout;