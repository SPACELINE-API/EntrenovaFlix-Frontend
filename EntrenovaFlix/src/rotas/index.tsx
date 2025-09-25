import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../componentes/layout/mainLayout';
import LpLayout from '../componentes/layout/LandingPage/lpLayout';
import LandingPage from '../paginas/landingPage';
import Login from '../paginas/login';
import TelaColab from '../paginas/telaColab';
import TelaTrilhas from '../paginas/telaTrilhas';
import NotFoundPage from '../paginas/NotFoundPage';
import Dashboard from '../paginas/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LpLayout />, 
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/colaboradores',
    element: <MainLayout />,   
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, 
        element: <TelaColab />,
      },
      {
        path: 'trilhas', 
        element: <TelaTrilhas />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
  {
        path: '/dashboard',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <Dashboard/>
            }
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;