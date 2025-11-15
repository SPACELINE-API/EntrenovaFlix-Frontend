import React, { useState } from 'react';
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
  Tooltip
} from '@mantine/core';
import { IconMessageReply } from '@tabler/icons-react';
import '../../styles/feedbackAdmin.css';

interface Mensagem {
  autor: string;
  msg: string;
  data: string;
}

interface Ticket {
  id: number;
  assunto: string;
  de: string;
  status: 'aberto' | 'fechado';
  ultAtualizacao: string;
  conversa: Mensagem[];
}

const mockAbertos: Ticket[] = [];

const mockFechados: Ticket[] = [];

function FeedbackAdmin() {
  const [activeTab, setActiveTab] = useState<string | null>('abertos');
  const [modalRespostaAberto, setModalRespostaAberto] = useState(false);
  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket | null>(null);

  const [abertos, setAbertos] = useState<Ticket[]>(mockAbertos);
  const [fechados, setFechados] = useState<Ticket[]>(mockFechados);

  const [formResposta, setFormResposta] = useState('');

  const handleAbrirResposta = (ticket: Ticket) => {
    setTicketSelecionado(ticket);
    setFormResposta('');
    setModalRespostaAberto(true);
  };

  const handleEnviarResposta = () => {
    if (!ticketSelecionado || !formResposta) return;

    const novaMensagem: Mensagem = {
      autor: 'Admin',
      msg: formResposta,
      data: new Date().toISOString().split('T')[0]
    };

    const ticketAtualizado: Ticket = {
      ...ticketSelecionado,
      status: 'fechado',
      ultAtualizacao: novaMensagem.data,
      conversa: [...ticketSelecionado.conversa, novaMensagem]
    };

    setFechados([ticketAtualizado, ...fechados]);
    setAbertos(abertos.filter(t => t.id !== ticketSelecionado.id));

    setModalRespostaAberto(false);
    setTicketSelecionado(null);
  };

  const renderTabela = (data: Ticket[], tipo: 'aberto' | 'fechado') => (
    <Table className="funcionarios-table" mt="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Assunto</Table.Th>
          <Table.Th>De (RH)</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Última At.</Table.Th>
          {tipo === 'aberto' && <Table.Th className="th-actions">Ações</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={tipo === 'aberto' ? 5 : 4} className="no-data">
              Nenhum ticket encontrado.
            </Table.Td>
          </Table.Tr>
        ) : (
          data.map(ticket => (
            <Table.Tr key={ticket.id}>
              <Table.Td>{ticket.assunto}</Table.Td>
              <Table.Td>{ticket.de}</Table.Td>
              <Table.Td>
                <Badge color={ticket.status === 'aberto' ? 'blue' : 'gray'} variant="filled">
                  {ticket.status}
                </Badge>
              </Table.Td>
              <Table.Td>{ticket.ultAtualizacao}</Table.Td>

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
    <Box className="funcionarios-container">
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
        <Box p="md">
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
            {ticketSelecionado?.conversa.map((msg, index) => (
              <Box
                key={index}
                mb="sm"
                style={{
                  borderBottom:
                    index !== ticketSelecionado.conversa.length - 1
                      ? '1px dashed #555'
                      : 'none',
                  paddingBottom: '0.5rem'
                }}
              >
                <Group justify="space-between">
                  <Text fw={700} size="sm">
                    {msg.autor}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {msg.data}
                  </Text>
                </Group>

                <Text size="sm" c="#e0e0e0">
                  {msg.msg}
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
            <Button variant="default" onClick={() => setModalRespostaAberto(false)}>
              Cancelar
            </Button>

            <Button className="entreg" onClick={handleEnviarResposta} disabled={!formResposta}>
              Responder e Fechar
            </Button>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
}

export default FeedbackAdmin;
