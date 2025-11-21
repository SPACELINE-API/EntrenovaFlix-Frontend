import React from 'react';
import ReactECharts from 'echarts-for-react';
import { FaBlackTie } from 'react-icons/fa6';

interface GraficoColunaProps {
  engajamentoAtivo: number[]; 
  engajamentoPassivo: number[];
}

const GraficoLinha: React.FC<GraficoColunaProps> = ({ engajamentoAtivo }) => {
  const categoriasOriginais = [
    'Como ampliar sua vendas online?',
    'Inovação e tendências',
    'Produtividade do funcionário',
    'Comunicação interna da empresa'
  ];

  const pares = categoriasOriginais.map((cat, index) => ({
    categoria: cat,
    valor: engajamentoAtivo[index]
  }));

  pares.sort((a, b) => b.valor - a.valor);

  const categorias = pares.map(p => p.categoria);
  const valoresOrdenados = pares.map(p => p.valor);
  const PURPLE_COLOR = '#8B5CF6'; 
  const AXIS_COLOR = '#E5E7EB'; 
  const BAR_BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.05)';
 
  const option = {
    title: {
      text: 'Trilhas Mais Acessadas',
      left: '50%',
      top: 10,
      textAlign: 'center',
      textStyle: { 
        color:'white',
        fontSize: 25,
        fontWeight: 'bold'
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(30, 41, 59, 0.9)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      textStyle: { color: AXIS_COLOR },
      formatter: (params: any) => {
        let html = `<div style="font-weight: bold;">${params[0].name}</div>`;
        params.forEach((item: any) => {
          html += `<div style="display: flex; align-items: center; gap: 8px;">${item.marker} <span>${item.seriesName}: <b>${item.value}</b></span></div>`;
        });
        return html;
      }
    },
    grid: { 
      top: 60, 
      left: '5%',
      right: '10%', 
      bottom: '3%',
      containLabel: true 
    },
    xAxis: {
      type: 'value',
      name: 'Visualização',
      nameLocation: 'start',
      min: 0,
      max: 100,
      nameTextStyle: { color: AXIS_COLOR },
      axisLine: { lineStyle: { color: AXIS_COLOR } },
      axisLabel: { color: AXIS_COLOR },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }
    },
    yAxis: {
      type: 'category',
      data: categorias,
      axisLine: { lineStyle: { color: AXIS_COLOR } },
      axisLabel: { color: AXIS_COLOR, fontSize: 16, align: 'right'},
      axisTick: { alignWithLabel: true, lineStyle: { color: AXIS_COLOR } }
    },
    series: [
      {
        name: 'Visualização Média',
        type: 'bar',
        barWidth: '60%',
        data: valoresOrdenados,
        itemStyle: { 
          color: PURPLE_COLOR,
          borderRadius: [0, 5, 5, 0]
        },
        showBackground: true,
        backgroundStyle: { color: BAR_BACKGROUND_COLOR }
      }
    ]
  };

  return (
    <div className="chart-wrapper">
      <ReactECharts
        option={option}
        style={{ height: '400px', maxWidth: '100%', marginTop: '60px' }}
      />
    </div>
  );
};

const App = () => {
  const ativoData = [65, 82, 73, 95];
  const passivoData = [70, 80, 75, 90]; 
    
  return (
    <div className="app-container">
      <GraficoLinha 
        engajamentoAtivo={ativoData} 
        engajamentoPassivo={passivoData} 
      />
    </div>
  );
};

export default App;
