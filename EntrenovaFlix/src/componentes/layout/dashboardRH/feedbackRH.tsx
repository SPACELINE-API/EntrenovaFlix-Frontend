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
  TextInput, 
  ActionIcon,
  Badge,
  Tooltip
} from '@mantine/core';
import { IconMessageReply, IconSend, IconArrowForwardUp } from '@tabler/icons-react';
import "../../../styles/funcionariosRH.css"

interface Mensagem {
  autor: string;
  msg: string;
  data: string;
}

interface Ticket {
  id: number;
  assunto: string;
  de: string;
  para?: string;
  status: 'aberto' | 'fechado';
  tipo: 'colaborador' | 'admin';
  ultAtualizacao: string;
  conversa: Mensagem[];
}

const mockRecebidos: Ticket[] = [
  { 
    id: 101, assunto: "Problema no VR", de: "Ana Silva", status: "aberto", tipo: "colaborador", ultAtualizacao: "2025-11-13",
    conversa: [{ autor: "Ana Silva", msg: "Meu VR não caiu este mês.", data: "2025-11-13" }]
  },
  { 
    id: 102, assunto: "Dúvida sobre férias", de: "Bruno Costa", status: "aberto", tipo: "colaborador", ultAtualizacao: "2025-11-12",
    conversa: [{ autor: "Bruno Costa", msg: "Gostaria de saber como agendar minhas férias.", data: "2025-11-12" }]
  },
];

const mockEnviados: Ticket[] = [
  { 
    id: 201, assunto: "Licença do software de ponto", de: "RH", para: "Admin", status: "aberto", tipo: "admin", ultAtualizacao: "2025-11-10",
    conversa: [{ autor: "RH", msg: "Precisamos de mais 5 licenças para o software de ponto.", data: "2025-11-10" }]
  }
];

const mockFechados: Ticket[] = [
  { 
    id: 301, assunto: "Ajuste de ponto", de: "Carlos Lima", para: "RH", status: "fechado", tipo: "colaborador", ultAtualizacao: "2025-11-09",
    conversa: [
      { autor: "Carlos Lima", msg: "Esqueci de bater o ponto ontem.", data: "2025-11-08" },
      { autor: "RH", msg: "Ponto ajustado. Por favor, tenha mais atenção.", data: "2025-11-09" }
    ]
  }
];


