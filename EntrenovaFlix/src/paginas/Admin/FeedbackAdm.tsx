import { useState, useEffect, useMemo } from 'react';
import { 
  Box, Button, Group, Title, Text, Modal, Textarea, Badge, Card, Avatar, Divider, 
  SimpleGrid, ScrollArea, ThemeIcon, LoadingOverlay, SegmentedControl, 
  ActionIcon, TextInput, Pagination 
} from '@mantine/core';

import { 
  IconMessageReply, IconCheck, IconClock, IconTrash, IconSearch, 
  IconSortDescending, IconSortAscending 
} from '@tabler/icons-react';

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
  encaminhado: boolean; 
}




const TicketCard = ({
  ticket, onClick, onDelete
}: { 
  ticket: Ticket; 
  onClick: () => void; 
  onDelete: (ticket: Ticket) => void; 
}) => {
  const isAberto = ticket.status === 'Aberto';
  
  const ultimaMsg = ticket.mensagens?.length
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
        marginBottom: '10px'
      }}
      className="kanban-card-hover"
    >
      <Group justify="space-between" mb="xs" align="flex-start">
        <Group gap="xs" style={{ maxWidth: '80%' }}>
          <Avatar color={isAberto ? "blue" : "gray"} size="sm" radius="xl">
            {ticket.autor_nome?.charAt(0).toUpperCase()}
          </Avatar>

          <Box style={{ overflow: 'hidden' }}>
            <Text fw={600} size="sm" c="white" truncate>{ticket.autor_nome}</Text>
            <Text size="xs" c="dimmed" truncate>{ticket.empresa_nome}</Text>
         
            {ticket.encaminhado && (
              <Badge color="yellow" size="xs" mt={4}>Encaminhado</Badge>
            )}
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

      <Text fw={700} size="sm" c="white" lineClamp={1}>{ticket.assunto}</Text>
      <Text size="xs" c="dimmed" lineClamp={2}>{ultimaMsg}</Text>

      <Divider my="xs" color="#373A40" />

      <Group justify="space-between">
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



