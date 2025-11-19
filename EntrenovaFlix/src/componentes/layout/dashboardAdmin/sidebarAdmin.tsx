<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> origin/SPACE-214
import { useNavigate, useLocation } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { PiMonitorPlayFill } from "react-icons/pi";
<<<<<<< HEAD
import { MdOutlineFeedback } from "react-icons/md";
=======
>>>>>>> origin/SPACE-214
import "../../../styles/sidebarRH.css";

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();
<<<<<<< HEAD
=======
  const [collapsed, setCollapsed] = useState(false);
>>>>>>> origin/SPACE-214

  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("/entrenovaAdmin/empresas")) return "empresas";
    if (path.includes("/entrenovaAdmin/trilhas")) return "trilhas";
<<<<<<< HEAD
    if (path.includes("/entrenovaAdmin/feedback")) return "feedback";
=======
>>>>>>> origin/SPACE-214
    return "visao-geral";
  };

  const activeItem = getActiveItem();

<<<<<<< HEAD
  return (
    <div className="sidebar-RH">
=======
  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className={`sidebar-RH ${collapsed ? "collapsed" : ""}`}>
>>>>>>> origin/SPACE-214
      <div className="sidebar-RH-header">
        <h2>ENTRENOVAFLIX</h2>
        <p>Administrador</p>
      </div>

      <nav className="sidebar-RH-nav">
        <button
<<<<<<< HEAD
          className={`sidebar-RH-item ${
            activeItem === "visao-geral" ? "active" : ""
          }`}
          onClick={() => navigate("/entrenovaAdmin")}
        >
          <FaLightbulb size={24} />
          Visão geral
        </button>
        <button
          className={`sidebar-RH-item ${
            activeItem === "empresas" ? "active" : ""
          }`}
          onClick={() => navigate("/entrenovaAdmin/empresas")}
        >
          <FaBuildingUser size={24} />
          Empresas
        </button>
        <button
          className={`sidebar-RH-item ${
            activeItem === "trilhas" ? "active" : ""
          }`}
          onClick={() => navigate("/entrenovaAdmin/trilhas")}
        >
          <PiMonitorPlayFill size={24} />
          Trilhas
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
=======
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
>>>>>>> origin/SPACE-214
    </div>
  );
}

export default SidebarAdmin;
