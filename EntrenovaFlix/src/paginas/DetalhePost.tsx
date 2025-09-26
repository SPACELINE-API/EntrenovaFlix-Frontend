import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DetalhePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const postsMock = [
    {
      id: 1, 
      usuario: "Luana Souza",
      pergunta: "Como posso melhorar meu trabalho em equipe?",
      descricao:
        "Estou desenvolvendo um projeto no Jira. Queria saber como posso usá-lo para melhorar minha comunicação com o time. Alguém pode me ajudar?",
      tempo: "há 3 dias",
    },
    {
      id: 2, 
      usuario: "Outra Luana", 
      pergunta: "Qual a melhor forma de organizar as tarefas no Trello?",
      descricao:
        "Minha equipe está começando a usar o Trello, mas estamos um pouco perdidos sobre como criar os quadros e as listas de forma eficiente. Alguma dica?",
      tempo: "há 7 dias",
    },
  ];

  useEffect(() => {
    const postEncontrado = postsMock.find((p) => p.id === Number(postId));

    if (postEncontrado) {
      setPost(postEncontrado);
    }
  }, [postId]);

  if (!post) {
    return <div>Carregando post...</div>;
  }

  return (
    <div className="telaDetalhePost">
      <button onClick={() => navigate(-1)} className="btnVoltar">
        Voltar
      </button>

      <div className="postCompleto">
        <h1>{post.pergunta}</h1>
        <div className="forumUser">
          <div className="avatar"></div>
          <span className="nomeUsuario">{post.usuario}</span>
        </div>
        <p className="forumDescricao">{post.descricao}</p>
        <p className="forumTempo">Post feito {post.tempo}</p>
      </div>

      <div className="areaComentario">
        <h2>Responder</h2>
        <form>
          <textarea placeholder="Escreva sua resposta..." rows="4"></textarea>
          <button type="submit" className="btnResponder">
            Enviar Resposta
          </button>
        </form>
      </div>
    </div>
  );
}