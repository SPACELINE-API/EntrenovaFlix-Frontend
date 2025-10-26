import { useState, useEffect } from "react";
import { Button, Table, Modal, LoadingOverlay, Badge, ActionIcon, Tooltip, Group, Text, Paper } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconTrash, IconUserCheck, IconUserOff, IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { showNotification } from '@mantine/notifications';
import api from "../../services/apiService";
import FormularioFuncionario from "./formularioFuncionario";
import '../../styles/funcionariosRH.css';

interface Funcionario {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
    is_active: boolean;
    role: string;
    date_joined: string;
    cpf?: string | null;
    telefone?: string | null;
    data_nascimento?: string | Date | null;
}

function FuncionariosRH() {
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [editingFuncionario, setEditingFuncionario] = useState<Funcionario | null>(null);

    const fetchFuncionarios = async () => {
        setLoading(true);
        try {
            const response = await api.get("funcionarios");
            setFuncionarios(response.data);
        } catch (err: any) {
            console.error("Erro ao buscar funcionários:", err);
            showNotification({
                title: 'Erro',
                message: err.response?.data?.error || 'Não foi possível carregar a lista de funcionários.',
                color: 'red',
                icon: <IconAlertCircle />,
                autoClose: 4000,
                position: 'top-right',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (funcionario: Funcionario) => {
        const novoStatus = !funcionario.is_active;
        const actionText = novoStatus ? 'ativar' : 'desativar';
        try {
            await api.patch('funcionarios', { id: funcionario.id, ativo: novoStatus });
            setFuncionarios(funcs => funcs.map(f => f.id === funcionario.id ? { ...f, is_active: novoStatus } : f));
            showNotification({
                title: 'Sucesso',
                message: `Funcionário ${actionText} com sucesso.`,
                color: 'teal',
                icon: <IconCheck />,
                autoClose: 3000,
                position: 'top-right',
            });
        } catch (err: any) {
            console.error("Erro ao alterar status:", err);
            showNotification({
                title: 'Erro',
                message: err.response?.data?.error || `Falha ao ${actionText} funcionário.`,
                color: 'red',
                icon: <IconAlertCircle />,
                autoClose: 4000,
                position: 'top-right',
            });
        }
    };

    const handleDelete = async (funcionarioId: number) => {
        if (!window.confirm("Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita.")) return;
        try {
            await api.delete('funcionarios', { data: { id: funcionarioId } });
            fetchFuncionarios();
            showNotification({
                title: 'Sucesso',
                message: 'Funcionário excluído com sucesso.',
                color: 'teal',
                icon: <IconCheck />,
                autoClose: 3000,
                position: 'top-right',
            });
        } catch (err: any) {
            console.error("Erro ao excluir funcionário:", err);
            showNotification({
                title: 'Erro',
                message: err.response?.data?.error || 'Falha ao excluir funcionário.',
                color: 'red',
                icon: <IconAlertCircle />,
                autoClose: 4000,
                position: 'top-right',
            });
        }
    };

    const handleFormSuccess = (message: string) => {
        fetchFuncionarios();
        setEditingFuncionario(null);
        showNotification({
            title: 'Sucesso',
            message,
            color: 'teal',
            icon: <IconCheck />,
            autoClose: 4000,
            position: 'top-right',
        });
    };

    const handleEdit = (funcionario: Funcionario) => {
        setEditingFuncionario(funcionario);
        openModal();
    };

    const handleAddNew = () => {
        setEditingFuncionario(null);
        openModal();
    };

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    const rows = funcionarios.map((func) => (
        <Table.Tr key={func.id}>
            <Table.Td>{func.nome} {func.sobrenome}</Table.Td>
            <Table.Td>{func.email}</Table.Td>
            <Table.Td>
                <Badge className={func.is_active ? "badge-active" : "badge-inactive"}>
                    {func.is_active ? 'Ativo' : 'Inativo'}
                </Badge>
            </Table.Td>
            <Table.Td className="actions-cell">
                <Group gap="xs">
                    <Tooltip label={func.is_active ? 'Desativar' : 'Ativar'}>
                        <ActionIcon
                            className={func.is_active ? "action-toggle-off" : "action-toggle-on"}
                            onClick={() => handleToggleActive(func)}
                        >
                            {func.is_active ? <IconUserOff size={18}/> : <IconUserCheck size={18}/> }
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Excluir">
                        <ActionIcon className="action-delete" onClick={() => handleDelete(func.id)}>
                            <IconTrash size={18}/>
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Paper className="funcionarios-container" shadow="xs" radius="md" withBorder>
            <LoadingOverlay visible={loading} className="loading-overlay"/>
            
            <Group justify="space-between" mb="xl" className="header-group">
                <div>
                    <Text component="h1" size="xl" fw={700} className="header-title">Gerenciamento de Funcionários</Text>
                </div>
                <Button className="btn-add" leftSection={<IconPlus size={16} />} onClick={handleAddNew}>
                    Cadastrar Funcionário
                </Button>
            </Group>

            <Table.ScrollContainer minWidth={600}>
                <Table striped highlightOnHover withTableBorder withColumnBorders className="funcionarios-table">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nome Completo</Table.Th>
                            <Table.Th>Email</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th className="th-actions">Ações</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {rows.length > 0 ? rows : (
                            <Table.Tr>
                                <Table.Td colSpan={4} className="no-data">
                                    Nenhum funcionário cadastrado.
                                </Table.Td>
                            </Table.Tr>
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <Modal
                opened={modalOpened}
                onClose={() => { closeModal(); setEditingFuncionario(null); }}
                title={editingFuncionario ? "Editar Funcionário" : "Cadastrar Novo Funcionário"}
                size="lg"
                centered
                className="modal-custom"
            >
                <FormularioFuncionario
                  initialData={editingFuncionario} 
                  onSubmitSuccess={handleFormSuccess}
                  onCancel={() => { closeModal(); setEditingFuncionario(null); }}
                />
            </Modal>
        </Paper>
    );
}

export default FuncionariosRH;
