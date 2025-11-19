import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { PiMonitorPlayFill } from "react-icons/pi";
<<<<<<< Updated upstream
import { MdOutlineFeedback } from "react-icons/md";
import "../../../styles/sidebarRH.css";
=======
import '../../../styles/sidebarRH.css';
>>>>>>> Stashed changes

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

<<<<<<< Updated upstream
  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("/entrenovaAdmin/empresas")) return "empresas";
    if (path.includes("/entrenovaAdmin/trilhas")) return "trilhas";
    if (path.includes("/entrenovaAdmin/feedback")) return "feedback";
    return "visao-geral";
  };
=======
    const getActiveItem = () => {
        const path = location.pathname;
        if (path.includes('/entrenovaAdmin/empresas')) return 'empresas';
        if (path.includes('/entrenovaAdmin/trilhas')) return 'trilhas';
        return 'visao-geral';
    };
>>>>>>> Stashed changes

  const activeItem = getActiveItem();

<<<<<<< Updated upstream
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar-RH ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-RH-header">
        <h2>ENTRENOVAFLIX</h2>
        <p>Administrador</p>
      </div>

      <nav className="sidebar-RH-nav">
        <button
          className={`sidebar-RH-item ${activeItem === "visao-geral" ? "active" : ""}`}
          onClick={() => navigate("/entrenovaAdmin")}
        >
          <FaLightbulb size={24} />
          <span>Visão geral</span>
        </button>

        <button
          className={`sidebar-RH-item ${activeItem === "empresas" ? "active" : ""}`}
          onClick={() => navigate("/entrenovaAdmin/empresas")}
        >
          <FaBuildingUser size={24} />
          <span>Empresas</span>
        </button>

        <button
          className={`sidebar-RH-item ${activeItem === "trilhas" ? "active" : ""}`}
          onClick={() => navigate("/entrenovaAdmin/trilhas")}
        >
          <PiMonitorPlayFill size={24} />
          <span>Trilhas</span>
        </button>

        <button
          className={`sidebar-RH-item ${
            activeItem === "feedback" ? "active" : ""
          }`}
          onClick={() => navigate("/entrenovaAdmin/feedback")}
        >
          <MdOutlineFeedback size={24} />
          Feedback
        </button>
      </nav>

      <button
        onClick={toggleSidebar}
        style={{
          marginTop: "auto",
          padding: "8px",
          background: "none",
          border: "none",
          color: "#fafafa",
          cursor: "pointer",
        }}
      >
      </button>
    </div>
  );
=======
    return (
        <div className="sidebar-RH">
            <div className="sidebar-RH-header">
                <h2>ENTRENOVAFLIX</h2>
                <p>Administrador</p>
            </div>
            
            <nav className="sidebar-RH-nav">
                <button
                    className={`sidebar-RH-item ${activeItem === 'visao-geral' ? 'active' : ''}`}
                    onClick={() => navigate('/entrenovaAdmin')}
                >
                    <FaLightbulb size={24}/>
                    Visão geral
                </button>
                <button
                    className={`sidebar-RH-item ${activeItem === 'empresas' ? 'active' : ''}`}
                    onClick={() => navigate('/entrenovaAdmin/empresas')}
                >
                    <FaBuildingUser size={24}/>
                    Empresas
                </button>
                <button
                    className={`sidebar-RH-item ${activeItem === 'trilhas' ? 'active' : ''}`}
                    onClick={() => navigate('/entrenovaAdmin/trilhas')}
                >
                    <PiMonitorPlayFill size={24}/>
                    Trilhas
                </button>
            </nav>
        </div>
    );
>>>>>>> Stashed changes
}

export default SidebarAdmin;
