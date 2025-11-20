import "../../styles/planos.css";
import { MdOutlineTouchApp } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import GraficoPlano from "../../componentes/layout/planos";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


function PlanosRH() {
  const navigate = useNavigate();
  const handleMudarPlano = () => {
        navigate('/cadastro/selecaoPlanos'); 
    };

  return (
    <div>
      <h2>
        Potencialize sua experiência com diferentes planos e desbloqueie todos
        os recursos, conteúdos exclusivos e suporte prioritário para aproveitar
        ao máximo a plataforma
      </h2>

      <div className="grafico">
        <GraficoPlano />
      </div>

      <div className="container-beneficio">
        <div className="alinhando-icon">
          <div className="icon">
            <MdOutlineTouchApp />
          </div>
          <div className="beneficios">
            <p>Personalize a</p>
          </div>
          <div className="detalhe-beneficio">
            <p>interface</p>
          </div>
        </div>

        <div className="alinhando-icon">
          <div className="icon">
            <FaRegStar />
          </div>
          <div className="beneficios">
            <p>Tenha experiências</p>
          </div>
          <div className="detalhe-beneficio">
            <p>customizadas</p>
          </div>
        </div>

        <div className="alinhando-icon">
          <div className="icon">
            <PiUsersThreeBold />
          </div>
          <div className="beneficios">
            <p>Cadastre</p>
          </div>
          <div className="detalhe-beneficio">
            <p>mais usuários</p>
          </div>
        </div>
      </div>

      <div className="botao-plano">
        <button onClick={handleMudarPlano}>
          Trocar o Plano
        </button>
      </div>

     
    </div>
  );
}

export default PlanosRH;
