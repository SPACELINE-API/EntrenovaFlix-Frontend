import QuestionBlock from './QuestionBlock';
import { useFormContext } from 'react-hook-form';


export default function Step3() {
  const { watch } = useFormContext();
  const selectedDimensions = watch('dimensoesAvaliar') || [];

  return (
    <div className="form-section">
      <h2 className="form-title">MINI-DIAGNÓSTICO DAS DIMENSÕES</h2>
      <p className="form-desc">Responda as perguntas para as dimensões que você selecionou na etapa anterior.</p>
      <div className="grupo-de-perguntas">

        {/* Pessoas & Cultura */}
        {selectedDimensions.includes('pessoasCultura') && (
          <div className="dimension-group">
            <h3 className="dimension-title">Dimensão: Pessoas & Cultura</h3>
            <QuestionBlock name="pessoasCultura_comunicacao" question="Como a comunicação acontece no dia a dia?" options={["Todos têm clareza e acesso fácil às informações.", "Funciona na maior parte do tempo, mas com algumas falhas.", "Normalmente só em reuniões formais ou quando há problemas.", "É confusa, cada líder comunica de um jeito."]} />
            <QuestionBlock name="pessoasCultura_lideranca" question="Como você descreveria o estilo de liderança predominante?" options={["Engajam e dão autonomia.", "São bons, mas variam conforme o líder.", "Centralizam muito as decisões.", "Raramente exercem liderança ativa."]} />
            <QuestionBlock name="pessoasCultura_resolucaoProblemas" question="Quando surgem problemas, como os times costumam agir?" options={["Trazem ideias e resolvem juntos.", "Resolvem, mas de forma reativa.", "Dependem sempre do gestor para decidir.", "Evitam mudanças e preferem manter como está."]} />
            <QuestionBlock name="pessoasCultura_rotina" question="Como está organizada a rotina de trabalho?" options={["Papéis e prioridades são claros.", "Há certa clareza, mas faltam recursos ou prazos realistas.", "Muitas vezes é confusa, com foco em 'apagar incêndios'.", "Não há organização definida, cada um faz do seu jeito."]} />
            <QuestionBlock name="pessoasCultura_valores" question="Até que ponto os valores da empresa estão presentes no dia a dia?" options={["Claros e vividos na prática.", "Conhecidos, mas pouco aplicados.", "Quase não são lembrados, só em discursos.", "Não há clareza sobre os valores."]} />
            <QuestionBlock name="pessoasCultura_ferramentas" question="Quais ferramentas apoiam pessoas & cultura?" options={["Temos plataforma estruturada de desenvolvimento.", "Algumas iniciativas digitais, mas sem consistência.", "Recursos informais (planilhas, grupos de mensagens).", "Não temos ferramentas definidas."]} />
          </div>
          
        )}

        {/* Estrutura & Operações */}
        {selectedDimensions.includes('estruturaOperacoes') && (
          <div className="dimension-group">
            <h3 className="dimension-title">Dimensão: Estrutura & Operações</h3>
            <QuestionBlock name="estruturaOperacoes_trocaInformacoes" question="Como é a troca de informações entre áreas?" options={["Integrada e frequente.", "Funciona em parte, com alguns ruídos.", "Depende de reuniões formais.", "As áreas trabalham isoladas."]} />
            <QuestionBlock name="estruturaOperacoes_delegacao" question="Como os gestores lidam com delegação?" options={["Delegam com clareza e confiança.", "Delegam, mas acompanham em excesso.", "Raramente delegam.", "Não delegam, concentram tudo."]} />
            <QuestionBlock name="estruturaOperacoes_processos" question="Quando processos falham, o que acontece?" options={["As equipes propõem melhorias rapidamente.", "Há ajustes, mas com demora.", "Só a gestão revisa processos.", "Nada muda, seguimos com os problemas."]} />
            <QuestionBlock name="estruturaOperacoes_autonomia" question="Quanta autonomia operacional os colaboradores têm?" options={["Alta, com responsabilidade.", "Alguma, mas dependem de aprovações.", "Pouca, com muito controle.", "Nenhuma, tudo vem da gestão."]} />
            <QuestionBlock name="estruturaOperacoes_qualidade" question="Qual é a relação da empresa com padrões de qualidade?" options={["Qualidade é prioridade e está no DNA.", "Importante, mas não sempre seguida.", "Depende da cobrança externa.", "Não há padrão definido."]} />
            <QuestionBlock name="estruturaOperacoes_ferramentas" question="Quais ferramentas apoiam as operações do dia a dia?" options={["Sistemas integrados (ERP, CRM, dashboards).", "Algumas ferramentas digitais, mas sem integração.", "Recursos básicos (planilhas, controles manuais).", "Não há ferramentas."]} />
          </div>
        )}

        {/* Mercado & Clientes */}
        {selectedDimensions.includes('mercadoClientes') && (
          <div className="dimension-group">
            <h3 className="dimension-title">Dimensão: Mercado & Clientes</h3>
            <QuestionBlock name="mercadoClientes_escuta" question="Como a empresa ouve seus clientes?" options={["Temos pesquisa estruturada e contínua.", "Fazemos de forma ocasional.", "Reagimos só em reclamações.", "Não há escuta formal."]} />
            <QuestionBlock name="mercadoClientes_colaboracao" question="Como vendas e atendimento trabalham juntos?" options={["Colaboram e compartilham informações.", "Trocam parcialmente, com falhas.", "Atuam isolados, sem integração.", "Há conflitos ou competição entre áreas."]} />
            <QuestionBlock name="mercadoClientes_reacaoMudanca" question="Quando o mercado muda, como a empresa reage?" options={["Antecipamos tendências e inovamos rápido.", "Ajustamos, mas com atraso.", "Só reagimos a crises.", "Não temos adaptação estruturada."]} />
            <QuestionBlock name="mercadoClientes_metas" question="Como é o acompanhamento de metas comerciais?" options={["Claro, transparente e frequente.", "Existe, mas pouco revisado.", "Informal, depende do gestor.", "Não temos acompanhamento."]} />
            <QuestionBlock name="mercadoClientes_diferencial" question="O diferencial competitivo está claro?" options={["Sim, é comunicado e reconhecido.", "Existe, mas pouco divulgado.", "É incerto, varia por área.", "Não está claro."]} />
            <QuestionBlock name="mercadoClientes_ferramentas" question="Quais ferramentas apoiam mercado & clientes?" options={["CRM, BI e pesquisas estruturadas.", "Algumas planilhas e relatórios.", "Feedbacks informais, dados dispersos.", "Não há recursos específicos."]} />
          </div>

        )}

        {/* Direção & Futuro */}
        {selectedDimensions.includes('direcaoFuturo') && (
          <div className="dimension-group">
            <h3 className="dimension-title">Dimensão: Direção & Futuro</h3>
            <QuestionBlock name="direcaoFuturo_visao" question="Como a visão de futuro é comunicada?" options={["Todos conhecem e entendem.", "É conhecida, mas só pela gestão.", "Quase não é falada.", "Não é comunicada."]} />
            <QuestionBlock name="direcaoFuturo_estrategia" question="Como os líderes conectam pessoas à estratégia?" options={["Inspiram e alinham metas claramente.", "Tentam alinhar, mas varia muito.", "Há pouca conexão.", "Não há esforço de alinhamento."]} />
            <QuestionBlock name="direcaoFuturo_inovacao" question="Qual é o papel da inovação no planejamento?" options={["Prioridade central, com projetos claros.", "Importante, mas sem orçamento.", "Acontece de forma isolada.", "Não é prioridade."]} />
            <QuestionBlock name="direcaoFuturo_conexaoEstrategia" question="Como as atividades diárias se conectam com a estratégia?" options={["Sempre, com clareza.", "Às vezes, depende do gestor.", "Raramente, não chega claro.", "Nunca, cada área segue isolada."]} />
            <QuestionBlock name="direcaoFuturo_proposito" question="Como a empresa lida com propósito e impacto social?" options={["Está no centro das decisões.", "É importante, mas secundário.", "Fala-se, mas não se aplica.", "Não há preocupação."]} />
            <QuestionBlock name="direcaoFuturo_ferramentas" question="Quais ferramentas apoiam a estratégia?" options={["Dashboards, OKRs, planejamentos formais.", "Algumas planilhas ou relatórios.", "Discussões informais, sem registro contínuo.", "Não temos instrumentos claros."]} />
          </div>

        )}
        
      </div>
    </div>
  );
}
