import { Outlet } from 'react-router-dom';
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

function DashboardRHLayout({ userAvatar, pageTitle }: DashboardRHLayoutProps) {
  const [userName, setUserName] = useState<string>("Usuário");

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
        <HeaderRH userName={userName} userAvatar={userAvatar} pageTitle={pageTitle} />
        <main className="dashboard-rh-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardRHLayout;
