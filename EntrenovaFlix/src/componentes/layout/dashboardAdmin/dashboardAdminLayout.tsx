import { Outlet, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import SidebarAdmin from './sidebarAdmin';
import HeaderAdmin from './headerAdmin';
import '../../../styles/dashboardRHLayout.css';

interface DashboardAdminLayoutProps {
    userAvatar?: string;
}

interface DecodedToken {
    role: 'admin' | 'rh' | 'user';
    nome: string;
    sobrenome: string; 
    email: string;
}

function DashboardAdminLayout({ userAvatar }: DashboardAdminLayoutProps) {
    const [userName, setUserName] = useState<string>("Usuário");

    const location = useLocation();
    const pageTitles: { [key: string]: string } = {
        '/entrenovaAdmin': 'Visão Geral do Administrador',
        '/entrenovaAdmin/empresas': 'Empresas',
        '/entrenovaAdmin/trilhas': 'Gerenciamento de Conteúdo',
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
            <SidebarAdmin />
            <div className="dashboard-rh-content">
                <HeaderAdmin userName={userName} userAvatar={userAvatar} pageTitle={currentTitle}/>
                <main className="dashboard-rh-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardAdminLayout;