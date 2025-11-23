import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaPlusCircle } from 'react-icons/fa'; 
import { FaCircleArrowUp } from 'react-icons/fa6'; 

type ChartValueType = string | number | Array<string | number>;
type ChartNameType = string | number;

interface TrilhaDesempenho {
    trilha: string;
    progresso: number;
    engajamento: number;
    conclusao: number;
}

const mockFetchDesempenho = (simulateState = 'success'): Promise<TrilhaDesempenho[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simulateState === 'error') reject(new Error("Erro de conexão simulado."));
            else if (simulateState === 'no-data') resolve([]);
            else resolve([
                { trilha: 'Vendas Online', progresso: 65, engajamento: 75, conclusao: 85 },
                { trilha: 'Liderança Persuasiva', progresso: 78, engajamento: 88, conclusao: 92 },
            ]);
        }, 1200);
    });
};

interface SimulationControlsProps {
    simulation: string;
    setSimulation: (simType: string) => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({ simulation, setSimulation }) => (
    <div style={{marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.75rem', color: '#cdcdcd', padding: '10px 0'}}>
        {['success', 'no-data', 'error'].map(simType => (
            <button 
                key={simType}
                onClick={() => setSimulation(simType)} 
                style={{
                    cursor: 'pointer', 
                    textDecoration: simulation === simType ? 'underline' : 'none', 
                    color: simulation === simType ? '#fff' : '#cdcdcd',
                    background: 'none', 
                    border: 'none',
                    padding: '0 5px',
                    fontSize: 'inherit',
                    fontWeight: simulation === simType ? 'bold' : 'normal',
                }}
            >
                Simular: {simType === 'success' ? 'Sucesso' : simType === 'no-data' ? 'Sem Dados' : 'Erro'}
            </button>
        ))}
    </div>
);

const GraficoDesempenhoTrilhas: React.FC = () => {
    const [data, setData] = useState<TrilhaDesempenho[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [simulation, setSimulation] = useState<string>('success'); 

    useEffect(() => {
        setLoading(true);
        setError(false);
        mockFetchDesempenho(simulation).then(response => {
            setData(response);
            setLoading(false);
        }).catch(() => {
            setError(true);
            setLoading(false);
        });
    }, [simulation]);
    
    const handleCriarTrilha = useCallback(() => { console.log("Criar trilha."); }, []);
    
    const TooltipFormatter = (value: ChartValueType, name: ChartNameType) => {
        const formattedValue = typeof value === 'number' ? value.toFixed(1) + '%' : value;
        const formattedName = typeof name === 'string' ? name.charAt(0).toUpperCase() + name.slice(1) : name;
        return [formattedValue, formattedName];
    };

    const containerStyle: React.CSSProperties = {
        backgroundColor: '#2F333E',
        borderRadius: '8px',
        border: '1px solid #857DDB',
        padding: '1.5625rem',
        width: '100%', 
        margin: '0', 
        height: '420px', 
        display: 'flex',
        flexDirection: 'column',
        
    };
    const centerStyle: React.CSSProperties = {
        ...containerStyle, justifyContent: 'center', alignItems: 'center', textAlign: 'center',
    };
    
    if (loading) {
        return (
            <div style={centerStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#857DDB' }}>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#857DDB]"></div>
                    <span>Carregando desempenho...</span>
                </div>
                <SimulationControls simulation={simulation} setSimulation={setSimulation} /> 
            </div>
        );
    }

    if (error) { 
        return (
            <div style={centerStyle}>
                <h2 style={{color: '#fff', fontSize: '1.25rem', marginBottom: '8px'}}>Não foi possível carregar dados de trilhas</h2>
                <SimulationControls simulation={simulation} setSimulation={setSimulation} /> 
            </div>
        );
    }
    
    if (!data || data.length === 0) { 
        return (
            <div style={centerStyle}>
                <FaCircleArrowUp style={{fontSize: '2rem', color: '#857DDB', marginBottom: '1rem'}} />
                <h2 style={{color: '#fff', fontSize: '1.25rem', marginBottom: '8px'}}>Nenhuma trilha ativa ou dados de desempenho disponíveis</h2>
                <button 
                    onClick={handleCriarTrilha} 
                    style={{marginTop: '1rem', display: 'flex', alignItems: 'center', backgroundColor: '#857DDB', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none', cursor: 'pointer'}}
                >
                    <FaPlusCircle style={{marginRight: '8px'}} /> Criar nova trilha
                </button>
                <SimulationControls simulation={simulation} setSimulation={setSimulation} /> 
            </div>
        );
    }
    
    return ( 
        <div style={containerStyle}>
            <h2 style={{color: '#fff', fontSize: '1.25rem', marginBottom: '1rem'}}>Desempenho das Trilhas Ativas (%)</h2>
            <ResponsiveContainer width="100%" height="75%"> 
                <BarChart 
                    data={data} 
                    barCategoryGap="5%" 
                    margin={{ top: 10, right: 5, left: -20, bottom: 30 }} 
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} /> 
                    <XAxis 
                        dataKey="trilha" 
                        stroke="#fafafa" 
                        angle={-25} 
                        textAnchor="end"
                        tick={{ 
                            fontSize: 10, 
                            fill: '#fafafa', 
                        }} 
                        height={60} 
                        interval={0} 
                    />
                    <YAxis 
                        stroke="#fafafa" 
                        tick={{ fontSize: 12, fill: '#fafafa' }} 
                        domain={[0, 100]}
                    />
                    <Tooltip 
                        formatter={TooltipFormatter as any} 
                        contentStyle={{ backgroundColor: '#1F1F1F', border: '1px solid #857DDB', borderRadius: '8px', color: '#fff' }} 
                        labelStyle={{ color: '#fff', fontWeight: 'bold' }} 
                    />
                    
                    <Legend 
                        iconType="circle" 
                        wrapperStyle={{ paddingTop: 15, fontSize: '0.9rem' }}
                        layout="horizontal"
                        align="center"
                        verticalAlign="bottom"
                        formatter={(value: string) => <span style={{ color: '#fafafa', fontSize: '0.9rem' }}>{value}</span>}
                    />

                    <Bar dataKey="conclusao" fill="#34A853" name="Taxa de Conclusão" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="engajamento" fill="#5449CC" name="Taxa de Engajamento" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="progresso" fill="#FFC658" name="Progresso Médio" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            <SimulationControls simulation={simulation} setSimulation={setSimulation} />
        </div>
    );
};

export default GraficoDesempenhoTrilhas;