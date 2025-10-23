import ReactECharts from 'echarts-for-react';

interface GraficoLinhasProps {
    acessos : number[],
    atividadesConcluidas : number[],
    comentarios : number[],
    tempoSessao : number[]
}

const GraficoLinhas: React.FC<GraficoLinhasProps> = ({
    acessos,
    atividadesConcluidas,
    comentarios,
    tempoSessao
}) => {
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
            { name: 'Acessos', data: acessos, type: 'line' },
            { name: 'Ativades concluídas', data: atividadesConcluidas, type: 'line' },
            { name: 'Comentários em fórum', data: comentarios, type: 'line' },
            { name: 'Tempo médio por sessão', data: tempoSessao, type: 'line' }
        ]
    };

    return <ReactECharts option={option} style={{ height: '19rem', width: '60%' }} className="trilhas-grafico" />
}

export default GraficoLinhas;