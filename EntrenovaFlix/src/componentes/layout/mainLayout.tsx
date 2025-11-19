import { Outlet } from 'react-router-dom';
import Header from './header';
import '../../styles/global.css'
function MainLayout() {

  
  return (
    <div className='bodyMain' >
      <Header />
      <main style={{ padding: '80px 20px 20px 20px' }}>
        <Outlet />
      </main>
    </div>
  );
}
export default MainLayout;