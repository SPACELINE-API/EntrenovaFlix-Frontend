import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiService";


type Post = {
   id: string;
   usuario: {
      id: number;
      nome: string;
      email: string;
   };
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
         try {
            const res = await api.get<Post[]>("posts");
            if (!cancelled) setPosts(res.data);
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

   if (loading) return <div>Carregando posts...</div>;
   if (error) return <div>Erro: {error}</div>;

   return (
      <div className="telaForum">
         <div className="forumTitulo">
            <h1>Publicações</h1>
            <button
               className="btnResponder"
               onClick={() => navigate("/colaboradores/novo-comentario")}
            >
               + Crie um Post
            </button>
         </div>

         <div className="forumPosts">
            {posts.map((post) => (
               <div
                  key={post.id}
                  className="forumCard"
                  onClick={() => navigate(`/colaboradores/forum/post/${post.id}`)}
               >
                  <div className="forumUser">
                     <div className="avatar"></div>
                     <span className="nomeUsuario">{post.usuario.nome}</span>
                  </div>

                  <div className="forumConteudo">
                     <h3 className="forumPergunta">{post.pergunta}</h3>
                     <p className="forumDescricao">{post.descricao}</p>
                     <p className="forumTempo">Post feito {post.tempo ?? ""}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}