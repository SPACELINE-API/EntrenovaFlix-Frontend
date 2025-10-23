import '../../../styles/devolutiva.css';

interface PlanoCardProps {
    plano: 'essencial' | 'premium' | 'diamante' | '';
}

function PlanoCard({ plano }: PlanoCardProps) {
    if (!plano) return null;

    const planosInfo = {
        essencial: {
            nome: 'essencial',
            preco: 'R$590 por mês',
            caracteristicas: [
                'Até 10 usuários',
                'Interface básica',
                'Acesso às trilhas e mesma experiência para cada usuário'
            ]
        },
        premium: {
            nome: 'premium',
            preco: 'R$990 por mês',
            caracteristicas: [
                'Até 60 usuários',
                'Personalização parcial da interface com base na identidade da empresa',
                'Controle de acesso'
            ]
        },
        diamante: {
            nome: 'diamante',
            preco: 'R$1390 por mês',
            caracteristicas: [
                'Usuários ilimitados',
                'Personalização total da interface com base na identidade da empresa',
                'Experiência customizada para diferentes tipos de usuários'
            ]
        }
    };

    const planoSelecionado = planosInfo[plano];

    return (
        <div className="plano-preview">
            <h3>Plano Selecionado:</h3>
            <div className="plano-card">
                <h3>Plano <span className={planoSelecionado.nome}>{planoSelecionado.nome}</span></h3>
                <p className="preco">{planoSelecionado.preco}</p>
                <ul>
                    {planoSelecionado.caracteristicas.map((caracteristica, index) => (
                        <li key={index}>{caracteristica}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PlanoCard;