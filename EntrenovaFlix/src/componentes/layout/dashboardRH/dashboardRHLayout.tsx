import { Outlet } from 'react-router-dom';
import SidebarRH from './sidebarRH';
import HeaderRH from './headerRH';
import '../../../styles/dashboardRHLayout.css';

interface DashboardRHLayoutProps {
    userName?: string;
    userAvatar?: string; // Imagem do usuário (da pra ser um URL)
}

function DashboardRHLayout({ userName = "Alisson Soares", userAvatar }: DashboardRHLayoutProps) {
    return (
        <div className="dashboard-rh-layout">
            <SidebarRH />
            <div className="dashboard-rh-content">
                <HeaderRH userName={userName} userAvatar={userAvatar} />
                <main className="dashboard-rh-main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardRHLayout;