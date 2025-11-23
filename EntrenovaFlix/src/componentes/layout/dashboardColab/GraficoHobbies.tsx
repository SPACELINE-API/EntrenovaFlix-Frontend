import ReactECharts from 'echarts-for-react';

interface GraficoHobbieProps {
  titulo: string;
  subtitulo: string;
  categorias: string[];
  valores: number[];
}

const GraficoHobbies: React.FC<GraficoHobbieProps> = ({
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
      type: 'value'
    },
    series: [
      {
        data: valores,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  }

  return <ReactECharts option={option} className="colab-hobbies-grafico" />

};

export default GraficoHobbies;