import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../componentes/layout/mainLayout';
import DevolutivaPlanos from '../paginas/devolutivaPlanos';
import NotFoundPage from '../paginas/NotFoundPage';  


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <DevolutivaPlanos/>,
                
            },
                
        
  
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;