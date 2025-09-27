import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

type Post = {
  id: string;
  usuario: string;
  pergunta: string;
  descricao: string;
  created_at: string;
};

type Resposta = {
  id: string;
  usuario: string;
  conteudo: string;
  created_at: string;
}

export default function DetalhePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [novaResposta, setNovaResposta] = useState("");
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUsuario(session.user.email ?? "Anônimo");
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUsuario(session.user.email ?? null);
      } else {
        setUsuario(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      const {data, error} = await supabase
        .from("posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Erro ao carregar post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    const fetchRespostas = async () => {
      if (!postId) return;

      const { data, error } = await supabase
        .from("respostas")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Erro ao carregar respostas:", error);
      }else {
        setRespostas(data || []);
      }
    };
    fetchRespostas();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!novaResposta.trim() || !postId || !usuario) return;

  const { data, error } = await supabase
    .from("respostas")
    .insert([{ post_id: postId, usuario, conteudo: novaResposta }])
    .select();
  if (error) {
    console.error("Erro ao enviar resposta:", error);
    alert("Erro ao enviar resposta: " + error.message);
  } else {
    setRespostas((prev) => [...prev, ...(data || [])]);
    setNovaResposta("");
  }
};


  if (loading) {
    return <div>Carregando post...</div>;
  }

  if (!post) {
    return <div>Post não encontrado</div>;
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
        <p className="forumTempo">Post feito em {new Date (post.created_at).toLocaleDateString("pt-BR")}</p>
      </div>

      <div className="respostas">
        <h2>Respostas</h2>
        {respostas.length === 0 ? (
          <p>Nenhuma resposta ainda. Seja o primeiro a responder!</p>
        ) : (
          respostas.map((res) => (
            <div key={res.id} className="respostaCard">
              <div className="forumUser">
                <div className="avatar"></div>
                <span className="nomeUsuario">{res.usuario}</span>
              </div>
              <p>{res.conteudo}</p>
              <span className="forumTempo">
                {new Date(res.created_at).toLocaleDateString("pt-BR")}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="areaComentario">
        <h2>Responder</h2>
        <form onSubmit={handleSubmit}>
          <textarea placeholder="Escreva sua resposta..." rows={4} value={novaResposta} onChange={(e) => setNovaResposta(e.target.value)}></textarea>
          <button type="submit" className="btnResponder">
            Enviar Resposta
          </button>
        </form>
      </div>
    </div>
  );
}