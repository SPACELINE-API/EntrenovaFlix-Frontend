import { Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import SidebarRH from './sidebarRH';
import HeaderRH from './headerRH';
import '../../../styles/dashboardRHLayout.css';

interface DashboardRHLayoutProps {
  userAvatar?: string;
  pageTitle?: string;
}

interface DecodedToken {
  role: 'admin' | 'rh' | 'user';
  nome: string;
  sobrenome: string; 
  email: string;
}

function DashboardRHLayout({ userAvatar }: DashboardRHLayoutProps) {
  const [userName, setUserName] = useState<string>("Usuário");

  const location = useLocation();
    const pageTitles: { [key: string]: string } = {
        '/dashboardRH': ' ',
        '/dashboardRH/trilhas': 'Trilhas',
        '/dashboardRH/diagnosticos': 'Diagnósticos',
        '/dashboardRH/planos': 'Planos',
        '/dashboardRH/funcionarios': 'Funcionários',
        '/dashboardRH/historicoChatbot': 'Histórico de ChatBot',
        '/dashboardRH/feedbackRH': 'Feedbacks',
    };
    const currentTitle = pageTitles[location.pathname] || 'Área Administrativa';

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        const fullName = decodedToken.sobrenome
          ? `${decodedToken.nome} ${decodedToken.sobrenome}`
          : decodedToken.nome;

        setUserName(fullName || "Usuário");
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []); 

  return (
    <div className="dashboard-rh-layout">
      <SidebarRH />
      <div className="dashboard-rh-content">
        <HeaderRH userName={userName} userAvatar={userAvatar} pageTitle={currentTitle} />
        <main className="dashboard-rh-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardRHLayout;
