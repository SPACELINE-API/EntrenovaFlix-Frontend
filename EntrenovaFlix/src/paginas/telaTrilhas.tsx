import { BiSolidCameraMovie } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { IoPlay } from "react-icons/io5";
import { PiMicrophoneFill } from "react-icons/pi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function TelaTrilhas() {
  const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="telaTrilhas">
      <div className={`sidebar ${sidebarOpen ? "aberta" : "minimizada"}`}>
      
        <button className="toggleSidebarBtn" onClick={toggleSidebar}>
          {sidebarOpen ? <MdOutlineKeyboardDoubleArrowLeft size={24} /> : <MdOutlineKeyboardDoubleArrowRight size={24} />}
        </button>

          {sidebarOpen && (
            <h2 className="sidebarTitulo">Como ampliar suas vendas online?</h2>
          )}

          {sidebarOpen && (
            <h3 className="sidebarSubtitulo" style={{display: "flex", justifyContent: "center", fontSize: "16px", fontWeight: "200", color: "#5A4FCF", marginTop: "5px", marginBottom:"5px"}}>
              Materiais
            </h3>
          )}
        <button className="sidebar-btn" onClick={() => navigate("/trilhas")}>
          <BiSolidCameraMovie className="sidebar-icon"/> {sidebarOpen && "Filme"}
        </button>

        <button className="sidebar-btn">
          <GiBrain className="sidebar-icon"/> {sidebarOpen && "Quiz"}
        </button>

        <button className="sidebar-btn">
          <PiMicrophoneFill className="sidebar-icon"/> {sidebarOpen && "Podcast"}
        </button>

        <button className="sidebar-btn">
          <IoPlay className="sidebar-icon"/> {sidebarOpen && "Video"}
        </button>
      </div>
       <div className="trilhaTitulo">
        <p>O PODER DO MARKETING PARA VENDAS</p>
      </div>
    </div>
  );
}