import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";
import "../styles/forum.css";

type Usuario = { id: number; nome: string; email?: string };
type Post = {
  id: string;
  usuario: Usuario;
  pergunta: string;
  descricao: string;
  tempo?: string;
};

export default function TelaForum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get<Post[]>("/posts");
        if (!cancelled) setPosts(res.data || []);
      } catch (err: any) {
        console.error(err);
        if (!cancelled) setError(err.response?.data?.detail || "Erro ao carregar posts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="telaForum-loading">Carregando posts...</div>;
  if (error) return <div className="telaForum-error">Erro: {error}</div>;

  return (
    <div className="telaForum">
      <div className="forum-container">
        <div className="forumTitulo">
          <h1>Publicações</h1>
          <button
            className="btnResponder"
            onClick={() => navigate("/colaboradores/novo-comentario")}
          >
            + Criar Post
          </button>
        </div>

        <div className="forumPosts">
          {posts.length === 0 && <div className="empty">Nenhuma publicação encontrada.</div>}
          {posts.map((post) => (
            <article
              key={post.id}
              className="reddit-card forumCard"
              onClick={() => navigate(`/colaboradores/forum/post/${post.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/colaboradores/forum/post/${post.id}`)}
            >
              <div className="content-column">
                <div className="post-meta">
                  <span className="subreddit-name">{post.usuario.nome}</span>
                  <span className="post-dot">•</span>
                  <span className="post-user">{post.tempo ?? "Agora"}</span>
                </div>

                <h3 className="post-title">{post.pergunta}</h3>
                <p className="post-body">{post.descricao}</p>

                <div className="post-actions">
                  <button className="action-btn" onClick={(e) => { e.stopPropagation(); navigate(`/colaboradores/forum/post/${post.id}`); }}>
                    💬 Ver
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
