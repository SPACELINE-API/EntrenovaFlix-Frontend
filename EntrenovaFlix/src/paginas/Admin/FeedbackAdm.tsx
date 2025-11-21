import { useState, useEffect, useMemo } from 'react';
import { Box, Button, Group, Title, Text, Modal, Textarea, Badge, Card, Avatar, Divider, SimpleGrid, ScrollArea, ThemeIcon, LoadingOverlay, SegmentedControl, ActionIcon, TextInput, Pagination } from '@mantine/core';
import { IconMessageReply, IconCheck, IconClock, IconTrash, IconSearch, IconSortDescending, IconSortAscending} from '@tabler/icons-react';
import api from '../../services/apiService'; 
import "../../styles/tickets.css"; 

interface Mensagem {
  id: number;
  autor_nome: string;
  texto: string;
  created_at: string;
}

interface Ticket {
  id: number;
  assunto: string;
  autor_nome: string;
  empresa_nome: string;
  status: 'Aberto' | 'Fechado';
  created_at: string;
  mensagens: Mensagem[]; 
}

const TicketCard = ({ 
  ticket, 
  onClick, 
  onDelete 
}: { 
  ticket: Ticket; 
  onClick: () => void; 
  onDelete: (ticket: Ticket) => void; 
}) => {
  const isAberto = ticket.status === 'Aberto';
  
  const ultimaMsg = ticket.mensagens && ticket.mensagens.length > 0 
    ? ticket.mensagens[ticket.mensagens.length - 1].texto 
    : "Sem mensagens";

  return (
    <Card 
      shadow="sm" 
      padding="sm" 
      radius="md" 
      withBorder 
      onClick={onClick}
      style={{ 
        cursor: 'pointer', 
        backgroundColor: '#2C2E33', 
        borderColor: isAberto ? '#3b5bdb' : '#2f2f2f',
        transition: 'transform 0.2s ease',
        position: 'relative'
      }}
      className="kanban-card-hover"
    >
      <Group justify="space-between" mb="xs" align="flex-start">
        <Group gap="xs" style={{ maxWidth: '80%' }}>
          <Avatar color={isAberto ? "blue" : "gray"} size="sm" radius="xl">
            {ticket.autor_nome ? ticket.autor_nome.charAt(0).toUpperCase() : "U"}
          </Avatar>
          <Box style={{ overflow: 'hidden' }}>
            <Text fw={600} size="sm" c="white" truncate>
              {ticket.autor_nome}
            </Text>
            <Text size="xs" c="dimmed" truncate>
              {ticket.empresa_nome}
            </Text>
          </Box>
        </Group>

        <ActionIcon 
          color="red" 
          variant="subtle" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(ticket);
          }}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Group>

      <Text fw={700} size="sm" c="white" lineClamp={1} mb={4}>
        {ticket.assunto}
      </Text>
      
      <Text size="xs" c="dimmed" lineClamp={2} style={{ minHeight: '32px', lineHeight: '1.4' }}>
        {ultimaMsg}
      </Text>

      <Divider my="xs" color="#373A40" />

      <Group justify="space-between" align="center">
        <Group gap={5}>
          <IconMessageReply size={14} color="#909296" />
          <Text size="xs" c="dimmed">{ticket.mensagens?.length || 0}</Text>
          <Text size="xs" c="dimmed" ml="xs">
            • {new Date(ticket.created_at).toLocaleDateString('pt-BR')}
          </Text>
        </Group>
        
        <Badge color={isAberto ? "green" : "gray"} variant="light" size="sm">
          {ticket.status}
        </Badge>
      </Group>
    </Card>
  );
};

