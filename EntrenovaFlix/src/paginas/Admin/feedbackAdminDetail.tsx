import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ticket, TicketMessage, getTicketById, postTicketReply, closeTicket } from '../../services/ticketServiceMock';
import '../../styles/feedbackAdminDetail.css';

function FeedbackAdminDetail() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadTicket = async () => {
    if (!ticketId) return;
    try {
      setLoading(true);
      const data = await getTicketById(Number(ticketId));
      setTicket(data);
      setError(null);
    } catch (err) {
      setError('Falha ao buscar o ticket.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicket();
  }, [ticketId]);

  const handleReplySubmit = async () => {
    if (!replyMessage.trim() || !ticket) return;

    setIsSubmitting(true);
    try {
      await postTicketReply(ticket.id, replyMessage);
      setReplyMessage('');
      await loadTicket();
    } catch (err) {
      setError('Falha ao enviar resposta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseTicket = async () => {
    if (!ticket) return;
    
    setIsSubmitting(true);
    try {
      await closeTicket(ticket.id);
      await loadTicket();
    } catch (err) {
      setError('Falha ao fechar o ticket.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="detail-container">Carregando ticket...</div>;
  if (error) return <div className="detail-container detail-error">{error}</div>;
  if (!ticket) return <div className="detail-container">Ticket não encontrado.</div>;

  const isTicketOpen = ticket.status === 'Aberto' || ticket.status === 'Pendente';

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/admin/tickets')} className="detail-back-button">
        &larr; Voltar para a lista
      </button>

      <div className="detail-header">
        <h2>{ticket.assunto} (Ticket #{ticket.id})</h2>
        <div className="detail-info">
          <span className={`detail-status status-${ticket.status.toLowerCase()}`}>
            {ticket.status}
          </span>
          <span>Criado por: {ticket.criadoPor.nome}</span>
          <span>Data: {new Date(ticket.data).toLocaleString('pt-BR')}</span>
        </div>
      </div>

      <div className="detail-messages">
        {ticket.mensagens.map((msg) => (
          <div key={msg.id} className={`message-bubble ${msg.user.role === 'admin' ? 'admin-msg' : 'rh-msg'}`}>
            <div className="message-sender">
              {msg.user.nome} ({msg.user.role})
            </div>
            <div className="message-content">
              {msg.mensagem}
            </div>
            <div className="message-timestamp">
              {new Date(msg.timestamp).toLocaleString('pt-BR')}
            </div>
          </div>
        ))}
      </div>

      {isTicketOpen ? (
        <div className="detail-reply-area">
          <h3>Responder Ticket</h3>
          <textarea
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
            placeholder="Digite sua resposta de admin aqui..."
            rows={5}
            disabled={isSubmitting}
          />
          <div className="detail-actions">
            <button 
              onClick={handleReplySubmit} 
              disabled={isSubmitting || !replyMessage.trim()}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Resposta'}
            </button>
            <button 
              onClick={handleCloseTicket} 
              disabled={isSubmitting}
              className="close-ticket-btn"
            >
              {isSubmitting ? 'Fechando...' : 'Fechar Ticket'}
            </button>
          </div>
        </div>
      ) : (
        <div className="detail-closed-notice">
          <h3>Ticket Fechado</h3>
          <p>Este ticket foi fechado e não pode mais ser respondido.</p>
        </div>
      )}
    </div>
  );
}

export default FeedbackAdminDetail;