import { useState } from "react";

interface Comentario {
  id: number;
  usuario: { nome: string };
  conteudo: string;
  tempo: string;
  replies: Comentario[];
}

export default function CommentForm({
  comentario,
  level,
  onReply,
}: {
  comentario: Comentario;
  level: number;
  onReply: (id: number, conteudo: string) => void;
}) {
  const [openReply, setOpenReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleEnviar = () => {
    if (!replyText.trim()) return;
    onReply(comentario.id, replyText); 
    setReplyText("");
    setOpenReply(false);
  };

  return (
    <div style={{ marginLeft: level * 25 }}>
      <div className="comentarioCard">
        <div className="comentarioUser">
          <div className="avatarSmall" />
          <span className="nomeUsuario">{comentario.usuario.nome}</span>
          <span className="comentarioTempo">{comentario.tempo}</span>
        </div>

        <p className="comentarioConteudo">{comentario.conteudo}</p>

        <button
          className="btnResponderComentario"
          onClick={() => setOpenReply(!openReply)}
        >
          ↪ responder
        </button>

        {openReply && (
          <div className="replyForm">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Escreva sua resposta..."
            />
            <button onClick={handleEnviar}>Enviar</button>
          </div>
        )}
      </div>

      {comentario.replies.map((reply) => (
        <CommentForm
          key={reply.id}
          comentario={reply}
          level={level + 1}
          onReply={onReply}
        />
      ))}
    </div>
  );
}
