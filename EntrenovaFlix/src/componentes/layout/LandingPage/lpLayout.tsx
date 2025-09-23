import { Outlet } from 'react-router-dom';
import Cabeçalho from './lpCabe';
import '../../../styles/lp.css'

function LpLayout() {
  return (
    <div className='bodyLp'>
      <Cabeçalho />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default LpLayout;