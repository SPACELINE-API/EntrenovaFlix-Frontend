# Implementação do Limite de 60 Funcionários no Plano Premium

## Resumo da Task
Implementar um limite de 60 funcionários para o plano premium no frontend da aplicação EntrenovaFlix, impedindo o cadastro de novos funcionários quando o limite for atingido.

## Mudanças Realizadas

### 1. Arquivo Modificado: `EntrenovaFlix/src/paginas/RH/FuncionariosRH.tsx`

#### Estados Adicionados:
- `countFuncionarios`: Estado para armazenar o número atual de funcionários cadastrados
- `loading`: Estado para controlar o carregamento inicial dos dados

#### Hook useEffect Adicionado:
- Executa uma chamada GET para `/funcionario` na montagem do componente
- Busca a lista de funcionários existentes e define o contador
- Trata erros de carregamento e define loading como false

#### Modificações no handleSubmit:
- Verificação antes da submissão: se `countFuncionarios >= 60`, exibe mensagem de erro e impede o cadastro
- Após cadastro bem-sucedido, incrementa o contador localmente (`setCountFuncionarios(countFuncionarios + 1)`)

#### Modificações no Botão de Submissão:
- Propriedade `disabled` adicionada: `disabled={countFuncionarios >= 60}`
- "Limite Atingido" quando limite alcançado, "Cadastrar Funcionário" caso contrário

## Funcionalidades Implementadas

### 1. Verificação de Limite em Tempo Real
- O componente busca o número atual de funcionários ao carregar
- Impede submissões quando o limite de 60 funcionários é atingido

### 2. Feedback Visual ao Usuário
- Botão desabilitado quando limite atingido
- Texto do botão muda para indicar o status
- Mensagem de erro específica quando tentativa de cadastro é feita

### 3. Atualização Automática do Contador
- Após cada cadastro bem-sucedido, o contador é incrementado localmente
- Mantém a sincronização sem precisar recarregar a página

## Considerações Técnicas

### API Utilizada:
- GET `/funcionario`: Retorna lista de funcionários para contar o total
- POST `/funcionario`: Endpoint existente para cadastro (não modificado)

### Estado de Loading:
- Controla o carregamento inicial dos dados
- Previne interações antes dos dados serem carregados
