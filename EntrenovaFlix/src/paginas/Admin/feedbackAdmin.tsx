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
  ActionIcon,
  Badge,
  Tooltip,
  LoadingOverlay,
  Alert
} from '@mantine/core';
import { IconMessageReply, IconAlertCircle } from '@tabler/icons-react';
import '../../styles/feedbackAdmin.css';
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

function FeedbackAdmin() {
  const [activeTab, setActiveTab] = useState<string | null>('abertos');
  const [modalRespostaAberto, setModalRespostaAberto] = useState(false);
  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket | null>(null);

  const [abertos, setAbertos] = useState<Ticket[]>([]);
  const [fechados, setFechados] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formResposta, setFormResposta] = useState('');

  const carregarTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/tickets/admin/list/');
      const data: Ticket[] = response.data;

      setAbertos(data.filter(t => t.status === 'Aberto'));
      setFechados(data.filter(t => t.status === 'Fechado'));
    } catch (err) {
      console.error("Erro ao buscar tickets:", err);
      setError("Falha ao carregar os tickets. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTickets();
  }, []);

  const handleAbrirResposta = (ticket: Ticket) => {
    setTicketSelecionado(ticket);
    setFormResposta('');
    setModalRespostaAberto(true);
  };

  const handleEnviarResposta = async () => {
    if (!ticketSelecionado || !formResposta) return;

    setIsSubmitting(true);
    try {
      await api.post(`tickets/admin/${ticketSelecionado.id}/`, {
        texto: formResposta
      });

      await api.patch(`/tickets/admin/${ticketSelecionado.id}/`);

      setModalRespostaAberto(false);
      setTicketSelecionado(null);
      carregarTickets();
    } catch (err) {
      console.error("Erro ao responder ticket:", err);
      alert("Falha ao enviar resposta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabela = (data: Ticket[], tipo: 'aberto' | 'fechado') => (
    <Table className="funcionarios-table" mt="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Assunto</Table.Th>
          <Table.Th>De (RH)</Table.Th>
          <Table.Th>Empresa</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Criado em</Table.Th>
          {tipo === 'aberto' && <Table.Th className="th-actions">Ações</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={tipo === 'aberto' ? 6 : 5} className="no-data">
              Nenhum ticket encontrado.
            </Table.Td>
          </Table.Tr>
        ) : (
          data.map(ticket => (
            <Table.Tr key={ticket.id}>
              <Table.Td>{ticket.assunto}</Table.Td>
              <Table.Td>{ticket.autor.nome}</Table.Td>
              <Table.Td>{ticket.empresa}</Table.Td>
              <Table.Td>
                <Badge color={ticket.status === 'Aberto' ? 'blue' : 'gray'} variant="filled">
                  {ticket.status}
                </Badge>
              </Table.Td>
              <Table.Td>{new Date(ticket.created_at).toLocaleDateString('pt-BR')}</Table.Td>

              {tipo === 'aberto' && (
                <Table.Td className="actions-cell">
                  <Tooltip label="Responder e Fechar">
                    <ActionIcon
                      variant="transparent"
                      color="blue"
                      onClick={() => handleAbrirResposta(ticket)}
                    >
                      <IconMessageReply />
                    </ActionIcon>
                  </Tooltip>
                </Table.Td>
              )}
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
          <Title order={2} className="header-title">
            Gerenciamento de Tickets (Admin)
          </Title>
          <Text className="header-subtitle">
            Responda e gerencie tickets recebidos do RH.
          </Text>
        </Box>
      </Group>

      {error && (
        <Alert 
          icon={<IconAlertCircle size="1rem" />} 
          title="Erro" 
          color="red" 
          variant="filled" 
          mb="md"
        >
          {error}
        </Alert>
      )}

      <Tabs value={activeTab} onChange={setActiveTab} mt="lg" variant="outline" radius="md">
        <Tabs.List>
          <Tabs.Tab value="abertos">Tickets Abertos</Tabs.Tab>
          <Tabs.Tab value="fechados">Tickets Fechados</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="abertos" pt="lg">
          {renderTabela(abertos, 'aberto')}
        </Tabs.Panel>
        <Tabs.Panel value="fechados" pt="lg">
          {renderTabela(fechados, 'fechado')}
        </Tabs.Panel>
      </Tabs>

      <Modal
        opened={modalRespostaAberto}
        onClose={() => setModalRespostaAberto(false)}
        title={`Responder Ticket: ${ticketSelecionado?.assunto}`}
        className="modal-custom"
        size="lg"
      >
        <Box p="md" style={{ position: 'relative' }}>
          <LoadingOverlay visible={isSubmitting} overlayProps={{ radius: "sm", blur: 2 }} />
          <Text fw={500} mb="xs">
            Histórico
          </Text>

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
                    index !== ticketSelecionado.mensagens.length - 1
                      ? '1px dashed #555'
                      : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                <Group justify="space-between">
                  <Text fw={700} size="sm">
                    {msg.autor.nome}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {new Date(msg.created_at).toLocaleString('pt-BR')}
                  </Text>
                </Group>

                <Text size="sm" c="#e0e0e0">
                  {msg.texto}
                </Text>
              </Box>
            ))}
          </Box>

          <Textarea
            label="Sua Resposta"
            placeholder="Digite sua resposta..."
            required
            minRows={4}
            mb="lg"
            value={formResposta}
            onChange={e => setFormResposta(e.currentTarget.value)}
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={() => setModalRespostaAberto(false)} disabled={isSubmitting}>
              Cancelar
            </Button>

            <Button 
              className="entreg"
              onClick={handleEnviarResposta}
              disabled={!formResposta || isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Responder e Fechar'}
            </Button>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
}

export default FeedbackAdmin;
