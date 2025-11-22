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
  encaminhado: boolean;
}

function FeedbackRH() {
  const [activeTab, setActiveTab] = useState<string | null>('recebidos');
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modalRespostaAberto, setModalRespostaAberto] = useState(false);

  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket | null>(null);
  const [recebidos, setRecebidos] = useState<Ticket[]>([]);
  const [enviados, setEnviados] = useState<Ticket[]>([]);
  const [fechados, setFechados] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formAssunto, setFormAssunto] = useState("");
  const [formMensagem, setFormMensagem] = useState("");
  const [formResposta, setFormResposta] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const carregarTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const responseAdmin = await api.get('/tickets/rh/list/');
      const dataAdmin: Ticket[] = responseAdmin.data;
      setEnviados(dataAdmin.filter(t => t.status === 'Aberto'));
      setFechados(dataAdmin.filter(t => t.status === 'Fechado'));

      const responseRecebidos = await api.get('/tickets/colaboradores/list/');
      const dataRecebidos: Ticket[] = responseRecebidos.data;
      setRecebidos(dataRecebidos.filter(t => t.status === 'Aberto' && !t.encaminhado));

      setFechados(prevFechados => [
        ...prevFechados,
        ...dataRecebidos.filter(t => t.status === 'Fechado')
      ]);

    } catch (err) {
      console.error("Erro ao buscar tickets:", err);
      setError("Falha ao carregar os tickets. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTickets();
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

  const handleAbrirModalResposta = (ticket: Ticket) => {
    setTicketSelecionado(ticket);
    setFormResposta("");
    setModalRespostaAberto(true);
  };

  const handleEnviarResposta = async () => {
    if (!formResposta || !ticketSelecionado) return;

    setIsReplying(true);
    try {
      await api.post(`/tickets/${ticketSelecionado.id}/responder/`, {
        texto: formResposta,
        fechar_ticket: true
      });

      setRecebidos(recebidos.filter(t => t.id !== ticketSelecionado.id));
      setFechados([ticketSelecionado, ...fechados]);

      setModalRespostaAberto(false);
      setTicketSelecionado(null);
    } catch (err) {
      console.error("Erro ao enviar resposta:", err);
      alert("Falha ao enviar a resposta. Tente novamente.");
    } finally {
      setIsReplying(false);
    }
  };

  const handleEncaminharParaAdmin = async (ticket: Ticket) => {
  try {
    await api.patch(`/tickets/${ticket.id}/encaminhar/`);
    setRecebidos(recebidos.filter(t => t.id !== ticket.id));
    setEnviados([ticket, ...enviados]);

  } catch (err) {
    console.error("Erro ao encaminhar:", err);
    alert("Erro ao encaminhar o ticket");
  }
};


  const renderTabelaRecebidos = (data: Ticket[]) => (
    <Table className="funcionarios-table" mt="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Assunto</Table.Th>
          <Table.Th>Autor</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Criado em</Table.Th>
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
              <Table.Td>{ticket.autor.nome}</Table.Td>
              <Table.Td>
                <Badge color={ticket.status === 'Aberto' ? 'blue' : 'gray'} variant="filled">
                  {ticket.status}
                </Badge>
              </Table.Td>
              <Table.Td>{new Date(ticket.created_at).toLocaleDateString("pt-br")}</Table.Td>
              <Table.Td className="actions-cell">
                <Tooltip label="Responder e Fechar">
                  <ActionIcon variant="transparent" color="blue" onClick={() => handleAbrirModalResposta(ticket)}>
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
                  <ActionIcon variant="transparent" color="blue" onClick={() => handleAbrirModalResposta(ticket)}>
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

      <Modal
        opened={modalRespostaAberto}
        onClose={() => {
          setModalRespostaAberto(false);
          setTicketSelecionado(null);
        }}
        title={`Histórico: ${ticketSelecionado?.assunto}`}
        className="modal-custom"
        size="lg"
      >
        <Box component="form" p="md" style={{ position: 'relative' }}>
          <LoadingOverlay visible={isReplying} overlayProps={{ radius: "sm", blur: 2 }} />
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
            {ticketSelecionado?.mensagens.map((msg, index) => (
              <Box
                key={msg.id}
                mb="sm"
                style={{
                  borderBottom:
                    index !== ticketSelecionado.mensagens.length - 1 ? '1px dashed #555' : 'none',
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

          {ticketSelecionado && activeTab === 'recebidos' && (
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
                <Button variant="default" onClick={() => setModalRespostaAberto(false)} disabled={isReplying}>
                  Cancelar
                </Button>

                <Button
                  className="entreg"
                  onClick={handleEnviarResposta}
                  disabled={!formResposta || isReplying}
                >
                  {isReplying ? 'Enviando...' : 'Responder e Fechar'}
                </Button>
              </Group>
            </>
          )}

          {ticketSelecionado && activeTab !== 'recebidos' && (
            <Group justify="flex-end">
              <Button
                variant="default"
                onClick={() => {
                  setModalRespostaAberto(false);
                  setTicketSelecionado(null);
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
