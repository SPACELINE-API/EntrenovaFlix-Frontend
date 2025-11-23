import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "../services/apiService";
import forumService from "../services/forumService";
import CommentForm from "../componentes/layout/forum/CommentForm";

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
  respostas: Comentario[];
  replies: Comentario[]; 
}

const replySchema = z.object({
  conteudo: z.string().min(3, "A resposta deve ter pelo menos 3 caracteres."),
});

type ReplyFormData = z.infer<typeof replySchema>;

export default function DetalhePost() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<ReplyFormData>({ resolver: zodResolver(replySchema) });

  const [post, setPost] = useState<PostDetail | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const formatComments = (comments: Comentario[]): Comentario[] => {
    return comments.map((c) => ({
      ...c,
      replies: c.respostas ? formatComments(c.respostas) : []
    }));
  };

  const fetchPostData = async () => {
    if (!postId) return;
    setLoading(true);

    try {
      const postRes = await api.get<PostDetail>(`/posts/${postId}`);
      setPost(postRes.data);

      const comentariosRes = await api.get<any>(`/posts/${postId}/comentarios`);
      const raw = comentariosRes.data.results || comentariosRes.data;

      const tree = formatComments(raw);
      setComentarios(tree);

    } catch (err) {
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
      await forumService.createReply(postId, {
        conteudo: data.conteudo,
        resposta_a: replyingTo  
      });

      reset();
      setReplyingTo(null);
      await fetchPostData();

    } catch (error: any) {
      console.error("Erro ao enviar resposta:", error.response?.data || error.message);
      alert("Falha ao enviar resposta.");
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!post) return <div>Post não encontrado.</div>;

  return (
    <div className="telaDetalhePost">
      <button onClick={() => navigate(-1)} className="btnVoltar">
        ← Voltar
      </button>

      <div className="postCompleto">
        <h1 className="tituloPost">{post.pergunta}</h1>

        <div className="forumUser">
          <div className="avatar"></div>
          <span className="nomeUsuario">{post.usuario.nome}</span>
          <span className="forumTempo">{post.tempo}</span>
        </div>

        <p className="forumDescricao">{post.descricao}</p>
      </div>

      <div className="comentarios">
        <h2>Comentários ({comentarios.length})</h2>

        {comentarios.map((c) => (
          <CommentForm
            key={c.id}
            comentario={c}
            level={0}
            onReply={(id) => setReplyingTo(id)}
          />
        ))}

        {comentarios.length === 0 && (
          <p className="nenhumComentario">Nenhuma resposta ainda.</p>
        )}
      </div>
      <div className="areaComentario">
        <h2>Responder ao Post</h2>

        <form onSubmit={handleSubmit(handleCreateReply)}>
          <textarea
            placeholder="Escreva sua resposta..."
            rows={4}
            {...register("conteudo")}
          />

          {errors.conteudo && (
            <p className="error-message">{errors.conteudo.message}</p>
          )}

          <button type="submit" className="btnEnviar1">Enviar</button>
        </form>
      </div>

    </div>
  );
}
