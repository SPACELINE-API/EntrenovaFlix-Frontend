import { RadialBarChart, RadialBar, Legend, ResponsiveContainer, Tooltip } from "recharts";

interface GraficoTrilhasProps {
  isLoading: boolean;
  hasError: boolean;
  data: { nome: string; acessos: number }[] | undefined;
}

const COLORS = [
  "#ff6ec7", 
  "#c47bff",
  "#7f6bff", 
  "#6aa8ff", 
];


export default function GraficoTrilhas({ isLoading, hasError, data }: GraficoTrilhasProps) {
  const isDataEmpty = !data || data.length === 0;

  const chartData = data?.map((item, index) => ({
    name: item.nome,
    uv: item.acessos,
    fill: COLORS[index % COLORS.length]
  }));

  const totalAcessos = data?.reduce((acc, item) => acc + item.acessos, 0) || 0;

  return (
    <div className="grafico-widget-container" style={{ position: "relative", paddingBottom: "40px" }}>
      <h3>Trilhas Mais Acessadas</h3>

      {isLoading && <div className="grafico-loading">Carregando...</div>}
      {!isLoading && hasError && <div className="grafico-error">Erro ao carregar.</div>}
      {!isLoading && !hasError && isDataEmpty && <div className="grafico-empty">Nenhum dado disponível.</div>}

      {!isLoading && !hasError && !isDataEmpty && (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart
              cx="50%"
              cy="48%"
              innerRadius="35%"
              outerRadius="95%"
              barSize={16}
              data={chartData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="uv"
                background={{ fill: "rgba(255,255,255,0.05)" }}
              />

              <Legend
                iconSize={12}
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  marginTop: "18px",
                  fontSize: "0.75rem",
                  color: "#aab2d5"
                }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(20,20,30,0.85)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  padding: "8px 12px"
                }}
                labelStyle={{ color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -40%)",
              textAlign: "center",
              pointerEvents: "none"
            }}
          >
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#aab2d5" }}>Total</p>
            <p style={{ margin: 0, fontSize: "1.7rem", fontWeight: 700, color: "#fff" }}>
              {totalAcessos}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
