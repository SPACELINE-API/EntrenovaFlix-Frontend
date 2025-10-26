import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from './header';
import '../../styles/mainLayout.css'
function MainLayout() {

  const { pathname } = useLocation();
  const bgColor =
    pathname === "/colaboradores/dashboard" || pathname === "/colaboradores/trilhas" || pathname === "/colaboradores"
    ? "linear-gradient(25deg, #5449CC 0%, #141414 20%, #141414 80%, #5449CC 100%)" 
    : "#141414";
  return (
    <div className='bodyMain' style={{ background: bgColor}}>
      <Header />
      <main style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;