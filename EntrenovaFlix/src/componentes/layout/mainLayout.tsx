import { Outlet } from 'react-router-dom';
import Header from './header';
import '../../styles/contratacaoPlanos.css'
function MainLayout() {
  return (
    <div className='bodyMain'>
      <Header />
      <main style={{ padding: '20px',}}>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;