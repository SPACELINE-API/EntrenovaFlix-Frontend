import { useState, useEffect, useCallback } from 'react';
import {Box, Button, Group, Title, Text, Table, Modal, TextInput, Textarea, MultiSelect, Select, ActionIcon, Tooltip, LoadingOverlay} from '@mantine/core';
import { showNotification } from '@mantine/notifications'; 
import { IconPencil, IconTrash, IconPlus, IconAlertCircle, IconEye } from '@tabler/icons-react';
import api from '../../services/apiService';
import '../../styles/TrilhasAdmin.css';

const BASE_URL_API = "http://127.0.0.1:8000/api/accounts/conteudos/";

interface Conteudo {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  softSkills: string[];
  link?: string;
  created_at: string;
}

interface FormConteudo {
  titulo: string;
  descricao: string;
  tipo: string;
  link: string;
  softSkills: string[];
}

function TrilhasAdmin() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentConteudo, setCurrentConteudo] = useState<Conteudo | null>(null);
  const [form, setForm] = useState<FormConteudo>({
    titulo: '',
    descricao: '',
    tipo: 'Artigo',
    link: '',
    softSkills: [],
  });

  const softSkillOptions = [
    { value: 'comunicacao', label: 'Comunicação' },
    { value: 'lideranca', label: 'Liderança' },
    { value: 'resolucao', label: 'Resolução de Problemas' },
  ];

  const tipoConteudoOptions = [
    { value: 'Artigo', label: 'Artigo' },
    { value: 'Quiz', label: 'Quiz' },
    { value: 'Podcast', label: 'Podcast' },
    { value: 'Vídeo', label: 'Vídeo' },
  ];

  const fetchConteudos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Conteudo[]>(BASE_URL_API);
      setConteudos(response.data);
      setError(null);
    } catch (err: any) {
      let errorMsg = "Falha ao carregar conteúdos. Verifique o backend e a rota.";
      if (err.response?.status === 403 || err.response?.status === 401) {
        errorMsg = "Acesso negado (401/403). Faça login novamente como Administrador.";
      } else if (err.response?.status === 500) {
        errorMsg = "Erro interno (500) no servidor ao listar conteúdos.";
      }
      setError(errorMsg);
      showNotification({
        title: "Erro",
        message: errorMsg,
        color: "red",
        icon: <IconAlertCircle />,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConteudos();
  }, [fetchConteudos]);

  const handleOpenModal = (conteudo?: Conteudo) => {
    if (conteudo) {
      setIsEditing(true);
      setCurrentConteudo(conteudo);
      setForm({
        titulo: conteudo.titulo,
        descricao: conteudo.descricao,
        tipo: conteudo.tipo,
        link: conteudo.link || '',
        softSkills: conteudo.softSkills,
      });
    } else {
      setIsEditing(false);
      setCurrentConteudo(null);
      setForm({ titulo: '', descricao: '', tipo: 'Artigo', link: '', softSkills: [] });
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setCurrentConteudo(null);
  };

  const handleSubmit = async () => {
    if (!form.titulo || !form.descricao || form.softSkills.length === 0) {
      showNotification({
        title: "Erro de Validação",
        message: "Título, Descrição e Soft Skills são obrigatórios.",
        color: "yellow",
        icon: <IconAlertCircle />,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && currentConteudo) {
        await api.put(`${BASE_URL_API}${currentConteudo.id}/`, form);
        showNotification({ title: "Sucesso", message: "Conteúdo editado com sucesso.", color: "green" });
      } else {
        await api.post(BASE_URL_API, form);
        showNotification({ title: "Sucesso", message: "Conteúdo adicionado com sucesso.", color: "green" });
      }

      handleCloseModal();
      await fetchConteudos();
    } catch (err: any) {
      if (err.response?.status === 400 && err.response.data) {
        let detail = "Verifique os campos do formulário.";
        try {
          detail = Object.keys(err.response.data).map(key =>
            `${key}: ${Array.isArray(err.response.data[key]) ? err.response.data[key].join(' ') : err.response.data[key]}`
          ).join('; ');
        } catch {}
        showNotification({
          title: "Erro de Validação (400)",
          message: `Detalhes: ${detail}`,
          color: "yellow",
          icon: <IconAlertCircle />,
        });
      } else {
        showNotification({
          title: "Erro",
          message: `Falha ao ${isEditing ? 'editar' : 'adicionar'} o conteúdo.`,
          color: "red"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (conteudo: Conteudo) => {
    if (window.confirm(`Tem certeza que deseja excluir o conteúdo "${conteudo.titulo}"?`)) {
      setLoading(true);
      try {
        await api.delete(`${BASE_URL_API}${conteudo.id}/`);
        showNotification({ title: "Sucesso", message: "Conteúdo excluído.", color: "green" });
        await fetchConteudos();
      } catch (err) {
        showNotification({ title: "Erro", message: "Falha ao excluir o conteúdo. Verifique o endpoint e a API.", color: "red" });
      } finally {
        setLoading(false);
      }
    }
  };

  const rows = conteudos.map((conteudo) => (
    <Table.Tr key={conteudo.id}>
      <Table.Td>{conteudo.titulo}</Table.Td>
      <Table.Td>{conteudo.tipo}</Table.Td>
      <Table.Td>
        {conteudo.softSkills
          .map(skill => {
            const skillLabel = softSkillOptions.find(opt => opt.value === skill)?.label || skill;
            return skillLabel.charAt(0).toUpperCase() + skillLabel.slice(1);
          })
          .join(', ')
        }
      </Table.Td>
      <Table.Td>{new Date(conteudo.created_at).toLocaleDateString('pt-BR')}</Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        <Group gap="xs" justify="center">
          <Tooltip label="Editar" withArrow position="top">
            <ActionIcon variant="subtle" color="blue" onClick={() => handleOpenModal(conteudo)}>
              <IconPencil size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Excluir" withArrow position="top">
            <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(conteudo)} disabled={loading}>
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className="page-container" style={{ position: 'relative' }}>
      <LoadingOverlay visible={loading} overlayProps={{ radius: "sm", blur: 2 }} />

      <Group justify="flex-end" mt="md" mb="md">
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => handleOpenModal()}
          disabled={loading}
        >
          Adicionar Novo Conteúdo
        </Button>
      </Group>

      {error && (
        <Text color="red" mb="md" fw={500}>
          <IconAlertCircle size={16} style={{ marginRight: 4, verticalAlign: 'middle' }} />
          {error}
        </Text>
      )}

      <Table highlightOnHover withRowBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Título</Table.Th>
            <Table.Th>Tipo</Table.Th>
            <Table.Th>Soft Skills</Table.Th>
            <Table.Th>Criado em</Table.Th>
            <Table.Th style={{ textAlign: 'center' }}>Ações</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.length > 0 ? rows : (
            <Table.Tr>
              <Table.Td colSpan={5} style={{ textAlign: 'center' }}>
                {loading ? 'Carregando...' : 'Nenhum conteúdo cadastrado.'}
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>

     <Modal
        opened={modalOpened}
        onClose={handleCloseModal}
        title={isEditing}
        size="lg"
        className="modal-dark-form"
        classNames={{
          content: "modal-dark",
          header: "modal-dark-header",
          body: "modal-dark-body",
          title: "modal-dark-title",
        }}
      >
        <Box style={{ position: 'relative' }}>
          <LoadingOverlay visible={isSubmitting} overlayProps={{ radius: "sm", blur: 2 }} />
        <div className="modal-dark-form">
          <TextInput mt="md"
            label="Título do Conteúdo"
            placeholder="Ex: Comunicação Assertiva"
            required
            mb="md"
            value={form.titulo}
            onChange={(event) => setForm({ ...form, titulo: event.currentTarget.value })}
          />

          <Textarea
            label="Descrição Detalhada"
            placeholder="Descreva o conteúdo em detalhes..."
            required
            minRows={4}
            mb="md"
            value={form.descricao}
            onChange={(event) => setForm({ ...form, descricao: event.currentTarget.value })}
          />

          <MultiSelect
            withPortal={false}
            comboboxProps={{ withinPortal: false }}
            label="Soft Skills Relacionadas"
            data={softSkillOptions}
            placeholder="Selecione as soft skills"
            required
            mb="md"
            value={form.softSkills}
            onChange={(value) => setForm({ ...form, softSkills: value })}
          />

          <Select
            withPortal={false}
            comboboxProps={{ withinPortal: false }}
            label="Categoria ou Tipo de Conteúdo"
            label="Tipo de Conteúdo"
            placeholder="Selecione o tipo"
            data={tipoConteudoOptions}
            mb="md"
            value={form.tipo}
            onChange={(value) => value && setForm({ ...form, tipo: value })}
          />

          <TextInput
            label="Link do Conteúdo"
            placeholder="URL do arquivo"
            mb="lg"
            value={form.link}
            onChange={(event) => setForm({ ...form, link: event.currentTarget.value })}
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={handleCloseModal} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !form.titulo || !form.descricao || form.softSkills.length === 0}
            >
              {isEditing ? 'Salvar Edição' : 'Adicionar Conteúdo'}
            </Button>
          </Group>
           </div>
        </Box>
      </Modal>
   

    </Box>
  );
}

export default TrilhasAdmin;
