import React, { useState } from "react";
import { Box, Button, TextInput, PasswordInput, Group, Tooltip, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import api from "../../services/apiService";
import { IconLockCog } from "@tabler/icons-react";

export interface Funcionario {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  cpf?: string | null;
  telefone?: string | null;
  data_nascimento?: string | Date | null;
  password?: string;
  confirmarSenha?: string;
}

const validaCPF = (cpf: string | undefined | null): boolean => {
  if (!cpf) return false;
  const cpfLimpo = cpf.replace(/[^\d]+/g, "");
  if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) return false;
  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;
  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpfLimpo.substring(10, 11));
};

const funcionarioSchema = z
  .object({
    nome: z.string().min(1, "Nome inválido"),
    sobrenome: z.string().min(2, "Sobrenome inválido"),
    email: z.string().email("Email inválido"),
    cpf: z.string().min(14).refine(validaCPF, "CPF inválido"),
    telefone: z.string().min(14, "Telefone inválido"),
    data_nascimento: z.preprocess((arg) => {
      if (arg instanceof Date) return arg;
      if (typeof arg === "string" && arg.length > 0) return new Date(arg);
      return null;
    }, z.date({ invalid_type_error: "Data inválida" })),
    password: z.string(),
    confirmarSenha: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmarSenha) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Senhas não coincidem", path: ["confirmarSenha"] });
    }
  });

interface FormularioFuncionarioProps {
  initialData?: Funcionario | null;
  onSubmitSuccess?: (message: string) => void;
  onCancel?: () => void;
}

function formatCpf(value: string): string {
  const raw = value.replace(/\D/g, "");
  let formatted = raw;
  if (raw.length > 3) formatted = `${raw.slice(0, 3)}.${raw.slice(3)}`;
  if (raw.length > 6) formatted = `${formatted.slice(0, 7)}.${raw.slice(6)}`;
  if (raw.length > 9) formatted = `${formatted.slice(0, 11)}-${raw.slice(9, 11)}`;
  return formatted.slice(0, 14);
}

function formatTelefone(value: string): string {
  const raw = value.replace(/\D/g, "");
  let formatted = raw;
  if (raw.length > 2) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
  const ninthDigit = raw.length === 11;
  const splitIndex = ninthDigit ? 7 : 6;
  if (raw.length > splitIndex) formatted = `${formatted.slice(0, ninthDigit ? 10 : 9)}-${raw.slice(splitIndex)}`;
  return formatted.slice(0, 15);
}

