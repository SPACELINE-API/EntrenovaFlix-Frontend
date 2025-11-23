import ReactECharts from 'echarts-for-react';

interface RadarIndicator {
  name: string;
  max: number;
}

interface GraficoRadarProps {
  titulo: string;
  subtitulo: string;
  labels: string[];
  valores: number[];
}

const GraficoRadar: React.FC<GraficoRadarProps> = ({
  titulo,
  subtitulo,
  labels,
  valores
}) => {

  const indicators: RadarIndicator[] = labels.map(label => ({
    name: label,
    max: 4 
  }));

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
    tooltip: {
      trigger: 'item'
    },
    radar: {
      indicator: indicators,
      radius: '65%',
      center: ['50%', '55%'],
      axisName: {
        color: '#fff',
        fontSize: 10,
        overflow: 'truncate',
        ellipsis: '...'
      },
      splitArea: {
        areaStyle: {
          color: ['rgba(50, 50, 50, 0.2)', 'rgba(40, 40, 40, 0.2)'],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(150, 150, 150, 0.3)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(150, 150, 150, 0.3)'
        }
      }
    },
    series: [
      {
        name: titulo,
        type: 'radar',
        data: [
          {
            value: valores,
            name: 'Pontuação',
            symbolSize: 6,
            lineStyle: {
              color: '#00D1FF',
              width: 3
            },
            areaStyle: {
              color: 'rgba(0, 209, 255, 0.3)'
            }
          }
        ]
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '19rem', width: '50%' }} className="trilhas-grafico-outro" />
};

export default GraficoRadar;