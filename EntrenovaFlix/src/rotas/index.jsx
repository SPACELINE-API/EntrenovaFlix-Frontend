import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../componentes/layout/mainLayout';
import TelaColab from '../paginas/telaColab';
import NotFoundPage from '../paginas/NotFoundPage';
import TelaTrilhas from '../paginas/telaTrilhas';   


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <TelaColab/>,
                
            },
            {
                path:"trilhas",
                element:<TelaTrilhas/>
            }
                
        
  
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;