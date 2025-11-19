import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function GraficoEngajamento({ isLoading, hasError, data }:any) {
  const isDataEmpty = !data || data.length === 0;

  const chartData = data?.map((item:any) => ({
    mes: item[0],
    engajamento: item[1],
    crescimento: item[2],
  }));

  return (
    <div className="grafico-widget-container">
      <h3>Engajamento vs Crescimento</h3>

      {isLoading && <div className="grafico-loading">Carregando...</div>}
      {!isLoading && hasError && <div className="grafico-error">Erro.</div>}
      {!isLoading && !hasError && isDataEmpty && <div className="grafico-empty">Nenhum dado.</div>}

      {!isLoading && !hasError && !isDataEmpty && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="engajamento"
              stroke="#0a9396"
              strokeWidth={3}
              dot={{ r: 5 }}
            />

            <Line
              type="monotone"
              dataKey="crescimento"
              stroke="#ee9b00"
              strokeWidth={3}
              strokeDasharray="4 3"
              dot={{ r: 5, stroke: "#ee9b00", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
