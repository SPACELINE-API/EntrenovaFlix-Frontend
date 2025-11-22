import { useState, useEffect, useMemo } from 'react';
import { Box, Button, Group, Title, Text, Modal, Textarea, Badge, Card, Avatar, Divider, ScrollArea, ThemeIcon, LoadingOverlay, Pagination, SegmentedControl, TextInput } from '@mantine/core';
import { IoMdStopwatch } from "react-icons/io";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { RiQuestionAnswerLine } from "react-icons/ri";
import ticketService from '../services/ticketService';
import { IconTrash } from '@tabler/icons-react';
import '../styles/feedbacks.css';

interface Ticket {
  id: number;
  titulo: string;
  descricao: string;
  categoria: 'sugestao' | 'duvida' | 'problema';
  status: 'aberto' | 'encerrado';
  criado_em: string;
}

const TicketCard = ({ ticket, onClick, onDelete }: { ticket: Ticket; onClick: () => void; onDelete: (ticket: Ticket) => void }) => {
  const isAberto = ticket.status === 'aberto';
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      onClick={onClick}
      style={{
        cursor: 'pointer',
        backgroundColor: '#1A1A1A',
        borderColor: isAberto ? '#3b5bdb' : '#2f2f2f',
        transition: 'transform 0.2s ease',
        justify: 'relative'
      }}
    >
      <Group justify="space-between" mb="xs" align="flex-start">
        <Group gap="xs" style={{ maxWidth: '80%' }}>
          <Avatar color={isAberto ? "blue" : "gray"} size="sm" radius="xl">
            {ticket.titulo.charAt(0).toUpperCase()}
          </Avatar>
          <Box style={{ overflow: 'hidden' }}>
            <Text fw={600} size="sm" c="white" truncate>
              {ticket.titulo}
            </Text>
            <Text size="xs" c="dimmed" truncate>
              {ticket.categoria === 'sugestao' ? 'Sugestão' : 'Dúvida'}
            </Text>
          </Box>
        </Group>

        <Button variant="subtle" color="red" size="xs" onClick={(e) => { e.stopPropagation(); onDelete(ticket); }}>
          <IconTrash size={16} />
        </Button>
      </Group>

      <Text size="sm" c="white" lineClamp={2} mb={4}>{ticket.descricao}</Text>
      <Divider my="xs" color="#373A40" />
      <Text size="xs" c="dimmed">Enviado em: {new Date(ticket.criado_em).toLocaleString('pt-BR')}</Text>
      <Badge color={isAberto ? 'green' : 'gray'} variant="light" size="sm" mt="xs">{ticket.status === 'aberto' ? 'Aberto' : 'Encerrado'}</Badge>
    </Card>
  );
};