function FeedbackRH() {
  const [activeTab, setActiveTab] = useState<string | null>('recebidos');
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modalRespostaAberto, setModalRespostaAberto] = useState(false);
  const [ticketSelecionado, setTicketSelecionado] = useState<Ticket | null>(null);

  const [recebidos, setRecebidos] = useState<Ticket[]>(mockRecebidos);
  const [enviados, setEnviados] = useState<Ticket[]>(mockEnviados);
  const [fechados, setFechados] = useState<Ticket[]>(mockFechados);

  const [formAssunto, setFormAssunto] = useState("");
  const [formMensagem, setFormMensagem] = useState("");
  const [formResposta, setFormResposta] = useState("");

  const handleAbrirResposta = (ticket: Ticket) => {
    setTicketSelecionado(ticket);
    setFormResposta("");
    setModalRespostaAberto(true);
  };

  const handleEnviarResposta = () => {
    if (!ticketSelecionado || !formResposta) return;

    const novaMensagem: Mensagem = {
      autor: 'RH',
      msg: formResposta,
      data: new Date().toISOString().split("T")[0]
    };

    const ticketAtualizado: Ticket = {
      ...ticketSelecionado,
      status: 'fechado',
      ultAtualizacao: novaMensagem.data,
      conversa: [...ticketSelecionado.conversa, novaMensagem],
    };

    setFechados([ticketAtualizado, ...fechados]);
    setRecebidos(recebidos.filter(t => t.id !== ticketSelecionado.id));
    
    setModalRespostaAberto(false);
    setTicketSelecionado(null);
  };

  const handleEnviarNovoTicket = () => {
    if (!formAssunto || !formMensagem) return;

    const novaMensagem: Mensagem = {
      autor: 'RH',
      msg: formMensagem,
      data: new Date().toISOString().split("T")[0]
    };

    const novoTicket: Ticket = {
      id: Math.floor(Math.random() * 10000) + 500,
      assunto: formAssunto,
      de: 'RH',
      para: 'Admin',
      status: 'aberto',
      tipo: 'admin',
      ultAtualizacao: novaMensagem.data,
      conversa: [novaMensagem]
    };

    setEnviados([novoTicket, ...enviados]);
    setModalNovoAberto(false);
    setFormAssunto("");
    setFormMensagem("");
  };

  const handleEncaminharParaAdmin = (ticket: Ticket) => {
    const dataAtual = new Date().toISOString().split("T")[0];
    
    const ticketEncaminhado: Ticket = {
      ...ticket,
      para: 'Admin',
      tipo: 'admin',
      ultAtualizacao: dataAtual,
      conversa: [
        ...ticket.conversa, 
        { 
          autor: 'RH (Sistema)', 
          msg: `Ticket encaminhado para o Admin em ${dataAtual}.`, 
          data: dataAtual 
        }
      ]
    };

    setEnviados([ticketEncaminhado, ...enviados]);
    setRecebidos(recebidos.filter(t => t.id !== ticket.id));
  };

  const renderTabela = (data: Ticket[], tipo: 'recebido' | 'enviado' | 'fechado') => (
    <Table className="funcionarios-table" mt="md" highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Assunto</Table.Th>
          <Table.Th>{tipo === 'recebido' || tipo === 'fechado' ? 'De' : 'Para'}</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>Última At.</Table.Th>
          {tipo === 'recebido' && <Table.Th className="th-actions">Ações</Table.Th>}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.length === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={tipo === 'recebido' ? 5 : 4} className="no-data">
              Nenhum ticket encontrado.
            </Table.Td>
          </Table.Tr>
        ) : (
          data.map((ticket) => (
            <Table.Tr key={ticket.id}>
              <Table.Td>{ticket.assunto}</Table.Td>
              <Table.Td>{tipo === 'recebido' || tipo === 'fechado' ? ticket.de : ticket.para}</Table.Td>
              <Table.Td>
                <Badge color={ticket.status === 'aberto' ? 'blue' : 'gray'} variant="filled">
                  {ticket.status}
                </Badge>
              </Table.Td>
              <Table.Td>{ticket.ultAtualizacao}</Table.Td>
              {tipo === 'recebido' && (
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
                  <Tooltip label="Encaminhar para Admin">
                    <ActionIcon
                      variant="transparent"
                      color="yellow"
                      onClick={() => handleEncaminharParaAdmin(ticket)}
                    >
                      <IconArrowForwardUp />
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

      <Tabs value={activeTab} onChange={setActiveTab} mt="lg" variant="outline" radius="md">
        <Tabs.List>
          <Tabs.Tab value="recebidos">Recebidos dos Colaboradores</Tabs.Tab>
          <Tabs.Tab value="enviados">Enviados ao Admin</Tabs.Tab>
          <Tabs.Tab value="fechados">Fechados</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="recebidos" pt="lg">
          {renderTabela(recebidos, 'recebido')}
        </Tabs.Panel>
        <Tabs.Panel value="enviados" pt="lg">
          {renderTabela(enviados, 'enviado')}
        </Tabs.Panel>
        <Tabs.Panel value="fechados" pt="lg">
          {renderTabela(fechados, 'fechado')}
        </Tabs.Panel>
      </Tabs>

      <Modal 
        opened={modalNovoAberto} 
        onClose={() => setModalNovoAberto(false)} 
        title="Novo Ticket para Admin" 
        className="modal-custom" 
        size="lg"
      >
        <Box component="form" p="md">
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
            <Button variant="default" onClick={() => setModalNovoAberto(false)}>Cancelar</Button>
            <Button 
              className="entreg" 
              onClick={handleEnviarNovoTicket} 
              disabled={!formAssunto || !formMensagem}
            >
              Enviar
            </Button>
          </Group>
        </Box>
      </Modal>

      <Modal 
        opened={modalRespostaAberto} 
        onClose={() => setModalRespostaAberto(false)} 
        title={`Responder Ticket: ${ticketSelecionado?.assunto}`} 
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
              {ticketSelecionado?.conversa.map((msg, index) => (
                <Box key={index} mb="sm" style={{ borderBottom: index !== ticketSelecionado.conversa.length - 1 ? '1px dashed #555' : 'none', paddingBottom: '0.5rem' }}>
                  <Group justify="space-between">
                    <Text fw={700} size="sm">{msg.autor}</Text>
                    <Text size="xs" c="dimmed">{msg.data}</Text>
                  </Group>
                  <Text size="sm" c="#e0e0e0">{msg.msg}</Text>
                </Box>
              ))}
            </Box>
            
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
                onClick={handleEnviarResposta} 
                disabled={!formResposta}
              >
                Responder e Fechar
              </Button>
            </Group>
          </Box>
      </Modal>
    </Box>
  );
}

export default FeedbackRH;