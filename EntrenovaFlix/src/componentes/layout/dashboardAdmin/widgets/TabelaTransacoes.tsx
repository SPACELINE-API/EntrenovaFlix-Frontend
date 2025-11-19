import { FaMoneyCheckAlt } from 'react-icons/fa'; 

interface Transacao {
  id: string;
  empresa: string; 
  valor: number;   
  data: string;   
  plano: string;   
  metodo: string;  
}

interface TabelaTransProps {
  isLoading: boolean;
  hasError: boolean;
  data: Transacao[] | undefined;
}

export default function TabelaTransacoes({
  isLoading,
  hasError,
  data
}: TabelaTransProps) {

  const isDataEmpty = !data || data.length === 0;

  return (
    <div className="tabela-widget-container">
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
        <h3>Histórico de Transações</h3>
        <span style={{fontSize: '0.8rem', color: '#e74c3c', cursor: 'pointer'}}>View All</span>
      </div>

      {isLoading && (
        <div className="tabela-loading">Carregando transações...</div>
      )}
      {!isLoading && hasError && (
        <div className="tabela-error">Erro ao carregar as transações.</div>
      )}
      {!isLoading && !hasError && isDataEmpty && (
        <div className="tabela-empty">Nenhuma transação encontrada.</div>
      )}
      
      {!isLoading && !hasError && !isDataEmpty && (
        <table className="tabela-transacoes">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Data</th>
              <th>Plano</th> 
              <th>Valor</th>
              <th>Método</th> 
            </tr>
          </thead>

          <tbody>
            {data!.map((transacao) => (
              <tr key={transacao.id}>
                <td>
                  <span style={{fontWeight: '600', color: '#fff'}}>{transacao.empresa}</span>
                </td>
                
                <td>
                  {new Date(transacao.data).toLocaleDateString("pt-BR")}
                </td>
                
                <td>
                  <span className={`badge-plano ${transacao.plano.toLowerCase()}`}>
                    {transacao.plano}
                  </span>
                </td>

                <td style={{fontWeight: 'bold', color: '#2ecc71'}}>
                  {transacao.valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </td>

                <td>
                  <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                     <FaMoneyCheckAlt /> {transacao.metodo}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}