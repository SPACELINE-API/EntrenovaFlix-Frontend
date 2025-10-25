import ReactECharts from 'echarts-for-react';
import '../../../styles/dashboardRH.css'

const GraficoAtividade = () => {
    const option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo']
        },
        yAxis: {
            type: 'value'
        },
        legend: {
            show: true,
            top: 'top', 
            textStyle: {
                color: '#fafafa'
            }
        },
        series: [
            { name: 'Acessos', data: [10, 15, 12, 20, 18, 25, 30], type: 'line' },
            { name: 'Ativades concluídas', data: [5, 10, 8, 12, 11, 14, 16], type: 'line' },
            { name: 'Ativades concluídas', data: [5, 10, 8, 12, 11, 14, 16], type: 'line' },
            { name: 'Comentários em fórum', data: [5, 2, 3, 0, 1, 4, 6], type: 'line' },
            { name: 'Tempo médio por sessão', data: [20, 15, 14, 13, 13, 13, 14], type: 'line' }
        ]
    };

    return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} className="trilhas-grafico" />
}

export default GraficoAtividade;