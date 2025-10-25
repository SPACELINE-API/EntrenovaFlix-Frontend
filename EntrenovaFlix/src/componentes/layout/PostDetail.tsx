import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/apiService";

type Post = {
    id: string;
    usuario: { id: number; nome: string; email: string; };
    pergunta: string;
    descricao: string;
    tempo?: string;
};

type Resposta = {
    id: string;
    usuario: { id: number; nome: string; email: string; };
    comentario: string; 
    tempo?: string;
};

export default function PostDetail() {
    const { id } = useParams<{ id: string }>(); 
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);
    const [respostas, setRespostas] = useState<Resposta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [novaResposta, setNovaResposta] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postRes = await api.get<Post>(`posts/${id}`);
                setPost(postRes.data);
                const respostasRes = await api.get<Resposta[]>(`posts/${id}/respostas`);
                setRespostas(respostasRes.data);

            } catch (err: any) {
                console.error(err);
                setError("Erro ao carregar detalhes do post.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleSubmitResposta = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!novaResposta.trim()) return;

        try {
            alert("Resposta enviada com sucesso!");
            setNovaResposta(""); 
        } catch (err) {
            alert("Erro ao enviar a resposta.");
        }
    };

    if (loading) return <div className="postDetailContainer">Carregando publicação...</div>;
    if (error) return <div className="postDetailContainer">Erro: {error}</div>;
    if (!post) return <div className="postDetailContainer">Publicação não encontrada.</div>;

    return (
        <div className="postDetailContainer">
            <button 
                className="btnVoltar" 
                onClick={() => navigate(-1)}
                style={{marginBottom: '20px', backgroundColor: 'transparent', color: '#9B93F5'}}
            >
                {"< Voltar para o Fórum"}
            </button>

            <div className="mainPostCard">
                <div className="forumUser">
                    <div className="avatar"></div>
                    <span className="nomeUsuario">{post.usuario.nome}</span>
                </div>
                <h2>{post.pergunta}</h2>
                <p>{post.descricao}</p>
                <p className="forumTempo">Post feito {post.tempo ?? ""}</p>
            </div>

            <form className="replyForm" onSubmit={handleSubmitResposta}>
                <h3>Deixe sua resposta</h3>
                <textarea 
                    placeholder="Digite sua resposta aqui..." 
                    rows={4} 
                    value={novaResposta}
                    onChange={(e) => setNovaResposta(e.target.value)}
                />
                <button type="submit" className="btnResponder">
                    Enviar Resposta
                </button>
            </form>
            
            <div className="repliesSection">
                <h3>Respostas ({respostas.length})</h3>
                {respostas.map((resposta) => (
                    <div key={resposta.id} className="replyCard">
                        <div className="forumUser">
                            <div className="avatar"></div>
                            <span className="nomeUsuario">{resposta.usuario.nome}</span>
                        </div>
                        <p>{resposta.comentario}</p>
                        <p className="forumTempo">Respondeu {resposta.tempo ?? ""}</p>
                    </div>
                ))}
                {respostas.length === 0 && <p style={{color: '#C2C2C2'}}>Nenhuma resposta ainda. Seja o primeiro!</p>}
            </div>
        </div>
    );
}