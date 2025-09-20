import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../componentes/layout/mainLayout';
import TelaColab from '../paginas/telaColab';
import NotFoundPage from '../paginas/NotFoundPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children:[
            {
                index: true,
                element: <TelaColab/>
            }
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;