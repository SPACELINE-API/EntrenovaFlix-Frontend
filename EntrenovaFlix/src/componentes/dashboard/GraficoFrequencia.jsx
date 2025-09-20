import ReactECharts from 'echarts-for-react';

const GraficoFrequencia = () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mês 1', 'Mês 2', 'Mês 3'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [10, 20, 30],
        type: 'bar',
      },
    ],
  };

  return <ReactECharts option={option} className='grafico'/>;
};

export default GraficoFrequencia;