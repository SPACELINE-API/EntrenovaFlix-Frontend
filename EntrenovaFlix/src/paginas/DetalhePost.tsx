import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import api from "../services/apiService";
import forumService from "../services/forumService";


interface PostDetail {
 id: string; 
 usuario: { nome: string };
 pergunta: string;
 descricao: string;
 tempo: string;
}

interface Comentario {
 id: number;
 usuario: { nome: string };
 conteudo: string;
 tempo: string;
}

const replySchema = z.object({
  conteudo: z.string().min(3, "A resposta deve ter pelo menos 5 caracteres."),
});

type ReplyFormData = z.infer<typeof replySchema>;

export default function DetalhePost() {
 const { postId } = useParams<{ postId: string }>();
 const navigate = useNavigate();
 const { register, handleSubmit, formState: { errors }, reset } = useForm<ReplyFormData>({
    resolver: zodResolver(replySchema),
  });
  
 const [post, setPost] = useState<PostDetail | null>(null);
 const [comentarios, setComentarios] = useState<Comentario[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);


 const fetchPostData = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const postRes = await api.get<PostDetail>(`/posts/${postId}`);
      setPost(postRes.data);
    
      const comentariosRes = await api.get<any>(`/posts/${postId}/comentarios`);
      
      const comentariosData = comentariosRes.data.results || comentariosRes.data;
      
      setComentarios(comentariosData); 

    } catch (err: any) {
      console.error("Erro ao carregar post:", err);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  fetchPostData();
 }, [postId]);


  const handleCreateReply = async (data: ReplyFormData) => {
    if (!postId) return;
    try {
        await forumService.createReply(postId, data); 
        alert("Resposta enviada com sucesso!");
        reset();
        await fetchPostData();
    } catch (error: any) {
        console.error("Erro ao enviar resposta:", error.response?.data || error.message);
        alert("Falha ao enviar resposta. Tente novamente.");
    }
  };

 if (loading) return <div>Carregando post...</div>;
 if (error) return <div>Erro: {error}</div>;
 if (!post) return <div>Post não encontrado.</div>;

 return (
  <div className="telaDetalhePost">
   <button onClick={() => navigate(-1)} className="btnVoltar">
    Voltar
   </button>

   <div className="postCompleto">
    <h1>{post.pergunta}</h1>
    <div className="forumUser">
     <div className="avatar"></div>
     <span className="nomeUsuario">{post.usuario.nome}</span>
    </div>
    <p className="forumDescricao">{post.descricao}</p>
    <p className="forumTempo">Post feito {post.tempo}</p>
   </div>
      
      {/* Exibir Comentários */}
      <div className="comentarios">
        <h2>Comentários ({comentarios.length})</h2>
        {comentarios.map(comentario => (
            <div key={comentario.id} className="comentarioCard">
                <div className="comentarioUser">
                    <div className="avatar"></div>
                    <span className="nomeUsuario">{comentario.usuario.nome}</span>
                    <span className="comentarioTempo">{comentario.tempo}</span>
                </div>
                <p>{comentario.conteudo}</p>
            </div>
        ))}
        {comentarios.length === 0 && <p>Nenhuma resposta ainda. Seja o primeiro a comentar!</p>}
      </div>

   <div className="areaComentario">
    <h2>Responder</h2>
    <form onSubmit={handleSubmit(handleCreateReply)}>
     <textarea 
              placeholder="Escreva sua resposta..." 
              rows={4} 
              {...register("conteudo")}
            />
            {errors.conteudo && <p className='error-message'>{errors.conteudo.message}</p>}
     <button type="submit" className="btnResponder">
      Enviar Resposta
     </button>
    </form>
   </div>
  </div>
 );
}