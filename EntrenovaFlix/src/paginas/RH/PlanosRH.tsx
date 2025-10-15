import "../../styles/planos.css";
import { MdOutlineTouchApp } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import GraficoPlano from "../../componentes/layout/planos";
import { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

function PlanosRH() {
   const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const navigate = useNavigate();

   const handleOpenModal = (type:any) => {
    setModalType(type);
    setModalOpen(true);
  };

 
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType('');
  };
    const handleContinuar = () => {
    handleCloseModal(); 
    if (modalType === 'upgrade') {
      navigate('/diagnostico/devolutiva'); 
    } else if (modalType === 'downgrade') {
      navigate('/diagnostico/devolutiva'); 
    }
  };

  return (
    <div>
      <h1 className="titulo">Planos</h1>
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
        <button onClick={() =>handleOpenModal('upgrade')} className="btn-modal">
          Upgrade do Plano
        </button>
        <button onClick={() =>handleOpenModal('downgrade')}  className="btn-modal">
          Downgrade do Plano
        </button>
      </div>

     
      {modalOpen && (
        <div className="modal-active">
          <div className="modal-content">
            {modalType === 'upgrade' && (
            <p>
             Ao realizar o upgrade do plano, será cobrada a diferença proporcional entre o valor do seu plano atual e o novo plano escolhido.
             Certifique-se de revisar os valores antes de confirmar a alteração.
            </p>
            )}
            {modalType === 'downgrade' && (
                <p>
                    Ao realizar o downgrade, alguns recursos e benefícios do seu plano atual podem deixar de estar disponíveis.
                    A atualização do plano será aplicada apenas após o término do ciclo de cobrança atual.
                    Certifique-se de revisar as funcionalidades incluídas antes de confirmar a mudança para evitar perder acesso a conteúdos importantes
                </p>
            )}    
            <button className="btn-continuar" onClick={handleContinuar}>
              Continuar
            </button>
            <button className="btn-fechar" onClick={handleCloseModal}>
              <IoClose />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlanosRH;
