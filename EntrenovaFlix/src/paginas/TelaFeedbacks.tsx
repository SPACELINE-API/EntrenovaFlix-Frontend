import '../styles/feedbacks.css';
import { useEffect, useState } from 'react';
import { IoMdStopwatch } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import ticketService from '../services/ticketService';
import { RiQuestionAnswerLine } from "react-icons/ri";
import { AiOutlineSend } from "react-icons/ai";

interface Ticket {
    id?: number;
    titulo: string;
    descricao: string;
    categoria: string;
    status: string;
    criado_em?: string;
}

function TelaFeedbacks() {

    const [aberto, setAberto] = useState(false);

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("");

    const [feedbackEnviado, setFeedbackEnviado] = useState<Ticket | null>(null);

    const [carregandoEnvio, setCarregandoEnvio] = useState(false);
    const [carregandoTickets, setCarregandoTickets] = useState(true);

    const token = localStorage.getItem("access_token");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const confirmar = window.confirm(
            "Ao enviar este ticket, ele não poderá ser editado ou apagado.\nDeseja continuar?"
        );

        if (!confirmar) return;

        const dados = { titulo, categoria, descricao };

        setCarregandoEnvio(true);

        try {
            const resultado = await ticketService.criarTicket(dados);
            setFeedbackEnviado(resultado);
            setAberto(false);
        } catch (erro) {
            console.error("Erro ao enviar:", erro);
        }
        finally {
            setCarregandoEnvio(false);
        }

    };

    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        async function fetchTickets() {

            if (!token) return;

            try {
                setCarregandoTickets(true);
                const dados = await ticketService.listarTickets();
                setTickets(dados);
            } catch (erro) {
                console.error("Erro ao buscar tickets:", erro);
            }
            finally {
                setCarregandoTickets(false);
            }

        }

        fetchTickets();
    }, []);

    const categoriasFormatadas: Record<string, string> = {
        sugestao: "Sugestão",
        duvida: "Dúvida"
    };

    const formatarData = (data: string): string => {
        return new Date(data).toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (carregandoTickets) {
        return (
            <div className="container-feedback">
                <h1 className='titulo'>Tickets</h1>
                <p className="mensagem-carregamento">Carregando tickets...</p>
            </div>
        );
    }

    return (
        <div className='container-feedback'>
            <h1 className='titulo'>Tickets</h1>

            <button className='feedback-btn' onClick={() => setAberto(true)}>
                Novo ticket +
            </button>

            {aberto && (
                <div className='modal'>
                    <form className="feedback-forms" onSubmit={handleSubmit}>
                        <div className='modal-topo'>
                            <h3>Novo feedback</h3>
                            <button className='fechar-btn' type="button" onClick={() => setAberto(false)}>
                                <AiOutlineClose className='fechar-btn-icone' />
                            </button>
                        </div>

                        <div className='modal-conteudo'>
                            <div className='modal-titulo-categoria'>
                                <label>
                                    Título
                                    <input className='titulo-input' type="text" placeholder='Escreva o assunto do seu ticket.' onChange={(e) => setTitulo(e.target.value)} required maxLength={150} />
                                </label>
                                <label>
                                    Categoria
                                    <select className='categoria-input'
                                        value={categoria}
                                        onChange={(e) => setCategoria(e.target.value)} required>
                                        <option className='categoria-input' value="">Selecione uma opção</option>
                                        <option className='categoria-input' value="sugestao">Sugestão</option>
                                        <option className='categoria-input' value="duvida">Dúvida</option>
                                    </select>
                                </label>
                            </div>

                            <label>
                                Descrição
                                <textarea className='descricao-input' placeholder='Escreva uma sugestão ou dúvida para o gerente de RH.' onChange={(e) => setDescricao(e.target.value)} required maxLength={400} />
                            </label>

                            <input className='feedback-btn' type="submit" value={carregandoEnvio ? "Enviando..." : "Enviar"} disabled={carregandoEnvio} />
                        </div>
                    </form>
                </div>
            )}

            <div className="container-tickets">

                {tickets.filter(t => t.status === "pendente").length === 0 ? (
                    <div className="container-tickets-abertos">
                        <h2 className='subtitulo'>
                            Abertos <IoMdStopwatch className='card-ticket-icone' />
                        </h2>
                        <p className='card-ticket-descricao'>Nenhum ticket foi enviado.</p>
                    </div>
                ) : (
                    <div className="container-tickets-abertos">
                        <h2 className='subtitulo'>
                            Abertos <IoMdStopwatch className='card-ticket-icone' />
                        </h2>

                        {tickets
                            .filter(t => t.status === "pendente")
                            .map(t => (
                                <div className='card-ticket' key={t.id}>
                                    <div className='card-ticket-dados'>
                                        <h3 className='card-ticket-titulo'>{t.titulo}</h3>
                                        <h3 className='card-ticket-dado'>{categoriasFormatadas[t.categoria] || t.categoria}</h3>
                                    </div>
                                    <p className='card-ticket-descricao'>{t.descricao}</p>
                                    <p className='card-ticket-data-criacao'>Enviado em: {formatarData(t.criado_em!)}</p>
                                </div>
                            ))}
                    </div>
                )}

                {tickets.filter(t => t.status !== "pendente").length === 0 ? (
                    <div className="container-tickets">
                        <h2 className='subtitulo'>
                            Encerrados <IoCheckmarkDoneOutline className='card-ticket-icone' />
                        </h2>
                        <p className='card-ticket-descricao'>Nenhum ticket foi respondido.</p>
                    </div>
                ) : (
                    <div className="container-tickets">
                        <h2 className='subtitulo'>
                            Encerrados <IoCheckmarkDoneOutline className='card-ticket-icone' />
                        </h2>

                        {tickets
                            .filter(t => t.status !== "pendente")
                            .map(t => (
                                <div className='card-ticket-resposta' key={t.id}>
                                    <div className='card-ticket-dados'>
                                        <h3 className='card-ticket-titulo'><AiOutlineSend className='card-ticket-icone' />{t.titulo}</h3>
                                        <h3 className='card-ticket-dado'>{categoriasFormatadas[t.categoria] || t.categoria}</h3>
                                    </div>
                                    <p className='card-ticket-descricao'>{t.descricao}</p>
                                    <p className='card-ticket-data-criacao'>Enviado em: {formatarData(t.criado_em!)}</p>
                                    <div className='linha'></div>
                                    <h3 className='card-ticket-titulo-resposta'><RiQuestionAnswerLine className='card-ticket-icone' />Resposta do RH</h3>
                                    <p className='card-ticket-descricao'>Olá Vinicius, tudo bem? Alteramos o seu nível de permissão, verifique se dessa forma consegue
                                        acessar o módulo. Aguardo seu retorno!
                                    </p>
                                    <p className='card-ticket-data-criacao'>Respondido em: {formatarData(t.criado_em!)}</p>
                                </div>
                            ))}
                    </div>
                )}

            </div>

        </div>
    );
}

export default TelaFeedbacks;