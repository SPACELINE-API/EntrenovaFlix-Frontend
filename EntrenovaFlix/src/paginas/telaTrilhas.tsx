import { BiSolidCameraMovie } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { IoPlay } from "react-icons/io5";
import { PiMicrophoneFill } from "react-icons/pi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
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
          {sidebarOpen ? (
            <MdOutlineKeyboardDoubleArrowLeft size={24} />
          ) : (
            <MdOutlineKeyboardDoubleArrowRight size={24} />
          )}
        </button>

        {sidebarOpen && (
          <>
            <h3
              className="sidebarSubtitulo"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "200",
                color: "#5A4FCF",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              Materiais
            </h3>
          </>
        )}

        <button className="sidebar-btn" onClick={() => navigate("/trilhas")}>
          <BiSolidCameraMovie className="sidebar-icon" />{" "}
          {sidebarOpen && "Filme"}
        </button>

        <button className="sidebar-btn">
          <GiBrain className="sidebar-icon" /> {sidebarOpen && "Quiz"}
        </button>

        <button className="sidebar-btn">
          <PiMicrophoneFill className="sidebar-icon" />{" "}
          {sidebarOpen && "Podcast"}
        </button>

        <button className="sidebar-btn">
          <IoPlay className="sidebar-icon" /> {sidebarOpen && "Video"}
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className="conteudoTrilha">
        <div className="trilhaTitulo">
          <h1>O PODER DO MARKETING PARA VENDAS</h1>
          <h3 style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <FaRegClock /> 27 minutos
          </h3>
        </div>

        <iframe
          width="900"
          height="500"
          style={{ borderRadius: "15px", marginTop: "1rem" }}
          src="https://www.youtube.com/embed/NpEaa2P7qZI?si=WZTsU1VWrqxcYf_G"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <div className="navItems" style={{ marginTop: "1.5rem", display: "flex", gap: "1rem" }}>
          <button className="navBtn">
            <MdKeyboardDoubleArrowLeft size={24} /> Atividade Anterior
          </button>
          <button className="navBtn">
            Próxima atividade <MdKeyboardDoubleArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
