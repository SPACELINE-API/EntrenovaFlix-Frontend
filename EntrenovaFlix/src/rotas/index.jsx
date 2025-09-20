import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../componentes/layout/mainLayout';
import TelaColab from '../paginas/telaColab';
import NotFoundPage from '../paginas/NotFoundPage';
import TelaTrilhas from '../paginas/telaTrilhas';
import TelaForum from '../paginas/forum';
import NovoComentario from '../paginas/novoComentario';
import DetalhePost from '../paginas/DetalhePost'; 

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
            },
            {
                path:"forum",
                element:<TelaForum/>
            },
            {
                path:"novo-comentario",
                element:<NovoComentario/>
            },
            {
                path:"forum/post/:postId", 
                element:<DetalhePost/>
            }
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;