import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../componentes/layout/mainLayout';
import LpLayout from '../componentes/layout/LandingPage/lpLayout';
import LandingPage from '../paginas/landingPage';
import Login from '../paginas/login';
import TelaColab from '../paginas/telaColab';
import TelaTrilhas from '../paginas/telaTrilhas';
import NotFoundPage from '../paginas/NotFoundPage';
import Dashboard from '../paginas/Dashboard';
import TelaForum from '../paginas/forum';
import NovoComentario from '../paginas/novoComentario';
import DetalhePost from '../paginas/DetalhePost';
import TelaDiagnostico from '../paginas/telaDiagnostico';
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
      {
        path:'diagnostico',
        element: <TelaDiagnostico/>
      }
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
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;