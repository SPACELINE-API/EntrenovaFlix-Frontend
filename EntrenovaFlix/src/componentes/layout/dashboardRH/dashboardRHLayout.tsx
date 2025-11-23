import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import SidebarRH from "./sidebarRH";
import HeaderRH from "./headerRH";
import "../../../styles/dashboardRHLayout.css";
import { getActiveUserPlan } from "../../../services/apiService";

interface DashboardRHLayoutProps {
  userAvatar?: string;
  pageTitle?: string;
}

interface DecodedToken {
  role: "admin" | "rh" | "user";
  nome: string;
  sobrenome: string;
  email: string;
}

function DashboardRHLayout({ userAvatar }: DashboardRHLayoutProps) {
  const [userName, setUserName] = useState<string>("Usuário");
  const [activePlan, setActivePlan] = useState<string>("Plano Essencial");

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

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const data = await getActiveUserPlan();
        if (data && data.planName) {
          setActivePlan(data.planName);
        }
      } catch (error) {
        console.error("Erro ao buscar o plano ativo:", error);
      }
    };

    fetchActivePlan();
  }, []);

  return (
    <div className="dashboard-rh-layout">
      <SidebarRH activePlan={activePlan} />
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
