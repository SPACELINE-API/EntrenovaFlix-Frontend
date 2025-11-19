import { useState, useEffect, useCallback } from "react";
import { Table, Group, Badge, Button, LoadingOverlay, Paper, ActionIcon, Tooltip, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPencil, IconTrash, IconRefresh, IconAlertCircle, IconChartBar } from '@tabler/icons-react';
import api from '../../services/apiService';
import '../../styles/funcionariosRH.css';
import '../../styles/empresasAdmin.css';
import { useNavigate } from "react-router-dom";

interface Empresa {
    cnpj: string;
    id: string; // Visivel na tabela
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

    const handleEditar = (empresa: Empresa) => {
        // Em desenvolvimento
    }
    const handleDiagnostico = (empresa: Empresa) => {
        navigate(`/entrenovaAdmin/diagnostico/${empresa.cnpj}`);
    };

    const handleDeletar = async (empresa: Empresa) => {
        // Em desenvolvimento
    }

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchEmpresas();
        setRefreshing(false);
    }

    const rows = empresas.map((emp) => (
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
            </Paper>
        </div>
    );
}

export default EmpresasAdmin;