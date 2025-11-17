import { useEffect } from "react";
import * as echarts from "echarts";

function HobbiesPraticados() {

  useEffect(() => {
    const chart = echarts.init(document.getElementById("hobbiesChart"));

    const option = {
      title: {
        text: "Hobbies Praticados",
        left: "50%",
        top: 30,
        textAlign: "center",
        textStyle: {
          color: "white",
          fontSize: 25,
          fontWeight: "bold"
        }
      },

      tooltip: { trigger: "item" },

      xAxis: {
        type: "category",
        data: ["Leitura", "Caminhada", "Desenho", "Cozinhar"],
        axisLabel: { color: "white" },
        axisLine: { lineStyle: { color: "white" } }
      },

      yAxis: {
        type: "value",
        axisLabel: { color: "white" },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
        axisLine: { lineStyle: { color: "white" } }
      },

      grid: { left: "12%", right: "10%", top: 100, bottom: 40 },

      series: [
        {
          data: [12, 20, 15, 28, 18, 10],
          type: "bar",
          barWidth: "55%",
          itemStyle: {
            color: "#9B93F5",
            borderRadius: [4, 4, 0, 0]
          }
        }
      ]
    };

    chart.setOption(option);
  }, []);

  return (
    <div
      id="hobbiesChart"
      style={{
        width: "100%",
        height: "420px",
        borderRadius: "12px",
        padding: "10px"
      }}
    ></div>
  );
}

export default HobbiesPraticados;
