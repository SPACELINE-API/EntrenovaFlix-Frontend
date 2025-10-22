import ReactECharts from 'echarts-for-react';

interface GraficoBarraProps {
  titulo: string;
  subtitulo: string;
  categorias: string[];
  valores: number[];
}

const GraficoBarras: React.FC<GraficoBarraProps> = ({
  titulo,
  subtitulo,
  categorias,
  valores
}) => {
  const option = {
    title: {
      text: titulo,
      subtext: subtitulo,
      left: 20,
      top: 10,
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      top: 80,
    },
    xAxis: {
      type: 'category',
      data: categorias
    },
    yAxis: {
      type: 'value',
      max: 24
    },
    series: [
      {
        data: valores,
        type: 'bar',
        barMaxWidth: 80, 
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }

  return <ReactECharts option={option} style={{ height: '19rem', width: '50%' }} className="trilhas-grafico" />

};

export default GraficoBarras;