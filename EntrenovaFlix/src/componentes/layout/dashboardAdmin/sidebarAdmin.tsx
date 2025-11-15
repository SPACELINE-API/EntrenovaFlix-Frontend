import { useNavigate, useLocation } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { PiMonitorPlayFill } from "react-icons/pi";
import { MdOutlineFeedback } from "react-icons/md";
import "../../../styles/sidebarRH.css";

function SidebarAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveItem = () => {
    const path = location.pathname;
    if (path.includes("/entrenovaAdmin/empresas")) return "empresas";
    if (path.includes("/entrenovaAdmin/trilhas")) return "trilhas";
    if (path.includes("/entrenovaAdmin/feedback")) return "feedback";
    return "visao-geral";
  };

  const activeItem = getActiveItem();

  return (
    <div className="sidebar-RH">
      <div className="sidebar-RH-header">
        <h2>ENTRENOVAFLIX</h2>
        <p>Administrador</p>
      </div>

      <nav className="sidebar-RH-nav">
        <button
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
    </div>
  );
}

export default SidebarAdmin;
