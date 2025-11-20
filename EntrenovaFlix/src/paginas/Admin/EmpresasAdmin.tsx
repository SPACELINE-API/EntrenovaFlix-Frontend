import { useState, useEffect, useCallback, useMemo } from "react";
import { modals } from '@mantine/modals';
import { Table, Group, Badge, Button, LoadingOverlay, Paper, ActionIcon, Tooltip, Text, Modal, TextInput, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { IconPencil, IconTrash, IconRefresh, IconAlertCircle, IconChartBar, IconCircleDashed, IconCircleDashedCheck, IconFilterOff } from '@tabler/icons-react';
import api from '../../services/apiService';
import '../../styles/funcionariosRH.css';
import '../../styles/empresasAdmin.css';
import { useNavigate } from "react-router-dom";
import FormularioEmpresas from './formularioEmpresas';
import { set } from "react-hook-form";

interface Empresa {
    cnpj: string;
    id: string;
    nome: string; // Visivel na tabela
    area: string; // Visivel na tabela
    plano: string | null; // Visivel na tabela
    is_active: boolean; // Visivel na tabela
    lead: number; // Visibel na tabela
    status_pagamento: 'pendente' | 'aprovado';
    created_at: string;
    total_usuarios: number;
}

function EmpresasAdmin() {
    const navigate = useNavigate();
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [editingEmpresa, setEditingEmpresa] = useState<Empresa | null>(null);
    // filtros
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>("all");
    const [sortOrder, setSortOrder] = useState<'default' | 'leadAsc' | 'leadDesc'>("default");

    const fetchEmpresas = useCallback(async () => {
        setLoading(true);
        try {
            const resp = await api.get<Empresa[]>("empresas");
            setEmpresas(resp.data);
        }
        catch (err: any) {
            console.error("Erro ao buscar empresas:", err);
            showNotification({
                title: "Erro",
                message: "Não foi possível carregar as empresas.",
                color: "red",
                icon: <IconAlertCircle />,
                autoClose: 4000,
                position: 'top-right',
            });
        }
        finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmpresas();
    }, [fetchEmpresas]);

    const clearFilters = () => {
        setSearch("");
        setStatusFilter("all");
        setSortOrder("default");
    };

    const filteredEmpresas = useMemo(() => {
        const filtered = empresas.filter((e) => {
            const matchesName = e.nome.toLowerCase().includes(search.trim().toLowerCase());
            const matchesStatus = statusFilter === 'all' ? true : statusFilter === 'active' ? e.is_active : !e.is_active;
            return matchesName && matchesStatus;
        });

        const sorted = filtered.slice();
        if (sortOrder === 'leadAsc') {
            sorted.sort((a, b) => a.lead - b.lead);
        } else if (sortOrder === 'leadDesc') {
            sorted.sort((a, b) => b.lead - a.lead);
        } else {
            // padrão: alfabética por nome (A→Z)
            sorted.sort((a, b) => a.nome.localeCompare(b.nome, undefined, { sensitivity: 'base' }));
        }
        return sorted;
    }, [empresas, search, statusFilter, sortOrder]);

    const handleEditar = (empresa: Empresa) => {
        setEditingEmpresa(empresa);
        openModal();
    }
    
    const handleDiagnostico = (empresa: Empresa) => {
        navigate(`/entrenovaAdmin/diagnostico/${empresa.cnpj}`);
    };

    const handleToggleAtivo = (empresa: Empresa) => {
        const novoStatus = !empresa.is_active;
        modals.openConfirmModal({
            title: novoStatus ? 'Ativar Empresa' : 'Desativar Empresa',
            centered: true,
            children: (
                <Text size="sm" style={{color: 'white'}}>
                    {novoStatus ? (
                        <>Confirmar ativação da empresa <strong>{empresa.nome}</strong>?</>
                    ) : (
                        <>Confirmar desativação da empresa <strong>{empresa.nome}</strong>?</>
                    )}
                </Text>
            ),
            labels: { confirm: novoStatus ? 'Ativar' : 'Desativar', cancel: 'Cancelar' },
            confirmProps: { color: novoStatus ? 'green' : 'red' },
            className: "modal-custom",
            onConfirm: async () => {
                try {
                    const payload = { 
                        nome: empresa.nome, 
                        area: empresa.area, 
                        lead: empresa.lead,
                        is_active: novoStatus, 
                    };
                    await api.patch(`empresas/${empresa.cnpj}`, payload);
                    setEmpresas(prev =>
                        prev.map(e => e.cnpj === empresa.cnpj ? { ...e, is_active: novoStatus } : e)
                    );
                    showNotification({
                        title: novoStatus ? 'Empresa ativada' : 'Empresa desativada',
                        message: `Empresa ${empresa.nome} ${novoStatus ? 'ativada' : 'desativada'} com sucesso.`,
                        color: novoStatus ? "orange" : "gray",
                        autoClose: 4000,
                        position: 'top-right',
                    });
                } catch (err: any) {
                    showNotification({
                        title: "Erro ao atualizar status",
                        message: `Não foi possível atualizar o status da empresa ${empresa.nome}.`,
                        color: "red",
                        icon: <IconAlertCircle />,
                        autoClose: 4000,
                        position: 'top-right',
                    });
                }
            }
        });
    };

    const handleDeletar = async (empresa: Empresa) => {
        modals.openConfirmModal({
            title: 'Confirmação de Exclusão',
            children: (
                <Text size="sm" style={{color: 'white'}}>
                    Tem certeza que deseja deletar a empresa <strong>{empresa.nome}</strong>? Esta ação é irreversível.
                </Text>
            ),
            labels: { confirm: 'Deletar', cancel: 'Cancelar' },
            confirmProps: { color: 'red' },
            className: "modal-custom",
            onConfirm: async () => {
                try {
                    await api.delete(`empresas/${empresa.cnpj}`);
                    showNotification({
                        title: "Sucesso",
                        message: `Empresa ${empresa.nome} deletada com sucesso.`,
                        color: "green",
                        autoClose: 4000,
                        position: 'top-right',
                    });
                    fetchEmpresas();
                } catch (err: any) {
                    showNotification({
                        title: "Erro",
                        message: `Não foi possível deletar a empresa ${empresa.nome}.`,
                        color: "red",
                        icon: <IconAlertCircle />,
                        autoClose: 4000,
                        position: 'top-right',
                    });
                }
            }
        });
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchEmpresas();
        setRefreshing(false);
    }

    const rows = filteredEmpresas.map((emp) => (
        <Table.Tr key={emp.id}>
            <Table.Td>{emp.nome}</Table.Td>
            <Table.Td>{emp.area}</Table.Td>
            <Table.Td>{emp.plano || '-'}</Table.Td>
            <Table.Td style={{ textAlign: 'center' }}>{emp.total_usuarios}</Table.Td>
            <Table.Td style={{ textAlign: 'center' }}>{emp.lead}</Table.Td>
            <Table.Td>
                <Badge className={emp.is_active ? 'badge-active' : 'badge-inactive'}>
                    {emp.is_active ? 'Ativa' : 'Inativa'}
                </Badge>
            </Table.Td>
            
            {/* Botões de Ações */}
            <Table.Td className="th-actions">
                <Group gap="xs">
                    <Tooltip label="Editar" withArrow position="top">
                        <ActionIcon variant="subtle" color="blue" onClick={() => handleEditar(emp)}>
                            <IconPencil size={18} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Ver Diagnóstico" withArrow position="top">
                        <ActionIcon variant="subtle" color="teal" onClick={() => handleDiagnostico(emp)}>
                            <IconChartBar size={18} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label={emp.is_active ? 'Desativar' : 'Ativar'} withArrow position="top">
                        <ActionIcon
                            variant="subtle"
                            color={emp.is_active ?  "gray" : "orange"}
                            onClick={() => handleToggleAtivo(emp)}
                        >
                            {emp.is_active ? (
                                <IconCircleDashed size={18} />
                            ) : (
                                <IconCircleDashedCheck size={18} />
                            )}
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Deletar" withArrow position="top">
                        <ActionIcon variant="subtle" color="red" onClick={() => handleDeletar(emp)}>
                            <IconTrash size={18} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <div>
            <h1 style={{marginBottom: 32}}>Empresas</h1>
            <Paper className="empresas-container" shadow="xs" radius="md" withBorder>
                <Group justify="space-between" mb="xl" className="header-group">
                    <div>
                        <Text component="h1" size="xl" fw={700} className="header-title">Gerenciamento de Empresas Contratantes</Text>
                    </div>
                    <Button
                        variant="light"
                        leftSection={<IconRefresh size={16} />}
                        loading={refreshing}
                        onClick={handleRefresh}
                    >
                        Atualizar
                    </Button>
                </Group>

                {/* Barra de filtros */}
                <Group gap="sm" mb="md" align="end">
                    <TextInput
                        label="Pesquisar nome"
                        placeholder="Buscar por nome..."
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        classNames={{ input: 'rh-input' }}
                        style={{ flex: 1 }}
                    />
                    <Select
                        label="Status"
                        value={statusFilter}
                        onChange={(v) => setStatusFilter((v as 'all' | 'active' | 'inactive') || 'all')}
                        data={[
                            { value: 'all', label: 'Todos' },
                            { value: 'active', label: 'Ativas' },
                            { value: 'inactive', label: 'Inativas' },
                        ]}
                        w={180}
                    />
                    <Select
                        label="Ordenar"
                        value={sortOrder}
                        onChange={(v) => setSortOrder((v as 'default' | 'leadAsc' | 'leadDesc') || 'default')}
                        data={[
                            { value: 'default', label: 'Padrão (A → Z)' },
                            { value: 'leadAsc', label: 'Lead (menor → maior)' },
                            { value: 'leadDesc', label: 'Lead (maior → menor)' },
                        ]}
                        w={220}
                    />
                    <ActionIcon w={36} h={36} variant="default" onClick={clearFilters} title="Limpar filtros" aria-label="Limpar filtros">
                        <IconFilterOff size={24} />
                    </ActionIcon>
                </Group>

                <Table.ScrollContainer minWidth={900}>
                    <LoadingOverlay visible={loading} className="loading-overlay" overlayProps={{color: '#4a4a4a', blur: 2, radius: 8}} />
                    <Table striped highlightOnHover highlightOnHoverColor="#252525ff" withColumnBorders className="empresas-table">
                        <Table.Thead >
                            <Table.Tr>
                                <Table.Th>Nome</Table.Th>
                                <Table.Th>Área</Table.Th>
                                <Table.Th>Plano</Table.Th>
                                <Table.Th style={{textAlign: 'center', width: 80}}>Funcionários Ativos</Table.Th>
                                <Table.Th style={{textAlign: 'center'}}>Lead</Table.Th>
                                <Table.Th style={{textAlign: 'center'}}>Status</Table.Th>
                                <Table.Th className="th-actions">Ações</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {rows.length ? rows : ( 
                                <Table.Tr>
                                    <Table.Td colSpan={8} style={{ textAlign: 'center' }}>
                                        {refreshing ? 'Atualizando empresas...' : 'Nenhuma empresa encontrada.'}
                                    </Table.Td>
                                </Table.Tr>
                            )}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
                <Modal
                    opened={modalOpened}
                    onClose={() => { closeModal(); setEditingEmpresa(null); }}
                    title={editingEmpresa ? `Editar ${editingEmpresa.nome}` : 'Editar Empresa'}
                    size="lg"
                    centered
                    className="modal-custom"
                >
                    {editingEmpresa && (
                        <FormularioEmpresas
                            initialData={{
                                cnpj: editingEmpresa.cnpj,
                                nome: editingEmpresa.nome,
                                area: editingEmpresa.area,
                                lead: editingEmpresa.lead,
                                is_active: editingEmpresa.is_active,
                            }}
                            onSubmitSuccess={() => {
                                fetchEmpresas();
                                setEditingEmpresa(null);
                                closeModal();
                                showNotification({ title: 'Sucesso', message: 'Empresa atualizada com sucesso!', color: 'teal' });
                            }}
                            onCancel={() => { closeModal(); setEditingEmpresa(null); }}
                        />
                    )}
                </Modal>
            </Paper>
        </div>
    );
}

export default EmpresasAdmin;