import { BiSolidCameraMovie } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { IoPlay } from "react-icons/io5";
import { PiMicrophoneFill } from "react-icons/pi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function TelaTrilhas() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);

  return (
    <div className={`telaTrilhas ${!sidebar ? 'sidebar-fechada' : ''}`}>
      {!sidebar && (
        <button className="openSidebarBtn" onClick={() => setSidebar(true)}>
          <MdKeyboardDoubleArrowRight size={32} />
        </button>
      )}
      <div className={sidebar ? "sidebar aberta" : "sidebar fechada"}>
        <button className="closeSidebarBtn" onClick={() => setSidebar(false)}>
          <MdKeyboardDoubleArrowLeft size={32} />
        </button>

        <h2 className="sidebarTitulo">Como ampliar suas vendas online?</h2>
        <h2 className="sidebarSubtitulo">Materiais</h2>

        <button className="sidebar-btn" onClick={() => navigate("/trilhas")}>
          <BiSolidCameraMovie className="sidebar-icon" size={24} /> 
          Filme
        </button>

        <button className="sidebar-btn">
          <GiBrain className="sidebar-icon" size={24} />
          Quizz
        </button>

        <button className="sidebar-btn">
          <PiMicrophoneFill className="sidebar-icon" size={24} />
          Podcast
        </button>

        <button className="sidebar-btn">
          <IoPlay className="sidebar-icon" size={24} />
          Video
        </button>
      </div>

      <div className="tituloTrilha">
        <p>O PODER DO MARKETING PARA VENDAS</p>
      </div>
    </div>
  );
}