export default function TelaFeedbacksRefatorado() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [abertoModal, setAbertoModal] = useState(false);
  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket | null>(null);
  const [ticketParaExcluir, setTicketParaExcluir] = useState<Ticket | null>(null);
  const [formResposta, setFormResposta] = useState("");
  const [enviandoResposta, setEnviandoResposta] = useState(false);
  const [excluindoTicket, setExcluindoTicket] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [carregandoEnvio, setCarregandoEnvio] = useState(false);
  const [busca, setBusca] = useState("");
  const [pageAbertos, setPageAbertos] = useState(1);
  const [pageEncerrados, setPageEncerrados] = useState(1);
  const ITEMS_PER_PAGE = 8;

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const dados = await ticketService.listarTickets();
      setTickets(Array.isArray(dados) ? dados : []);
    } catch (erro) {
      console.error("Erro ao buscar tickets:", erro);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleAbrirTicket = (ticket: Ticket) => { setTicketSelecionado(ticket); setAbertoModal(true); };

  const handleExcluirTicket = async () => {
    if (!ticketParaExcluir) return;
    setExcluindoTicket(true);
    try {
      await ticketService.excluirTicket(ticketParaExcluir.id);
      setTickets(tickets.filter(t => t.id !== ticketParaExcluir.id));
      setTicketParaExcluir(null);
    } catch {
      alert("Erro ao excluir ticket");
    } finally { setExcluindoTicket(false); }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titulo || !descricao || !categoria) return;
    setCarregandoEnvio(true);
    try {
      const novoTicket = await ticketService.criarTicket({ titulo, descricao, categoria });
      setTickets([novoTicket, ...tickets]);
      setAbertoModal(false);
      setTitulo(""); setDescricao(""); setCategoria("");
    } catch (erro) {
      console.error("Erro ao enviar ticket:", erro);
    } finally { setCarregandoEnvio(false); }
  };

  const ticketsFiltrados = useMemo(() => {
    let lista = [...tickets];
    if (busca.trim()) {
      const termo = busca.toLowerCase();
      lista = lista.filter(t => t.titulo.toLowerCase().includes(termo) || t.descricao.toLowerCase().includes(termo));
    }
    return lista;
  }, [tickets, busca]);

  const abertos = ticketsFiltrados.filter(t => t.status === 'aberto');
  const encerrados = ticketsFiltrados.filter(t => t.status !== 'aberto');

  const paginatedAbertos = abertos.slice((pageAbertos-1)*ITEMS_PER_PAGE, pageAbertos*ITEMS_PER_PAGE);
  const paginatedEncerrados = encerrados.slice((pageEncerrados-1)*ITEMS_PER_PAGE, pageEncerrados*ITEMS_PER_PAGE);

  return (
    <Box p="lg" style={{ backgroundColor: '#171717', minHeight: '100vh', borderRadius: '8px' }}>
      <LoadingOverlay visible={loading} overlayProps={{ blur: 2 }} />
      <Group justify="space-between" mb="md">
        <Title order={2} c="white">Tickets</Title>
        <Button onClick={() => setAbertoModal(true)}>Novo Ticket +</Button>
      </Group>

      <TextInput placeholder="Buscar..." value={busca} onChange={(e) => setBusca(e.currentTarget.value)} mb="md" styles={{ input: { backgroundColor: '#1A1A1A', color: 'white' } }} />

      <Group gap="lg" style={{ alignItems: 'flex-start' }}>
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Group mb="xs"><IoMdStopwatch color="#4cafff" size={24}/><Text c="white" fw={700}>Abertos ({abertos.length})</Text></Group>
          <ScrollArea style={{ flex: 1, maxHeight: '70vh', backgroundColor:'#1A1A1A', padding:'8px', borderRadius:'8px' }}>
            {paginatedAbertos.length === 0 ? <Text c="dimmed" ta="center">Nenhum ticket aberto.</Text> :
              paginatedAbertos.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} onClick={() => handleAbrirTicket(ticket)} onDelete={setTicketParaExcluir} />
              ))}
          </ScrollArea>
          {Math.ceil(abertos.length/ITEMS_PER_PAGE) > 1 && 
            <Pagination total={Math.ceil(abertos.length/ITEMS_PER_PAGE)} value={pageAbertos} onChange={setPageAbertos} size="sm" mt="sm"/>
          }
        </Box>

        {/* Encerrados */}
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Group mb="xs"><IoCheckmarkDoneOutline color="#4cafff" size={24}/><Text c="dimmed" fw={700}>Encerrados ({encerrados.length})</Text></Group>
          <ScrollArea style={{ flex: 1, maxHeight: '70vh', backgroundColor:'#1A1A1A', padding:'8px', borderRadius:'8px' }}>
            {paginatedEncerrados.length === 0 ? <Text c="dimmed" ta="center">Nenhum ticket encerrado.</Text> :
              paginatedEncerrados.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} onClick={() => handleAbrirTicket(ticket)} onDelete={setTicketParaExcluir} />
              ))}
          </ScrollArea>
          {Math.ceil(encerrados.length/ITEMS_PER_PAGE) > 1 && 
            <Pagination total={Math.ceil(encerrados.length/ITEMS_PER_PAGE)} value={pageEncerrados} onChange={setPageEncerrados} size="sm" mt="sm"/>
          }
        </Box>
      </Group>

      {/* Modal para criar / responder ticket */}
      <Modal className='modal-custom' opened={abertoModal} onClose={() => setAbertoModal(false)} title={ticketSelecionado ? `Ticket: ${ticketSelecionado.titulo}` : "Novo Ticket"} size="lg" overlayProps={{ blur: 3, opacity:0.5 }}>
        {!ticketSelecionado ? (
          <form onSubmit={handleSubmit}>
            <Textarea label="Título" required mb="sm" value={titulo} onChange={(e)=>setTitulo(e.currentTarget.value)} />
            <Textarea label="Descrição" required mb="sm" value={descricao} onChange={(e)=>setDescricao(e.currentTarget.value)} minRows={4}/>
            <SegmentedControl value={categoria} onChange={setCategoria} data={[{label:'Sugestão', value:'sugestao'},{label:'Dúvida', value:'duvida'}, {label: 'Problema', value: 'problema'}]} mb="sm"/>
            <Group justify="right">
              <Button type="submit" loading={carregandoEnvio}>Enviar</Button>
            </Group>
          </form>
        ) : (
          <>
            <Text c="dimmed">{ticketSelecionado.descricao}</Text>
            <Textarea label="Responder" placeholder="Digite sua resposta" value={formResposta} onChange={(e)=>setFormResposta(e.currentTarget.value)} minRows={3} mt="sm"/>
            <Group justify="right" mt="sm">
              <Button onClick={() => setAbertoModal(false)}>Cancelar</Button>
              <Button onClick={async ()=>{
                setEnviandoResposta(true);
                try { await ticketService.responderTicket(ticketSelecionado.id, formResposta); await fetchTickets(); setAbertoModal(false); } 
                catch { alert("Erro ao enviar"); } 
                finally { setEnviandoResposta(false); }
              }} loading={enviandoResposta}>Responder</Button>
            </Group>
          </>
        )}
      </Modal>

      {/* Modal de exclusão */}
      <Modal opened={!!ticketParaExcluir} onClose={()=>setTicketParaExcluir(null)} title="Excluir Ticket" size="sm" overlayProps={{ blur: 3, opacity:0.5 }}>
        <Text mb="md">Tem certeza que deseja excluir "{ticketParaExcluir?.titulo}"?</Text>
        <Group justify="right">
          <Button variant="default" onClick={()=>setTicketParaExcluir(null)}>Cancelar</Button>
          <Button color="red" onClick={handleExcluirTicket} loading={excluindoTicket}>Excluir</Button>
        </Group>
      </Modal>
    </Box>
  );
}
