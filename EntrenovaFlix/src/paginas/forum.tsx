import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function TelaForum() {
  const [posts] = useState([
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
      pergunta: "Como posso melhorar meu trabalho em equipe?",
      descricao:
        "Estou desenvolvendo um projeto no Jira. Queria saber como posso usá-lo para melhorar minha comunicação com o time. Alguém pode me ajudar?",
      tempo: "há 7 dias",
    },
  ])

  const navigate = useNavigate()

  return (
    <div className="telaForum">
      <div className="forumTitulo">
        <h1>Publicações</h1>
        <button
          className="btnResponder"
          onClick={() => navigate("/novo-comentario")} 
        >
          Escrever comentário +
        </button>
      </div>

      <div className="forumPosts">
        {posts.map((post) => (
          <div key={post.id} className="forumCard">
            <div className="forumUser">
              <div className="avatar"></div>
              <span className="nomeUsuario">{post.usuario}</span>
            </div>

            <div className="forumConteudo">
              <h3 className="forumPergunta">{post.pergunta}</h3>
              <p className="forumDescricao">{post.descricao}</p>
              <p className="forumTempo">Post feito {post.tempo}</p>
            </div>

            <button
              className="btnResponder"
              onClick={() => navigate(`/forum/post/${post.id}`)}
            >
              Responder
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}