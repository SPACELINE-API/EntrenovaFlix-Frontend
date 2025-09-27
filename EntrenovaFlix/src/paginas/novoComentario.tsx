import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabaseClient';
import {useEffect, useState} from 'react';

export default function NovoComentario() {
  const navigate = useNavigate();
  const [pergunta, setPergunta] = useState("");
  const [descricao, setDescricao] = useState("");
  const [usuario, setUsuario] = useState<string | null>(null);

  useEffect(() => { 
    const fetchUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.error("Erro ao pegar sessão:", error);

      if (session?.user) {
        setUsuario(session.user.email || "Anônimo");
        console.log("Usuário logado no fetchUser:", session.user.email);
      } else {
        console.log("Nenhum usuário logado no fetchUser");
      }
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUsuario(session.user.email ?? null);
        console.log("Usuário logado no onAuthStateChange:", session.user.email);
      } else {
        setUsuario(null);
        console.log("Usuário deslogado");
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Tentando publicar:", { pergunta, descricao, usuario });

    const autor = usuario || "Teste";

    const { data, error } = await supabase
      .from("posts")
      .insert([{ usuario: autor, pergunta, descricao }]);

    if (error) {
      console.error("Erro ao publicar:", error);
      alert("Erro ao publicar: " + error.message);
    } else {
      console.log("Comentário publicado:", data);
      navigate("/colaboradores/forum");
    }
  };

  return (
    <div className="telaNovoComentario">
      <h1>Escrever novo comentário</h1>
      <div id='formu'>
        <form onSubmit={handleSubmit}>
          <div className="comment-info">
            <div className="avatar"></div>
            <span>Por: {usuario}</span>
          </div>
          <label>Use o fórum para manter uma boa interação com a sua equipe!</label>
          <div>
            <input type="text" id="pergunta" placeholder='Título do seu comentário' value={pergunta} onChange={(e) => setPergunta(e.target.value)} required />
          </div>
          <div>
            <textarea id="descricao" name="descricao" rows={5} placeholder='Escreva sua dúvida, comentário ou observação' value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>
          <button type="submit">Publicar</button>
        </form>
      </div>
    </div>
  );
}