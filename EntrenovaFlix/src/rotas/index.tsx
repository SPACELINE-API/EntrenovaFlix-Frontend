import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../componentes/layout/mainLayout';
import LpLayout from '../componentes/layout/LandingPage/lpLayout';
import DashboardRHLayout from '../componentes/layout/dashboardRH/dashboardRHLayout';
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
import DevolutivaPlanos from '../paginas/devolutivaPlanos';
import ChatBot from '../paginas/ChatBot';
import ChatBotInicio from '../paginas/ChatBotInicio';
import PrivateRoute from '../componentes/auth/ProtectedRoute';
import DashboardRH from '../paginas/RH/DashboardRH';
import TrilhasRH from '../paginas/RH/TrilhasRH';
import DiagnosticoRH from '../paginas/RH/DiagnosticoRH';
import PlanosRH from '../paginas/RH/PlanosRH';
import FuncionariosRH from '../paginas/RH/FuncionariosRH';

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
        path: 'diagnostico',
        element: <TelaDiagnostico />,
      },
      {
        path: 'diagnostico/devolutiva',
        element: <DevolutivaPlanos />,
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
    element: <PrivateRoute />, 
    children: [
      {
        element: <MainLayout />, 
        errorElement: <NotFoundPage />,
        children: [
          { index: true, element: <TelaColab /> },
          { path: 'trilhas', element: <TelaTrilhas /> },
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'forum', element: <TelaForum /> },
          { path: 'novo-comentario', element: <NovoComentario /> },
          { path: 'forum/post/:postId', element: <DetalhePost /> }
        ],
      }
    ],
  },
  {
    path: '/dashboardRH',
    element: <DashboardRHLayout />, 
    children: [
      { index: true, element: <DashboardRH /> },
      { path: 'trilhas', element: <TrilhasRH /> },
      { path: 'diagnosticos', element: <DiagnosticoRH /> },
      { path: 'planos', element: <PlanosRH /> },
      { path: 'funcionarios', element: <FuncionariosRH />}
    ],
  },
  {
    path: '/pagchatbot',
    element: <ChatBotInicio />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/chatbot',
    element: <ChatBot />,
    errorElement: <NotFoundPage />,
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;