function FeedbackAdm() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroOrigem, setFiltroOrigem] = useState('todos');
  const [busca, setBusca] = useState('');
  const [ordemRecente, setOrdemRecente] = useState(true);
  const [pageAbertos, setPageAbertos] = useState(1);
  const [pageFechados, setPageFechados] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [modalRespostaAberto, setModalRespostaAberto] = useState(false);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket | null>(null);
  const [ticketParaExcluir, setTicketParaExcluir] = useState<Ticket | null>(null);
  const [formResposta, setFormResposta] = useState("");
  const [enviandoResposta, setEnviandoResposta] = useState(false);
  const [excluindoTicket, setExcluindoTicket] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tickets/admin/list/');
      setTickets(response.data);
    } catch {
      console.error("Erro ao buscar tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    setPageAbertos(1);
    setPageFechados(1);
  }, [filtroOrigem, busca, ordemRecente]);

  const ticketsProcessados = useMemo(() => {
    let lista = [...tickets];

    if (filtroOrigem !== 'todos') {
      lista = lista.filter(ticket => {
        const termo = "encaminhado";
        const assuntoLower = ticket.assunto.toLowerCase();
        const corpoLower = ticket.mensagens[0]?.texto.toLowerCase() || "";
        const ehEncaminhado = assuntoLower.includes(termo) || corpoLower.includes(termo);
        return filtroOrigem === 'encaminhado' ? ehEncaminhado : !ehEncaminhado;
      });
    }

    if (busca.trim()) {
      const termo = busca.toLowerCase();
      lista = lista.filter(t => 
        t.assunto.toLowerCase().includes(termo) ||
        t.autor_nome.toLowerCase().includes(termo) ||
        t.empresa_nome.toLowerCase().includes(termo)
      );
    }

    lista.sort((a, b) => {
      const dataA = new Date(a.created_at).getTime();
      const dataB = new Date(b.created_at).getTime();
      return ordemRecente ? dataB - dataA : dataA - dataB;
    });

    return lista;
  }, [tickets, filtroOrigem, busca, ordemRecente]);

  const todosAbertos = ticketsProcessados.filter(t => t.status === 'Aberto');
  const todosFechados = ticketsProcessados.filter(t => t.status === 'Fechado');

  const totalPagesAbertos = Math.ceil(todosAbertos.length / ITEMS_PER_PAGE);
  const paginatedAbertos = todosAbertos.slice(
    (pageAbertos - 1) * ITEMS_PER_PAGE,
    pageAbertos * ITEMS_PER_PAGE
  );

  const totalPagesFechados = Math.ceil(todosFechados.length / ITEMS_PER_PAGE);
  const paginatedFechados = todosFechados.slice(
    (pageFechados - 1) * ITEMS_PER_PAGE,
    pageFechados * ITEMS_PER_PAGE
  );

  const handleAbrirTicket = (ticket: Ticket) => {
    setTicketSelecionado(ticket);
    setFormResposta("");
    setModalRespostaAberto(true);
  };

  const confirmarExclusao = (ticket: Ticket) => {
    setTicketParaExcluir(ticket);
    setModalExclusaoAberto(true);
  };

  const handleExcluirTicket = async () => {
    if (!ticketParaExcluir) return;
    setExcluindoTicket(true);
    try {
      await api.delete(`/tickets/admin/${ticketParaExcluir.id}/`);
      setTickets(tickets.filter(t => t.id !== ticketParaExcluir.id));
      setModalExclusaoAberto(false);
      setTicketParaExcluir(null);
    } catch {
      alert("Erro ao excluir.");
    } finally {
      setExcluindoTicket(false);
    }
  };

  const handleResponder = async () => {
    if (!ticketSelecionado || !formResposta) return;
    setEnviandoResposta(true);
    try {
      await api.post(`/tickets/admin/${ticketSelecionado.id}/`, { texto: formResposta });
      await fetchTickets();
      setModalRespostaAberto(false);
    } catch {
      alert("Erro ao enviar.");
    } finally {
      setEnviandoResposta(false);
    }
  };

  return (
    <Box className="funcionarios-container1">
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />

      <Box p="lg" style={{ borderBottom: '1px solid #2C2E33' }}>
        <Group justify="space-between" align="center" mb="md">
          <Box>
            <Title order={2} style={{ color: 'white' }}>Gestão de Tickets</Title>
            <Text c="dimmed" size="sm">Solicitações de suporte das empresas.</Text>
          </Box>
          
          <Group>
            <ActionIcon 
              variant="default" 
              size="lg" 
              onClick={() => setOrdemRecente(!ordemRecente)}
              title={ordemRecente ? "Mais recentes primeiro" : "Mais antigos primeiro"}
            >
              {ordemRecente ? <IconSortDescending size={20} /> : <IconSortAscending size={20} />}
            </ActionIcon>

            <Button variant="outline" onClick={fetchTickets} color="gray">Atualizar</Button>
          </Group>
        </Group>

        <Group grow>
          <TextInput 
            placeholder="Buscar por assunto, autor ou empresa..." 
            leftSection={<IconSearch size={16} />}
            value={busca}
            onChange={(e) => setBusca(e.currentTarget.value)}
            styles={{ input: { backgroundColor: '#1A1B1E', borderColor: '#373A40', color: 'white' } }}
          />
           
          <SegmentedControl
            value={filtroOrigem}
            onChange={setFiltroOrigem}
            data={[
              { label: 'Todos', value: 'todos' },
              { label: 'RH Interno', value: 'rh' },
              { label: 'Encaminhados', value: 'encaminhado' },
            ]}
            styles={{ root: { backgroundColor: '#1A1B1E' }, label: { color: '#C1C2C5' }, indicator: { backgroundColor: '#3b5bdb' } }}
          />
        </Group>
      </Box>

      <SimpleGrid cols={2} spacing="lg" p="lg" style={{ height: 'calc(100vh - 220px)' }}>
        
        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: '10px'}}>
          <Group mb="md" px="xs" justify="space-between">
            <Group>
              <ThemeIcon color="blue" variant="light" radius="md" size="lg"><IconClock size={20} /></ThemeIcon>
              <Text fw={700} c="white">Pendentes ({todosAbertos.length})</Text>
            </Group>
          </Group>
          
          <ScrollArea style={{ flex: 1, backgroundColor: '#1A1B1E', borderRadius: '8px' }} p="md" type="never">
            {paginatedAbertos.length === 0 ? (
              <Text c="dimmed" ta="center" mt="xl">Nenhum ticket pendente.</Text>
            ) : (
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {paginatedAbertos.map(ticket => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    onClick={() => handleAbrirTicket(ticket)}
                    onDelete={confirmarExclusao}
                  />
                ))}
              </Box>
            )}
          </ScrollArea>

          {totalPagesAbertos > 1 && (
            <Group justify="center" mt="md">
              <Pagination 
                total={totalPagesAbertos} 
                value={pageAbertos} 
                onChange={setPageAbertos} 
                size="sm"
                radius="md"
              />
            </Group>
          )}
        </Box>

        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Group mb="md" px="xs">
            <ThemeIcon color="gray" variant="light" radius="md" size="lg"><IconCheck size={20} /></ThemeIcon>
            <Text fw={700} c="dimmed">Resolvidos ({todosFechados.length})</Text>
          </Group>
          
          <ScrollArea style={{ flex: 1, backgroundColor: '#1A1B1E', borderRadius: '8px', marginBottom:'10px'}} p="md" type="never">
            {paginatedFechados.length === 0 ? (
              <Text c="dimmed" ta="center" mt="xl">Nenhum ticket resolvido.</Text>
            ) : (
              <Box style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {paginatedFechados.map(ticket => (
                  <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    onClick={() => handleAbrirTicket(ticket)}
                    onDelete={confirmarExclusao}
                  />
                ))}
              </Box>
            )}
          </ScrollArea>

          {totalPagesFechados > 1 && (
            <Group justify="center" mt="md">
              <Pagination 
                total={totalPagesFechados} 
                value={pageFechados} 
                onChange={setPageFechados} 
                size="sm"
                color="gray"
                radius="md"
              />
            </Group>
          )}
        </Box>

      </SimpleGrid>

      <Modal 
        opened={modalRespostaAberto} 
        onClose={() => setModalRespostaAberto(false)} 
        title={
          <Group gap="xs">
            <Badge color={ticketSelecionado?.status === 'Aberto' ? 'blue' : 'gray'}>
              {ticketSelecionado?.status.toUpperCase()}
            </Badge>
            <Text size="lg" fw={700}>{ticketSelecionado?.assunto}</Text>
          </Group>
        }
        className="modal-custom" 
        size="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Box p="md">
          <Box mb="md" style={{ maxHeight: '350px', overflowY: 'auto', backgroundColor: '#141517', padding: '16px', borderRadius: '8px', border: '1px solid #2C2E33' }}>
            {ticketSelecionado?.mensagens && ticketSelecionado.mensagens.map((msg) => (
              <Box key={msg.id} mb="md" style={{ display: 'flex', flexDirection: 'column', alignItems: msg.autor_nome === ticketSelecionado.autor_nome ? 'flex-start' : 'flex-end' }}>
                <Group gap="xs" mb={4}>
                  <Text size="xs" fw={700} c="white">{msg.autor_nome}</Text>
                  <Text size="xs" c="dimmed">{new Date(msg.created_at).toLocaleString('pt-BR')}</Text>
                </Group>
                <Box style={{ backgroundColor: msg.autor_nome === ticketSelecionado.autor_nome ? '#2C2E33' : '#1c7ed630', padding: '10px 14px', borderRadius: '8px', maxWidth: '85%' }}>
                  <Text size="sm" c="white" style={{ whiteSpace: 'pre-wrap' }}>{msg.texto}</Text>
                </Box>
              </Box>
            ))}
          </Box>
          
          {ticketSelecionado?.status === 'Aberto' ? (
            <>
              <Textarea label="Sua Resposta" placeholder="Digite..." required minRows={3} mb="md" value={formResposta} onChange={(e) => setFormResposta(e.currentTarget.value)} classNames={{ input: 'rh-input' }} />
              <Group justify="flex-end">
                <Button variant="subtle" color="gray" onClick={() => setModalRespostaAberto(false)}>Cancelar</Button>
                <Button className="entreg" onClick={handleResponder} loading={enviandoResposta} disabled={!formResposta.trim()}>Responder</Button>
              </Group>
            </>
          ) : (
            <Group justify="center" mt="lg"><Text c="dimmed" fs="italic">Este ticket já foi encerrado.</Text></Group>
          )}
        </Box>
      </Modal>

      <Modal 
        opened={modalExclusaoAberto} 
        onClose={() => setModalExclusaoAberto(false)} 
        title={<Text c="red" fw={700}>Excluir Ticket</Text>}
        className="modal-custom"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <Box p="md">
          <Text c="white" mb="lg">Tem certeza que deseja excluir o ticket <strong>"{ticketParaExcluir?.assunto}"</strong>?</Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setModalExclusaoAberto(false)}>Cancelar</Button>
            <Button color="red" onClick={handleExcluirTicket} loading={excluindoTicket}>Sim, Excluir</Button>
          </Group>
        </Box>
      </Modal>

    </Box>
  );
}

export default FeedbackAdm;