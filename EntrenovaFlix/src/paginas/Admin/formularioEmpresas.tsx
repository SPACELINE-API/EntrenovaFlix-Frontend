import { useState } from "react";
import { Box, Button, TextInput, Group } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import api from "../../services/apiService";
import { showNotification } from "@mantine/notifications";
import { IconAlertCircle } from "@tabler/icons-react";

export interface EmpresaFormData {
    cnpj: string;
    nome: string;
    area: string;
    lead: number;
    is_active: boolean;
}

interface FormularioEmpresasProps {
    initialData: EmpresaFormData; // obrigatório para edição
    onSubmitSuccess?: (message: string) => void;
    onCancel?: () => void;
}

const empresaSchema = z.object({
    nome: z.string().min(1, "Nome inválido"),
    area: z.string().min(2, "Área inválida"),
    lead: z.preprocess(
        (v) => {
            if (typeof v === 'string') {
                const s = v.trim();
                if (s === '') return NaN; // força erro quando vazio
                return Number(s);
            }
            return v;
        },
        z
            .number({ invalid_type_error: 'Lead inválido' })
            .refine((v) => Number.isInteger(v) && v >= 0, 'Lead deve ser inteiro e ≥ 0')
    ),
    is_active: z.boolean(),
});

const FormularioEmpresas: React.FC<FormularioEmpresasProps> = ({ initialData, onSubmitSuccess, onCancel }) => {
    const [submitting, setSubmitting] = useState(false);

    const form = useForm({
        initialValues: {
            cnpj: initialData.cnpj,
            nome: initialData.nome,
            area: initialData.area,
            lead: initialData.lead,
            is_active: initialData.is_active,
        },
        validate: zodResolver(empresaSchema),
        validateInputOnBlur: true,
    });

    const handleChangeField = (field: keyof typeof form.values, value: any) => {
        form.setFieldValue(field, value);
    };

    const handleSubmit = async (values: typeof form.values) => {
        setSubmitting(true);
        try {
            const payload = {
                nome: values.nome,
                area: values.area,
                lead: values.lead,
                is_active: values.is_active,
            };
            await api.patch(`empresas/${initialData.cnpj}`, payload);
            onSubmitSuccess?.('Empresa atualizada com sucesso!');
        } catch (error: any) {
            const errorMsg = error.response?.data?.message || 'Erro ao atualizar empresa.';
            showNotification({
                title: 'Erro',
                message: errorMsg,
                color: 'red',
                icon: <IconAlertCircle />,
                autoClose: 4000,
                position: 'top-right',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate>
            <TextInput
                label="CNPJ"
                value={form.values.cnpj}
                disabled
                classNames={{ input: 'rh-input' }}
                mb="sm"
            />

            <TextInput
                label="Nome da Empresa"
                placeholder="Digite o nome da empresa"
                value={form.values.nome}
                onChange={(event) => handleChangeField('nome', event.currentTarget.value)}
                error={form.errors.nome}
                required
                classNames={{ input: 'rh-input' }}
                mb="sm"
            />

            <Group grow mb="sm">
                <TextInput
                    label="Lead"
                    type="number"
                    value={String(form.values.lead)}
                    onChange={(e) => handleChangeField('lead', e.currentTarget.value)}
                    error={form.errors.lead}
                    required
                    classNames={{ input: 'rh-input' }}
                />

                <TextInput
                    label="Área de serviço"
                    placeholder="Digite a área de serviço"
                    value={form.values.area}
                    onChange={(event) => handleChangeField('area', event.currentTarget.value)}
                    error={form.errors.area}
                    required
                    classNames={{ input: 'rh-input' }}
                />
            </Group>
            <Group justify="space-between" mt="md">
                <Button variant="default" onClick={onCancel}>Cancelar</Button>
                <Button type="submit" className="entreg" loading={submitting} disabled={submitting}>Salvar Alterações</Button>
            </Group>
        </Box>
    );
}

export default FormularioEmpresas;