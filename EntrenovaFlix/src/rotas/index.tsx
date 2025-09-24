import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../componentes/layout/mainLayout';
import TelaColab from '../paginas/telaColab';
import NotFoundPage from '../paginas/NotFoundPage';
import LpLayout from '../componentes/layout/LandingPage/lpLayout'
import LandingPage from '../paginas/landingPage';
import Login from '../paginas/login';
import DiagnosticPage from '../paginas/diagnosticPage';
import DiagnosticTestePage from '../paginas/diagnosticTestePage';

// Placeholder components for missing routes
const TrilhasPage = () => <div>Trilhas Page - Coming Soon</div>;
const ForumPage = () => <div>Forum Page - Coming Soon</div>;
const DashboardPage = () => <div>Dashboard Page - Coming Soon</div>;

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
        path: '/diagnostico',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <DiagnosticPage/>
            }
        ]
    },
    {
        path: '/diagnostico-teste',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <DiagnosticTestePage/>
            }
        ]
    },
    {
        path: '/trilhas',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <TrilhasPage/>
            }
        ]
    },
    {
        path: '/forum',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <ForumPage/>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <MainLayout/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            }
        ]
    }
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}
export default AppRoutes;