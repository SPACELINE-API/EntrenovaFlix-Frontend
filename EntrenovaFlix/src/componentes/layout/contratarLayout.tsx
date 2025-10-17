import { Outlet } from 'react-router-dom';
import '../../styles/mainLayout.css'

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