import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../services/supabaseClient";

export default function TelaForum() {
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const {data, error} = await supabase
      .from("posts")
      .select("*")
      .order("created_at", {ascending: false});

      if (error){
        console.error("Erro ao carregar posts:", error);
      } else {
        setPosts(data || []);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="telaForum">
      <div className="forumTitulo">
        <h1>Publicações</h1>
        <button
          className="btnResponder"
          onClick={() => navigate("novo-comentario")} 
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
              <p className="forumTempo">{new Date(post.created_at).toLocaleDateString("pt-BR")}</p>
            </div>

            <button
              className="btnResponder"
              onClick={() => navigate(`post/${post.id}`)}
            >
              Responder
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}