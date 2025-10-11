import { useNavigate, useLocation } from 'react-router-dom';
import '../../../styles/sidebarRH.css';
import { FaCreditCard } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { PiMonitorPlayFill } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

function SidebarRH() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes('/dashboardRH/trilhas')) return 'trilhas';
    if (path.includes('/dashboardRH/diagnosticos')) return 'diagnosticos';
    if (path.includes('/dashboardRH/planos')) return 'planos';
    return 'visao-geral'; // default
  };

  const activeItem = getActiveItem();

  return (
    <div className="sidebar-RH">
      <div className="sidebar-RH-header">
        <h2>ENTRENOVAFLIX</h2>
        <p>Plano Básico</p>
      </div>

      <nav className="sidebar-RH-nav">
        <button
          className={`sidebar-RH-item ${activeItem === 'visao-geral' ? 'active' : ''}`}
          onClick={() => navigate('/dashboardRH')}
        >
          <FaLightbulb size={24}/>
          Visão geral
        </button>
        
        <button
          className={`sidebar-RH-item ${activeItem === 'trilhas' ? 'active' : ''}`}
          onClick={() => navigate('/dashboardRH/trilhas')}
        >
          <PiMonitorPlayFill size={24}/>
          Trilhas
        </button>
        
        <button
          className={`sidebar-RH-item ${activeItem === 'diagnosticos' ? 'active' : ''}`}
          onClick={() => navigate('/dashboardRH/diagnosticos')}
        >
          <TbReportSearch size={24}/>
          Diagnósticos
        </button>
        
        <button
          className={`sidebar-RH-item ${activeItem === 'planos' ? 'active' : ''}`}
          onClick={() => navigate('/dashboardRH/planos')}
        >
          <FaCreditCard size={24}/>
          Planos
        </button>
      </nav>
    </div>
  );
}

export default SidebarRH;