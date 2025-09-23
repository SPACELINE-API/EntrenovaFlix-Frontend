import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../componentes/layout/mainLayout';
import TelaColab from '../paginas/telaColab';
import NotFoundPage from '../paginas/NotFoundPage';
import LpLayout from '../componentes/layout/LandingPage/lpLayout'
import LandingPage from '../paginas/landingPage';
import Login from '../paginas/login';
import TelaDiagnostico from '../paginas/telaDiagnostico';

const router = createBrowserRouter([
    {
        path:'/',
        element: <LpLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <LandingPage/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>,
        errorElement: <NotFoundPage/>
        
    },
    {
        path: '/colaboradores',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <TelaColab/>
            }   
        ]
    },
    {
        path: '/diagnóstico',
        element: <LpLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <TelaDiagnostico/>
            }   
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;