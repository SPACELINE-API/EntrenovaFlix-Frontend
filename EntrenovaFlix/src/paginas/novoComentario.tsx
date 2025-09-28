  import { useNavigate } from 'react-router-dom';
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { useEffect, useState } from 'react';
  import * as z from 'zod';
  import forumService from '../services/forumService';

  const newPostSchema = z.object({
    pergunta: z.string().min(3, "O título deve ter pelo menos 10 caracteres."),
    descricao: z.string().min(3, "A descrição deve ter pelo menos 20 caracteres."),
  });

  type NewPostFormData = z.infer<typeof newPostSchema>;

  export default function NovoComentario() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<NewPostFormData>({
      resolver: zodResolver(newPostSchema),
    });
    const [userName, setUserName] = useState("Carregando..."); 

    useEffect(() => {
      setUserName("Usuário Logado"); 
    }, []);

    const handleCreatePost = async (data: NewPostFormData) => {
      try {
        await forumService.createPost(data);
        reset(); 
        navigate("/colaboradores/forum"); 
      } catch (error: any) {
        console.error("Erro ao criar post:", error.response?.data || error.message);
        alert("Falha ao publicar o post. Verifique os dados e tente novamente.");
      }
    };

    return (
      <div className="telaNovoComentario">
        <h1>Escrever novo comentário</h1>
        <div id='formu'>
          <form onSubmit={handleSubmit(handleCreatePost)}>
            <div className="comment-info">
              <div className="avatar"></div>
              <span>Por: </span>
              <span className="comment-author-name">{userName}</span>
            </div>
            <label>Use o fórum para manter uma boa interação com a sua equipe!</label>
            
            <div>
              <input 
                type="text" 
                id="pergunta" 
                placeholder='Título do seu comentário' 
                {...register("pergunta")} 
              />
              {errors.pergunta && <p className='error-message'>{errors.pergunta.message}</p>}
            </div>
            
            <div>
              <textarea 
                id="descricao" 
                rows={5} 
                placeholder='Escreva sua dúvida, comentário ou observação' 
                {...register("descricao")} 
              />
              {errors.descricao && <p className='error-message'>{errors.descricao.message}</p>}
            </div>
            
            <button type="submit">Publicar</button>
          </form>
        </div>
      </div>
    );
  }