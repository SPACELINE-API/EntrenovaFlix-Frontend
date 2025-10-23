import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiArrowSortedDown } from "react-icons/ti";
import { Center } from '@mantine/core';

export default function TelaColab() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtro, setFiltro] = useState('Todas');
  const navigate = useNavigate();
   function Trilhas() {
    navigate('/colaboradores/trilhas')
  }

  return (
    <div>
      <header className="colab-header">
        <div className="tituloTrilha" style={{ fontSize: '2rem', marginTop: '0' }}>
          <p>Trilhas em andamento</p>
        </div>
       <div className="dropdown">
          <button onClick={() => setMenuAberto(!menuAberto)}>
            {filtro}
            <TiArrowSortedDown 
              style={{ 
                transform: menuAberto ? 'rotate(180deg)' : 'rotate(0deg)', 
                transition: 'transform 0.2s' 
              }} 
            />
          </button>
    
         { /*menuAberto && (
          <div className="menu">
            <div onClick={() => { setFiltro('Todas'); setMenuAberto(false); }}>Todas</div>
            <div onClick={() => { setFiltro('Recentes'); setMenuAberto(false); }}>Recentes</div>
            <div onClick={() => { setFiltro('Antigas'); setMenuAberto(false); }}>Antigas</div>
          </div>
        )*/}
      </div> 

      </header>

            <main>
        <div className="retangulo">
          <div className="card-header">
            <span className="conteudo">Como ampliar as vendas online?</span>
            <span className="card-subtitle">0 de 8 atividades concluídas</span>
          </div>
          <div className="card-footer">
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: '0%' }}></div>
              </div>
              <span className="progress-percent">0%</span>
            </div>
            <button className="botao" onClick={Trilhas}>Continuar</button>
          </div>
        </div>

        <div className="retangulo">
          <div className="card-header">
            <span className="conteudo">Produtividade dos funcionários</span>
            <span className="card-subtitle">0 de 5 atividades concluídas</span>
          </div>
          <div className="card-footer">
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: '0%' }}></div>
              </div>
              <span className="progress-percent">0%</span>
            </div>
            <button className="botao">Continuar</button>
          </div>
        </div>

        <div className="retangulo">
          <div className="card-header">
            <span className="conteudo">Aumentando a comunicação interna da empresa</span>
            <span className="card-subtitle">0 de 10 atividades concluídas</span>
          </div>
          <div className="card-footer">
            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress" style={{ width: '0%' }}></div>
              </div>
              <span className="progress-percent">0%</span>
            </div>
            <button className="botao">Continuar</button>
          </div>
        </div>
      </main>
    </div>
  );
}
