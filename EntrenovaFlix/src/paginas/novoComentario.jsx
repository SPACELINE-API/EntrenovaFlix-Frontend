import { useNavigate } from 'react-router-dom';

export default function NovoComentario() {
  const navigate = useNavigate();

  return (
    <div className="telaNovoComentario">
      <h1>Escrever novo comentário</h1>
      <div id='formu'>
        <form>
          <div className="comment-info">
            <div className="avatar"></div>
            <span>Por: </span>
            <span className="comment-author-name">Usuário x</span>
          </div>
          <label>Use o fórum para manter uma boa interação com a sua equipe!</label>
          <div>
            <input type="text" id="pergunta" placeholder='Título do seu comentário' required />
          </div>
          <div>
            <textarea id="descricao" name="descricao" rows="5" placeholder='Escreva sua dúvida, comentário ou observação' required />
          </div>
          <button type="submit">Publicar</button>
        </form>
      </div>
    </div>
  );
}