import ReactECharts from 'echarts-for-react';

interface GraficoLinhaProps {
  acessos: number[];
}

const GraficoLinha: React.FC<GraficoLinhaProps> = ({ acessos }) => {
  const option = {
    backgroundColor: '#5449CC',
    title: {
      text: 'Trilhas ativas',
      subtext: 'Quantidade de acessos por mês em todas as trilhas',
      left: 'center',
      top: 10,          // posição do título em relação ao topo
      itemGap: 6,       // espaço entre título e subtítulo
      textStyle: {
        color: '#FFFFFF',
        fontSize: 25
      },
      subtextStyle: {
        color: '#FFFFFF',
        fontSize: 14
      }
    },
    grid: {
      top: 100,         // 👈 aumenta esse valor pra criar espaço entre subtítulo e gráfico
      left: 10,
      right: 30,
      bottom: 20,
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
      axisLine: { lineStyle: { color: '#FFFFFF' } },
      axisLabel: { color: '#FFFFFF' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#FFFFFF' } },
      axisLabel: { color: '#FFFFFF' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
    },
    series: [
      {
        name: 'Acessos',
        data: acessos,
        type: 'line',
        smooth: true,
        lineStyle: { color: '#FFFFFF' },
        itemStyle: { color: '#FFFFFF' },
        areaStyle: { color: 'rgba(255,255,255,0.1)' }
      }
    ]
  };

  return (
    <ReactECharts
      option={option}
      className="visaoGeral-grafico"
      style={{ height: '350px', width: '100%' }} // garante que o grid.top funcione
    />
  );
};

export default GraficoLinha;