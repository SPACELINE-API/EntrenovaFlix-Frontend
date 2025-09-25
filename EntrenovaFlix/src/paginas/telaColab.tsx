import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TiArrowSortedDown } from "react-icons/ti";

export default function TelaColab() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtro, setFiltro] = useState('Todas');
  const navigate = useNavigate();
   function Trilhas() {
    navigate('/colaboradores/trilhas')
  }

  return (
    <div>
      <header>
        <div className="tituloTrilha">
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
          <span className="conteudo">Como ampliar as vendas online?</span>
          <button className="botao" onClick={Trilhas}>Continuar</button>
        </div>

        <div className="retangulo">
          <span className="conteudo">Produtividade dos funcionários</span>
          <button className="botao">Continuar</button>
        </div>

        <div className="retangulo">
          <span className="conteudo">Aumentando a comunicação interna da empresa</span>
          <button className="botao">Continuar</button>
        </div>
      </main>
    </div>
  );
}
