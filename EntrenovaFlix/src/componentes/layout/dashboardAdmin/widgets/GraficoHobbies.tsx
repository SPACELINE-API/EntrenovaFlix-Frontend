import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

interface HobbiesProps {
  isLoading: boolean;
  hasError: boolean;
  data: { nome: string; usuarios: number }[] | undefined;
}

export default function GraficoHobbies({ isLoading, hasError, data }: HobbiesProps) {
  const isDataEmpty = !data || data.length === 0;

  const chartData = {
    labels: data?.map(d => d.nome) || [],
    datasets: [
      {
        label: '# de Usuários',
        data: data?.map(d => d.usuarios) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(199, 199, 199, 0.7)',
          'rgba(83, 102, 255, 0.7)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      grid: { color: '#444' },
      ticks: { display: false, backdropColor: 'transparent' },
      pointLabels: {
        display: true,
        centerPointLabels: true,
        font: { size: 12, family: 'sans-serif' },
        color: '#fff',
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#aaa',
        usePointStyle: true,
      },
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title: () => "", 
        label: function (context: any) {
          const label = context.label || '';
          const value = context.raw || 0;
          return `${label}: ${value}`;
        },
      },
    },
  },
};


  return (
    <div className="grafico-widget-container">
      <h3>Hobbies Mais Prominentes</h3>

      {isLoading && <div className="grafico-loading">Carregando...</div>}
      {!isLoading && hasError && <div className="grafico-error">Erro ao carregar.</div>}
      {!isLoading && !hasError && isDataEmpty && (
        <div className="grafico-empty">Nenhum dado disponível.</div>
      )}

      {!isLoading && !hasError && !isDataEmpty && (
        <div style={{ height: '300px', width: '100%' }}>
          <PolarArea data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}
