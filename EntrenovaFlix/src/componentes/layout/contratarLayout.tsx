import { Outlet } from 'react-router-dom';
import '../../styles/contratacaoPlanos.css'

function contratarLayout() {
  return (
    <div className='bodyMain'>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default contratarLayout;