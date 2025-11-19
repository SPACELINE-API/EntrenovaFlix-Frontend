import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GraficoPlanos({ isLoading, hasError, data }: any) {
  const isDataEmpty = !data || data.length === 0;

  return (
    <div className="grafico-widget-container">
      <h3>Planos Mais Assinados</h3>

      {isLoading && <div className="grafico-loading">Carregando...</div>}
      {hasError && <div className="grafico-error">Erro ao carregar.</div>}
      {isDataEmpty && <div className="grafico-empty">Nenhum dado disponível.</div>}

      {!isLoading && !hasError && !isDataEmpty && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 20, bottom: 40, left: 20 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="plano_nome" />
            <Tooltip />
            <Bar dataKey="assinantes" fill="#7f6bff" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