const FormularioFuncionario: React.FC<FormularioFuncionarioProps> = ({ initialData, onSubmitSuccess, onCancel }) => {
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const form = useForm({
    initialValues: {
      nome: initialData?.nome || "",
      sobrenome: initialData?.sobrenome || "",
      email: initialData?.email || "",
      cpf: initialData?.cpf || "",
      telefone: initialData?.telefone || "",
      data_nascimento: initialData?.data_nascimento ? new Date(initialData.data_nascimento) : null,
      password: initialData?.password || "",
      confirmarSenha: initialData?.password || "",
    },
    validate: zodResolver(funcionarioSchema),
  });
  const handleChangeField = (field: keyof typeof form.values, value: any) => {
    form.setFieldValue(field, value);
    setMessage(null);
  };

  const handleAtribuirSenhaPadrao = () => {
    let data = form.values.data_nascimento;
    if (typeof data === "string") data = new Date(data);
    if (!data || isNaN(data.getTime())) {
      setMessage({ text: "Selecione uma data de nascimento válida primeiro", type: 'error' });
      return;
    }
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const senhaPadrao = `${dia}${mes}${ano}`;
    form.setFieldValue("password", senhaPadrao);
    form.setFieldValue("confirmarSenha", senhaPadrao);
    setMessage(null);
  };

  const handleSubmit = async (values: typeof form.values) => {
    setMessage(null);

    const dataNasc = values.data_nascimento;
    if (!dataNasc || isNaN(new Date(dataNasc).getTime())) {
      setMessage({ text: "Selecione uma data de nascimento válida.", type: 'error' });
      return;
    }

    const dadosApi = {
      nome: values.nome,
      sobrenome: values.sobrenome,
      email: values.email,
      cpf: values.cpf.replace(/\D/g, ""),
      telefone: values.telefone.replace(/\D/g, ""),
      data_nascimento: new Date(dataNasc).toISOString().split("T")[0],
      password: values.password,
    };

    try {
      if (initialData?.id) {
        await api.put(`/funcionarios/${initialData.id}`, dadosApi);
        setMessage({ text: "Funcionário editado com sucesso!", type: 'success' });
      } else {
        await api.post("/funcionarios", dadosApi);
        setMessage({ text: "Funcionário cadastrado com sucesso!", type: 'success' });
        form.reset();
      }

      if (onSubmitSuccess) onSubmitSuccess(message?.text || "Operação realizada com sucesso!");

    } catch (error: any) {
      const msg = error.response?.data?.message || "Erro ao salvar funcionário.";
      setMessage({ text: msg, type: 'error' });
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Group grow mb="sm">
        <TextInput
          label="Nome" placeholder="Ex: João" required
          value={form.values.nome}
          onChange={(e) => handleChangeField("nome", e.currentTarget.value)}
        />
        <TextInput
          label="Sobrenome" placeholder="Ex: Silva" required
          value={form.values.sobrenome}
          onChange={(e) => handleChangeField("sobrenome", e.currentTarget.value)}
        />
      </Group>

      <TextInput
        label="Email" placeholder="joao.silva@empresa.com" type="email" required mb="sm"
        value={form.values.email}
        onChange={(e) => handleChangeField("email", e.currentTarget.value)}
      />

      <Group grow mb="sm">
        <TextInput
          label="CPF" placeholder="000.000.000-00" required maxLength={14}
          value={form.values.cpf}
          onChange={(e) => handleChangeField("cpf", formatCpf(e.currentTarget.value))}
        />
        <TextInput
          label="Telefone" placeholder="(00) 00000-0000" required maxLength={15}
          value={form.values.telefone}
          onChange={(e) => handleChangeField("telefone", formatTelefone(e.currentTarget.value))}
        />
      </Group>

      <div className="rh-form-group">
        <label htmlFor="data_nascimento">
          Data de Nascimento <span className="required">*</span>
        </label>
        <input
          id="data_nascimento" type="date"
          value={form.values.data_nascimento ? form.values.data_nascimento.toISOString().split("T")[0] : ""}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              const [year, month, day] = value.split("-").map(Number);
              handleChangeField("data_nascimento", new Date(year, month - 1, day));
            } else handleChangeField("data_nascimento", null);
          }}
          className={`rh-input ${!form.values.data_nascimento ? "empty" : "has-value"}`}
        />
        {form.errors.data_nascimento && <Text color="red">{form.errors.data_nascimento}</Text>}
      </div>

      <PasswordInput
        label="Senha" placeholder="Crie ou gere uma senha" required mb="xs"
        value={form.values.password}
        onChange={(e) => handleChangeField("password", e.currentTarget.value)}
        classNames={{
                innerInput: 'place'
              }}
      />
      <PasswordInput
        label="Confirmar Senha" placeholder="Confirme a senha" required mb="lg"
        value={form.values.confirmarSenha}
        onChange={(e) => handleChangeField("confirmarSenha", e.currentTarget.value)}
        classNames={{
                innerInput: 'place'
              }}
      />

      <Group justify="space-between" mt="xl" align="center">
        <Tooltip label="Gera senha padrão (DDMMYYYY) da data de nascimento.">
          <Button type="button" onClick={handleAtribuirSenhaPadrao} leftSection={<IconLockCog size={16} />} disabled={!form.values.data_nascimento}>
            Gerar Padrão
          </Button>
        </Tooltip>

        <Group gap="sm" align="center">
          {message && (
            <Text color={message.type === 'success' ? 'teal' : 'red'} fw={600}>
              {message.text}
            </Text>
          )}          
          <Button type="submit" className="entreg">{initialData ? "Salvar Alterações" : "Cadastrar"}</Button>
        </Group>
      </Group>
    </Box>
  );
};

export default FormularioFuncionario;
