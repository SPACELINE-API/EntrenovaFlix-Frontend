import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function GraficoDimensoes({ isLoading, hasError, data }:any) {
  const isDataEmpty = !data || data.length === 0;

  return (
    <div className="grafico-widget-container">
      <h3>Dimensões mais trabalhadas</h3>

      {isLoading && <div className="grafico-loading">Carregando...</div>}
      {hasError && <div className="grafico-error">Erro ao carregar.</div>}
      {isDataEmpty && <div className="grafico-empty">Nenhum dado disponível.</div>}

      {!isLoading && !hasError && !isDataEmpty && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />

            <Bar dataKey="trabalhadas" stackId="a" fill="#6aa8ff" />
            <Bar dataKey="extras" stackId="a" fill="#ff75e8ff" />

          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
