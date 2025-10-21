import ReactECharts from 'echarts-for-react';

const GraficoPizza = () => {
  const option = {
    tooltip: {
      show: false
    },
    legend: {
      top: '5%',
      left: 'center',
      textStyle: {
        color: '#ffffff'
      }
    },
    color: ['#5A4FCF', '#9B93F5', '#017F81', '#0078D7'],
    series: [
      {
        name: 'Atividades realizadas por tipo',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        endAngle: 360,
        itemStyle: {
          borderColor: 'transparent' 
        },
        data: [
          { value: 2, name: 'Quiz' },
          { value: 3, name: 'Vídeo' },
          { value: 2, name: 'Podcast' },
          { value: 1, name: 'Filme' },
        ],
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />;
};

export default GraficoPizza;