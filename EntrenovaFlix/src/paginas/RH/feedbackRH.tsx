import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Group,
  Title,
  Text,
  Tabs,
  Table,
  Modal,
  Textarea,
  TextInput,
  ActionIcon,
  Badge,
  Tooltip,
  LoadingOverlay,
  Alert
} from '@mantine/core';
import { IconSend, IconArrowForwardUp, IconMessageReply, IconAlertCircle } from '@tabler/icons-react';
import "../../styles/funcionariosRH.css";
import api from '../../services/apiService';

interface Usuario {
  id: string;
  nome: string;
  email: string;
}

interface Mensagem {
  id: string;
  autor: Usuario;
  texto: string;
  created_at: string;
}

interface Ticket {
  id: string;
  assunto: string;
  autor: Usuario;
  empresa: string;
  status: 'Aberto' | 'Fechado';
  created_at: string;
  mensagens: Mensagem[];
}

interface MensagemMock {
  autor: string;
  msg: string;
  data: string;
}

interface TicketMock {
  id: number;
  assunto: string;
  de: string;
  para?: string;
  status: 'aberto' | 'fechado';
  tipo: 'colaborador' | 'admin';
  ultAtualizacao: string;
  conversa: MensagemMock[];
}

const mockRecebidos: TicketMock[] = [
  {
    id: 101,
    assunto: "Problema no VR",
    de: "Ana Silva",
    status: "aberto",
    tipo: "colaborador",
    ultAtualizacao: "2025-11-13",
    conversa: [{ autor: "Ana Silva", msg: "Meu VR não caiu este mês.", data: "2025-11-13" }]
  },
  {
    id: 102,
    assunto: "Dúvida sobre férias",
    de: "Bruno Costa",
    status: "aberto",
    tipo: "colaborador",
    ultAtualizacao: "2025-11-12",
    conversa: [{ autor: "Bruno Costa", msg: "Gostaria de saber como agendar minhas férias.", data: "2025-11-12" }]
  },
];

