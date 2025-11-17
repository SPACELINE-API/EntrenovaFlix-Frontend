import React from 'react';
import ReactECharts from 'echarts-for-react';

interface GraficoLinhaProps {
  engajamentoAtivo: number[]; 
  engajamentoPassivo: number[];
}

const GraficoLinha: React.FC<GraficoLinhaProps> = ({ engajamentoAtivo, engajamentoPassivo }) => {
  const diasDaSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
  const nomeSerieAtiva = 'Meta';
  const nomeSeriePassiva = 'Desempenho';
  const META_COLOR = '#FFFFFF'; 
  const PURPLE_COLOR = '#9B93F5'; 
  const PURPLE_RGB = '155, 147, 245'; 
  const option = {
    title: {
      text: 'Média de Desempenho Semanal',
      left: 'center',
      top: 0,
      textStyle: { 
        color: META_COLOR, 
        fontSize: 25,
        fontWeight: 'bold'
      },
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }, 
      backgroundColor: 'rgba(50,50,50,0.7)', 
      borderColor: PURPLE_COLOR, 
      borderWidth: 1,
      textStyle: { color: META_COLOR },
      formatter: (params: any) => {
        let html = `<div style="font-weight: bold;">${params[0].name}</div>`;
        params.forEach((item: any) => {
          html += `<div style="display: flex; align-items: center; gap: 8px;">${item.marker} <span>${item.seriesName}: <b>${item.value.toFixed(1)}%</b></span></div>`;
        });
        return html;
      }
    },

    legend: {
      data: [nomeSerieAtiva, nomeSeriePassiva], 
      bottom: 20, 
      textStyle: { color: META_COLOR },
      itemGap: 30
    },
    
    grid: { 
      top: 80, 
      left: 10, 
      right: 30, 
      bottom: 60, 
      containLabel: true 
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: diasDaSemana,
      axisLine: { lineStyle: { color: META_COLOR } },
      axisLabel: { color: META_COLOR, fontSize: 12 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: 'Pontuação (%)',
      min: 0,
      max: 100,
      nameTextStyle: { color: META_COLOR, padding: [0, 0, 10, 0] },
      axisLine: { lineStyle: { color: META_COLOR } },
      axisLabel: { 
        color: META_COLOR, 
        formatter: '{value} %' 
      },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } } 
    },
    series: [
      {
        name: nomeSerieAtiva, 
        data: engajamentoAtivo,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { 
          color: META_COLOR, 
          width: 4 
        },
        itemStyle: { 
          color: META_COLOR 
        },
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(255, 255, 255, 0.4)'
            }, {
              offset: 1, color: 'rgba(255, 255, 255, 0.0)' 
            }]
          }
        },
      },
      {
        name: nomeSeriePassiva,
        data: engajamentoPassivo,
        type: 'line',
        smooth: true, 
        symbol: 'diamond',
        symbolSize: 8,
        lineStyle: { 
          color: PURPLE_COLOR, 
          width: 4 
        },
        itemStyle: { 
          color: PURPLE_COLOR 
        }, 
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: `rgba(${PURPLE_RGB}, 0.5)`
            }, {
              offset: 1, color: `rgba(${PURPLE_RGB}, 0.0)`
            }]
          }
        }
      }
    ]
  };

  return (
    <div className="chart-wrapper">
        <ReactECharts
            option={option}
            style={{ height: '400px', width: '500px', marginTop:'40px'}} 
        />
    </div>
  );
};

const App = () => {
    const ativoData = [10, 20, 30, 40, 50]; 
    const passivoData = [60, 68, 76, 84, 92]; 
    
    return (
        <>

            <div className="app-container">
                    <GraficoLinha 
                        engajamentoAtivo={ativoData} 
                        engajamentoPassivo={passivoData} 
                    />
                </div>
        </>
    );
};

export default App;