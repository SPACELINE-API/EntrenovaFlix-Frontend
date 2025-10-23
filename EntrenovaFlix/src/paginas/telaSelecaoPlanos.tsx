import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlanoEscolhido } from '../componentes/layout/contratacaoPlanos/types';

interface CardOpcaoPlanoProps {
    planoId: PlanoEscolhido;
    nome: string;
    preco: string;
    features: string[];
    selecionado: boolean;
    onClick: () => void;
}

const CardOpcaoPlano: React.FC<CardOpcaoPlanoProps> = ({
    planoId,
    nome,
    preco,
    features,
    selecionado,
    onClick
}) => {

    const nomeClasse = planoId; 
    const cardClassName = `plano-card ${selecionado ? 'selecionado' : ''}`;

    return (
        <div className={cardClassName} onClick={onClick}>
            <h3>Plano <span className={nomeClasse}>{nome.toLowerCase()}</span></h3>
            <p className='preco'>{preco}</p>
            <ul>
                {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    );
};
const planosDisponiveis = [
    { id: 'essencial' as PlanoEscolhido, nome: 'Essencial', preco: 'R$590 por mês', features: ['Até 10 usuários', 'Interface básica', 'Acesso às trilhas e mesma experiência para cada usuário'] },
    { id: 'premium' as PlanoEscolhido, nome: 'Premium', preco: 'R$990 por mês', features: ['Até 60 usuários', 'Personalização parcial da interface com base na identidade da empresa', 'Controle de acesso'] },
    { id: 'diamante' as PlanoEscolhido, nome: 'Diamante', preco: 'R$1390 por mês', features: ['Usuários ilimitados', 'Personalização total da interface com base na identidade da empresa', 'Experiência customizada para diferentes tipos de usuários'] },
];

function TelaSelecaoPlano() {
    const navigate = useNavigate();
    const [planoSelecionado, setPlanoSelecionado] = useState<PlanoEscolhido>('');
    const [erro, setErro] = useState<string | null>(null);

    const handleSelecionarPlano = (planoId: PlanoEscolhido) => {
        setPlanoSelecionado(planoId);
        setErro(null);
    };

    const handleConfirmar = () => {
        if (!planoSelecionado) {
            setErro("Por favor, selecione um plano para continuar.");
            return;
        }
        navigate('/cadastro/pagamento', { state: { plano: planoSelecionado } });
    };

    const handleVoltar = () => {
        navigate('/cadastro');
    };

    return (
        <div className="cadastro-wrapper">
            <div className="cadastro-container" style={{ maxWidth: '1100px'}}>
                <h2 className="form-title" style={{textAlign: 'center'}}>Selecione o Plano Ideal</h2>
                <p className="form-desc" style={{textAlign: 'center'}}>Escolha o plano que melhor se adapta às suas necessidades.</p>
                <div className="planos-container" >
                    {planosDisponiveis.map((plano) => (
                        <CardOpcaoPlano
                            key={plano.id}
                            planoId={plano.id}
                            nome={plano.nome}
                            preco={plano.preco}
                            features={plano.features}
                            selecionado={planoSelecionado === plano.id}
                            onClick={() => handleSelecionarPlano(plano.id)}
                        />
                    ))}
                </div>
                 {erro && (
                    <p className="error" style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '-1rem' }}>
                        {erro}
                    </p>
                 )}

                <div className="form-buttons form-buttons--between" style={{ marginTop: '2.5rem' }}>
                    <button onClick={handleVoltar} className="button-primary">
                        Voltar
                    </button>
                    <button type="button" className="button-primary" onClick={handleConfirmar}>
                        Confirmar Plano e Pagar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TelaSelecaoPlano;