import { BiSolidCameraMovie } from "react-icons/bi";
import { GiBrain } from "react-icons/gi";
import { IoPlay } from "react-icons/io5";
import { PiMicrophoneFill } from "react-icons/pi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function TelaTrilhas() {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(true);


  return (
    <div className="telaTrilhas">
       <div className={sidebar ? "sidebar aberta" : "sidebar fechada"}>
        <button className="closeSidebarBtn" onClick={() => setSidebar(false)}>
        <MdKeyboardDoubleArrowRight size={24}/></button>
        
        <h2 className="sidebarTitulo">Como ampliar suas vendas online?</h2>
        <h2 className="sidebarTitulo" style={{fontSize: "16px", fontWeight: "200",
                    color: "#5A4FCF",marginTop: "5px", marginBottom:"5px"}}>Materiais</h2>
        <button className="sidebar-btn" onClick={() => navigate("/trilhas")}>
          <BiSolidCameraMovie className="sidebar-icon"/> Filme</button>

        <button className="sidebar-btn">
          <GiBrain className="sidebar-icon"/> Quizz</button>

        <button className="sidebar-btn">
          <PiMicrophoneFill className="sidebar-icon"/>Podcast</button>

        <button className="sidebar-btn">
          <IoPlay className="sidebar-icon"/>Video</button>
      </div>

      <div className="trilhaTitulo"> 
        <p>O PODER DO MARKETING PARA VENDAS</p>
      </div>
    </div>
  );
}
