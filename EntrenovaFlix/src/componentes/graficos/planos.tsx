import ReactECharts from "echarts-for-react";

const GraficoPlano = () => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        let result = `<b>${params[0].axisValue}</b><br/>`;
        params.forEach((item: any) => {
          result += `${item.marker} ${item.seriesName}: <b>${item.value}</b><br/>`;
        });
        return result;
      },
    },
    legend: {
      data: ["Assinantes", "Conteúdos", "Recursos"],
      top: 10,
      textStyle: {
        color: "#ffffff", 
        fontSize: 14,
      },
    },
    grid: {
      top: 80,
      bottom: 50,
      left: 50,
      right: 50,
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: ["Essencial", "Premium", "Diamante"],
        axisLabel: {
          fontSize: 14,
          fontWeight: "bold",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Quantidade",
        max: 100,
      },
    ],
    color: ["#9ca3af", "#5449cc", "#cba921ff"], 
    series: [
      {
        name: "Assinantes",
        type: "bar",
        barGap: 0,
        label: { show: true, position: "insideTop" },
        emphasis: { focus: "series" },
        data: [10, 60, 100], 
      },
      {
        name: "Conteúdos",
        type: "bar",
        label: { show: true, position: "insideTop" },
        emphasis: { focus: "series" },
        data: [30, 80, 100], 
      },
      {
        name: "Recursos",
        type: "bar",
        label: { show: true, position: "insideTop" },
        emphasis: { focus: "series" },
        data: [5, 30, 50]
      }
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
    </div>
  );
};

export default GraficoPlano;