export default function FeedbackAdm() {
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
  const [fechandoTicket, setFechandoTicket] = useState(false);

  const ADMIN_NAME = "Admin"; 



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

    if (busca.trim()) {
      const termo = busca.toLowerCase();
      lista = lista.filter(t => 
        t.assunto.toLowerCase().includes(termo) ||
        t.autor_nome.toLowerCase().includes(termo) ||
        t.empresa_nome.toLowerCase().includes(termo)
      );
    }

    if (filtroOrigem === "rh") {
      lista = lista.filter(t => !t.encaminhado);
    }

    if (filtroOrigem === "encaminhado") {
      lista = lista.filter(t => t.encaminhado === true);
    }

    lista.sort((a, b) => {
      const A = new Date(a.created_at).getTime();
      const B = new Date(b.created_at).getTime();
      return ordemRecente ? B - A : A - B;
    });

    return lista;
  }, [tickets, busca, ordemRecente, filtroOrigem]);


  const todosAbertos = ticketsProcessados.filter(t => t.status === "Aberto");
  const todosFechados = ticketsProcessados.filter(t => t.status === "Fechado");

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
    } catch {
      alert("Erro ao excluir.");
    } finally {
      setExcluindoTicket(false);
    }
  };


  const handleFecharTicket = async () => {
    if (!ticketSelecionado) return;

    setFechandoTicket(true);

    try {
      await api.patch(`/tickets/${ticketSelecionado.id}/fechar`);
      await fetchTickets();
      setModalRespostaAberto(false);
    } catch {
      alert("Erro ao fechar ticket.");
    } finally {
      setFechandoTicket(false);
    }
  };


  const handleResponder = async () => {
    if (!ticketSelecionado || !formResposta) return;
    setEnviandoResposta(true);

    try {
      await api.post(`/tickets/admin/${ticketSelecionado.id}/`, {
        texto: formResposta
      });

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
        <Group justify="space-between" mb="md">
          <Box>
            <Title order={2} c="white">Gestão de Tickets</Title>
            <Text c="dimmed" size="sm">Solicitações de suporte das empresas.</Text>
          </Box>

          <Group>
            <ActionIcon 
              variant="default"
              size="lg"
              onClick={() => setOrdemRecente(!ordemRecente)}
            >
              {ordemRecente 
                ? <IconSortDescending size={20} /> 
                : <IconSortAscending size={20} />
              }
            </ActionIcon>

            <Button variant="outline" color="gray" onClick={fetchTickets}>
              Atualizar
            </Button>
          </Group>
        </Group>

        <Group grow>
          <TextInput
            placeholder="Buscar..."
            leftSection={<IconSearch size={16} />}
            value={busca}
            onChange={(e) => setBusca(e.currentTarget.value)}
            styles={{
              input: {
                backgroundColor: '#1A1B1E',
                borderColor: '#373A40',
                color: 'white'
              }
            }}
          />

          <SegmentedControl
            value={filtroOrigem}
            onChange={setFiltroOrigem}
            data={[
              { label: "Todos", value: "todos" },
              { label: "RH Interno", value: "rh" },
              { label: "Encaminhados", value: "encaminhado" }
            ]}
          />
        </Group>
      </Box>


      <SimpleGrid cols={2} spacing="lg" p="lg" style={{ height: 'calc(100vh - 220px)' }}>
        
        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Group mb="md" px="xs">
            <ThemeIcon color="blue" variant="light" radius="md" size="lg">
              <IconClock size={20} />
            </ThemeIcon>
            <Text fw={700} c="white">Pendentes ({todosAbertos.length})</Text>
          </Group>

          <ScrollArea style={{ flex: 1, backgroundColor: '#1A1B1E', borderRadius: 8 , marginBottom: '10px'}} p="md">
            {paginatedAbertos.length === 0 ? (
              <Text c="dimmed" ta="center" mt="xl">Nenhum ticket pendente.</Text>
            ) : (
              paginatedAbertos.map(ticket => (
                <TicketCard 
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => handleAbrirTicket(ticket)}
                  onDelete={confirmarExclusao}
                />
              ))
            )}
          </ScrollArea>

          {totalPagesAbertos > 1 && (
            <Group justify="center" mt="md">
              <Pagination value={pageAbertos} onChange={setPageAbertos} total={totalPagesAbertos} />
            </Group>
          )}
        </Box>


        <Box style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <Group mb="md" px="xs">
            <ThemeIcon color="gray" variant="light" radius="md" size="lg">
              <IconCheck size={20} />
            </ThemeIcon>
            <Text fw={700} c="dimmed">Resolvidos ({todosFechados.length})</Text>
          </Group>

          <ScrollArea style={{ flex: 1, backgroundColor: '#1A1B1E', borderRadius: 8, marginBottom: '10px' }} p="md">
            {paginatedFechados.length === 0 ? (
              <Text c="dimmed" ta="center" mt="xl">Nenhum ticket resolvido.</Text>
            ) : (
              paginatedFechados.map(ticket => (
                <TicketCard 
                  key={ticket.id}
                  ticket={ticket}
                  onClick={() => handleAbrirTicket(ticket)}
                  onDelete={confirmarExclusao}
                />
              ))
            )}
          </ScrollArea>

          {totalPagesFechados > 1 && (
            <Group justify="center" mt="md">
              <Pagination value={pageFechados} onChange={setPageFechados} total={totalPagesFechados} />
            </Group>
          )}
        </Box>
      </SimpleGrid>

      <Modal 
        className='modal-custom'
        opened={modalRespostaAberto}
        onClose={() => setModalRespostaAberto(false)}
        size="lg"
        title={
          <Group>
            <Badge color={ticketSelecionado?.status === "Aberto" ? "blue" : "gray"}>
              {ticketSelecionado?.status}
            </Badge>
            <Text fw={700}>{ticketSelecionado?.assunto}</Text>
          </Group>
        }
      >

        <Box p="md">
          <Box 
            style={{ 
              maxHeight: 350, 
              overflowY: 'auto', 
              backgroundColor: '#141517', 
              padding: 16, 
              borderRadius: 8 
            }}
          >
            {ticketSelecionado?.mensagens.map(msg => {
              
              const isAdmin = msg.autor_nome === ADMIN_NAME;

              return (
                <Box 
                  key={msg.id} 
                  mb="md"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isAdmin ? 'flex-end' : 'flex-start',
                  }}
                >
                  <Box style={{ maxWidth: '80%' }}>
                    <Text size="xs" fw={700} c="white">
                      {isAdmin ? "Admin" : msg.autor_nome}
                    </Text>

                    <Text size="xs" c="dimmed">
                      {new Date(msg.created_at).toLocaleString('pt-BR')}
                    </Text>

                    <Box
                      style={{
                        backgroundColor: isAdmin ? '#3b5bdb' : '#2C2E33',
                        padding: '10px 14px',
                        marginTop: 6,
                        borderRadius: 8,
                        color: 'white'
                      }}
                    >
                      <Text size="sm">{msg.texto}</Text>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {ticketSelecionado?.status === "Aberto" ? (
            <>
              <Textarea
                label="Responder"
                placeholder="Digite sua resposta..."
                value={formResposta}
                onChange={(e) => setFormResposta(e.target.value)}
                minRows={3}
                mb="md"
              />

              <Group justify="space-between">
                <Button 
                  color="red"
                  variant="light"
                  onClick={handleFecharTicket}
                  loading={fechandoTicket}
                >
                  Fechar Ticket
                </Button>

                <Group>

                  <Button 
                    onClick={handleResponder}
                    loading={enviandoResposta}
                    disabled={!formResposta.trim()}
                  >
                    Responder
                  </Button>
                </Group>

              </Group>
            </>
          ) : (
            <Text c="dimmed" ta="center" mt="lg">
              Este ticket está fechado.
            </Text>
          )}

        </Box>
      </Modal>

      <Modal 
        opened={modalExclusaoAberto}
        onClose={() => setModalExclusaoAberto(false)}
        title={<Text c="red" fw={700}>Excluir Ticket</Text>}
        className='modal-custom'
      >
        <Box p="md">
          <Text c="white">
            Tem certeza que deseja excluir o ticket <strong>{ticketParaExcluir?.assunto}</strong>?
          </Text>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setModalExclusaoAberto(false)}>Cancelar</Button>
            <Button color="red" onClick={handleExcluirTicket} loading={excluindoTicket}>
              Excluir
            </Button>
          </Group>
        </Box>
      </Modal>

    </Box>
  );
}
