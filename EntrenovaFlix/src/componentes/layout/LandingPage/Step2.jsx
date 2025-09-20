import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Step2() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="form-section">
      <h2 className="form-title">Desafios e Objetivos</h2>
      <p className="form-desc">O que é mais importante para sua empresa neste momento?</p>

      {/* Container para todos os grupos de perguntas */}
      <div className="grupo-de-perguntas">
        
        {/* Grupo 1: Desafios */}
        <div className="input-group">
          <label className="form-label">Desafios prioritários (escolha até 3):</label>
          <div className="checkbox-group">
            <label><input type="checkbox" value="comunicacao" {...register('desafiosPrioritarios')} /> Comunicação & Relacionamento</label>
            <label><input type="checkbox" value="lideranca" {...register('desafiosPrioritarios')} /> Liderança & Colaboração</label>
            <label><input type="checkbox" value="criatividade" {...register('desafiosPrioritarios')} /> Criatividade & Resolução de Problemas</label>
            <label><input type="checkbox" value="autogestao" {...register('desafiosPrioritarios')} /> Autogestão & Produtividade</label>
            <label><input type="checkbox" value="cultura" {...register('desafiosPrioritarios')} /> Cultura & Valores</label>
          </div>
          {errors.desafiosPrioritarios && <p className="error">{errors.desafiosPrioritarios.message}</p>}
        </div>

        {/* Grupo 2: Objetivos */}
        <div className="input-group">
          <label className="form-label">Objetivos principais (escolha até 3):</label>
          <div className="checkbox-group">
            <label><input type="checkbox" value="fortalecerPessoas" {...register('objetivosPrincipais')} /> Fortalecer Pessoas & Cultura</label>
            <label><input type="checkbox" value="melhorarEstrutura" {...register('objetivosPrincipais')} /> Melhorar Estrutura & Operações</label>
            <label><input type="checkbox" value="aprimorarMercado" {...register('objetivosPrincipais')} /> Aprimorar Mercado & Clientes</label>
            <label><input type="checkbox" value="consolidarDirecao" {...register('objetivosPrincipais')} /> Consolidar Direção & Futuro</label>
          </div>
          {errors.objetivosPrincipais && <p className="error">{errors.objetivosPrincipais.message}</p>}
        </div>

        {/* Grupo 3: Dimensões */}
        <div className="input-group">
          <label className="form-label">Agora, escolha até 3 dimensões para avaliar em detalhe:</label>
          <div className="checkbox-group">
            <label><input type="checkbox" value="pessoasCultura" {...register('dimensoesAvaliar')} /> Pessoas e Cultura</label>
            <label><input type="checkbox" value="estruturaOperacoes" {...register('dimensoesAvaliar')} /> Estrutura e Operações</label>
            <label><input type="checkbox" value="mercadoClientes" {...register('dimensoesAvaliar')} /> Mercado e Clientes</label>
            <label><input type="checkbox" value="direcaoFuturo" {...register('dimensoesAvaliar')} /> Direção e Futuro</label>
          </div>
          {errors.dimensoesAvaliar && <p className="error">{errors.dimensoesAvaliar.message}</p>}
        </div>

      </div>
    </div>
  );
}