function FeedbackRH() {
  const [activeTab, setActiveTab] = useState<string | null>('recebidos');
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modalRespostaAberto, setModalRespostaAberto] = useState(false);

  const [ticketSelecionadoMock, setTicketSelecionadoMock] = useState<TicketMock | null>(null);
  const [recebidos, setRecebidos] = useState<TicketMock[]>(mockRecebidos);

  const [ticketSelecionadoApi, setTicketSelecionadoApi] = useState<Ticket | null>(null);
  const [enviados, setEnviados] = useState<Ticket[]>([]);
  const [fechados, setFechados] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formAssunto, setFormAssunto] = useState("");
  const [formMensagem, setFormMensagem] = useState("");
  const [formResposta, setFormResposta] = useState("");

  const carregarTicketsAdmin = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tickets/rh/list/');
      const data: Ticket[] = response.data;

      setEnviados(data.filter(t => t.status === 'Aberto'));
      setFechados(data.filter(t => t.status === 'Fechado'));
    } catch (err) {
      console.error("Erro ao buscar tickets do RH:", err);
      setError("Falha ao carregar seus tickets enviados ao Admin.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTicketsAdmin();
  }, []);

  const handleEnviarNovoTicket = async () => {
    if (!formAssunto || !formMensagem) return;

    setIsSubmitting(true);
    try {
      const response = await api.post('/tickets/rh/create/', {
        assunto: formAssunto,
        texto: formMensagem
      });
      const novoTicket: Ticket = response.data;

      setEnviados([novoTicket, ...enviados]);
      setModalNovoAberto(false);
      setFormAssunto("");
      setFormMensagem("");
    } catch (err) {
      console.error("Erro ao criar ticket:", err);
      alert("Falha ao criar o ticket. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAbrirRespostaMock = (ticket: TicketMock) => {
    setTicketSelecionadoMock(ticket);
    setTicketSelecionadoApi(null);
    setFormResposta("");
    setModalRespostaAberto(true);
  };

  const handleAbrirHistoricoApi = (ticket: Ticket) => {
    setTicketSelecionadoApi(ticket);
    setTicketSelecionadoMock(null);
    setModalRespostaAberto(true);
  };

  const handleEnviarRespostaMock = () => {
    console.log("Respondendo ao colaborador (mock)");
    setModalRespostaAberto(false);
  };

  const handleEncaminharParaAdmin = (ticket: TicketMock) => {
    console.log("Encaminhando para admin (mock)");
    setRecebidos(recebidos.filter(t => t.id !== ticket.id));
  };

  const renderTabelaRecebidos = (data: TicketMock[]) => (
    <Table className="funcionarios-table" mt="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Assunto</Table.Th>
          <Table.Th>De</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Última At.</Table.Th>
          <Table.Th className="th-actions">Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={5} className="no-data">Nenhum ticket encontrado.</Table.Td>
          </Table.Tr>
        ) : (
          data.map((ticket) => (
            <Table.Tr key={ticket.id}>
              <Table.Td>{ticket.assunto}</Table.Td>
              <Table.Td>{ticket.de}</Table.Td>
              <Table.Td>
                <Badge color={ticket.status === 'aberto' ? 'blue' : 'gray'} variant="filled">
                  {ticket.status}
                </Badge>
              </Table.Td>
              <Table.Td>{ticket.ultAtualizacao}</Table.Td>
              <Table.Td className="actions-cell">
                <Tooltip label="Responder e Fechar">
                  <ActionIcon variant="transparent" color="blue" onClick={() => handleAbrirRespostaMock(ticket)}>
                    <IconMessageReply />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Encaminhar para Admin">
                  <ActionIcon variant="transparent" color="yellow" onClick={() => handleEncaminharParaAdmin(ticket)}>
                    <IconArrowForwardUp />
                  </ActionIcon>
                </Tooltip>
              </Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );

  const renderTabelaAdmin = (data: Ticket[]) => (
    <Table className="funcionarios-table" mt="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Assunto</Table.Th>
          <Table.Th>Para</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Criado em</Table.Th>
          <Table.Th>Ações</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={5} className="no-data">Nenhum ticket encontrado.</Table.Td>
          </Table.Tr>
        ) : (
          data.map((ticket) => (
            <Table.Tr key={ticket.id}>
              <Table.Td>{ticket.assunto}</Table.Td>
              <Table.Td>Admin</Table.Td>
              <Table.Td>
                <Badge color={ticket.status === 'Aberto' ? 'blue' : 'gray'} variant="filled">
                  {ticket.status}
                </Badge>
              </Table.Td>
              <Table.Td>{new Date(ticket.created_at).toLocaleDateString('pt-BR')}</Table.Td>
              <Table.Td>
                <Tooltip label="Ver Histórico">
                  <ActionIcon variant="transparent" color="blue" onClick={() => handleAbrirHistoricoApi(ticket)}>
                    <IconMessageReply />
                  </ActionIcon>
                </Tooltip>
              </Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );

  return (
    <Box className="funcionarios-container" style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />

      <Group className="header-group">
        <Box>
          <Title order={2} className="header-title">Central de Feedback</Title>
          <Text className="header-subtitle">Gerencie tickets internos e com o Admin.</Text>
        </Box>

        <Button
          className="btn-add"
          onClick={() => setModalNovoAberto(true)}
          leftSection={<IconSend size={16} />}
        >
          Novo Ticket (Admin)
        </Button>
      </Group>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Erro" color="red" variant="filled" mb="md">
          {error}
        </Alert>
      )}

      <Tabs value={activeTab} onChange={setActiveTab} mt="lg" variant="outline" radius="md">
        <Tabs.List>
          <Tabs.Tab value="recebidos">Recebidos dos Colaboradores</Tabs.Tab>
          <Tabs.Tab value="enviados">Enviados ao Admin</Tabs.Tab>
          <Tabs.Tab value="fechados">Fechados</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="recebidos" pt="lg">
          {renderTabelaRecebidos(recebidos)}
        </Tabs.Panel>

        <Tabs.Panel value="enviados" pt="lg">
          {renderTabelaAdmin(enviados)}
        </Tabs.Panel>

        <Tabs.Panel value="fechados" pt="lg">
          {renderTabelaAdmin(fechados)}
        </Tabs.Panel>
      </Tabs>

      {/* Modal Novo Ticket */}
      <Modal
        opened={modalNovoAberto}
        onClose={() => setModalNovoAberto(false)}
        title="Novo Ticket para Admin"
        className="modal-custom"
        size="lg"
      >
        <Box component="form" p="md" style={{ position: 'relative' }}>
          <LoadingOverlay visible={isSubmitting} overlayProps={{ radius: "sm", blur: 2 }} />

          <TextInput
            label="Assunto"
            placeholder="Ex: Problema com pagamento"
            required
            mb="sm"
            value={formAssunto}
            onChange={(e) => setFormAssunto(e.currentTarget.value)}
          />

          <Textarea
            label="Mensagem"
            placeholder="Descreva o problema ou sugestão"
            required
            minRows={4}
            mb="lg"
            value={formMensagem}
            onChange={(e) => setFormMensagem(e.currentTarget.value)}
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={() => setModalNovoAberto(false)} disabled={isSubmitting}>
              Cancelar
            </Button>

            <Button
              className="entreg"
              onClick={handleEnviarNovoTicket}
              disabled={!formAssunto || !formMensagem || isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </Group>
        </Box>
      </Modal>

      {/* Modal Histórico + Resposta */}
      <Modal
        opened={modalRespostaAberto}
        onClose={() => {
          setModalRespostaAberto(false);
          setTicketSelecionadoApi(null);
          setTicketSelecionadoMock(null);
        }}
        title={`Histórico: ${ticketSelecionadoMock?.assunto || ticketSelecionadoApi?.assunto}`}
        className="modal-custom"
        size="lg"
      >
        <Box p="md">
          <Text fw={500} mb="xs">Histórico</Text>

          <Box
            mb="md"
            style={{
              maxHeight: '200px',
              overflowY: 'auto',
              backgroundColor: '#292929',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #444'
            }}
          >
            {/* Histórico Mock */}
            {ticketSelecionadoMock?.conversa.map((msg, index) => (
              <Box
                key={index}
                mb="sm"
                style={{
                  borderBottom:
                    index !== ticketSelecionadoMock.conversa.length - 1 ? '1px dashed #555' : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                <Group justify="space-between">
                  <Text fw={700} size="sm">{msg.autor}</Text>
                  <Text size="xs" c="dimmed">{msg.data}</Text>
                </Group>
                <Text size="sm" c="#e0e0e0">{msg.msg}</Text>
              </Box>
            ))}

            {/* Histórico API */}
            {ticketSelecionadoApi?.mensagens.map((msg, index) => (
              <Box
                key={msg.id}
                mb="sm"
                style={{
                  borderBottom:
                    index !== ticketSelecionadoApi.mensagens.length - 1 ? '1px dashed #555' : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                <Group justify="space-between">
                  <Text fw={700} size="sm">{msg.autor.nome}</Text>
                  <Text size="xs" c="dimmed">{new Date(msg.created_at).toLocaleString('pt-BR')}</Text>
                </Group>
                <Text size="sm" c="#e0e0e0">{msg.texto}</Text>
              </Box>
            ))}
          </Box>

          {/* Resposta MOCK */}
          {ticketSelecionadoMock && (
            <>
              <Textarea
                label="Sua Resposta"
                placeholder="Digite sua resposta ao colaborador"
                required
                minRows={4}
                mb="lg"
                value={formResposta}
                onChange={(e) => setFormResposta(e.currentTarget.value)}
              />

              <Group justify="flex-end">
                <Button variant="default" onClick={() => setModalRespostaAberto(false)}>Cancelar</Button>

                <Button
                  className="entreg"
                  onClick={handleEnviarRespostaMock}
                  disabled={!formResposta}
                >
                  Responder e Fechar (Mock)
                </Button>
              </Group>
            </>
          )}

          {/* Apenas visualização API */}
          {ticketSelecionadoApi && (
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => {
                  setModalRespostaAberto(false);
                  setTicketSelecionadoApi(null);
                }}
              >
                Fechar Histórico
              </Button>
            </Group>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

export default FeedbackRH;
