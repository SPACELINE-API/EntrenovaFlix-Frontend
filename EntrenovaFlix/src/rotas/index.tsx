import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DevolutivaPlanos from '../paginas/devolutivaPlanos';
import NotFoundPage from '../paginas/NotFoundPage';  
import LpLayout from '../componentes/layout/LandingPage/lpLayout';


const router = createBrowserRouter([
    {
        path: '/',
        element: <LpLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                path:'devolutiva',
                element: <DevolutivaPlanos/>,
                
            },
                
        
  
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;