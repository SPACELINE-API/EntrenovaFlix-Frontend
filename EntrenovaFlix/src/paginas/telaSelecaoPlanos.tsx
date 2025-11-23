import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PlanoEscolhido } from '../componentes/layout/contratacaoPlanos/types'; 
import "../styles/esc.css"; 

const planosDisponiveis = [
    { 
        id: 'essencial' as PlanoEscolhido, 
        nome: 'Essencial', 
        sub: 'Básico',
        preco: 'R$ 590,90 / mês',
        keyFeatures: { 
            contas: 'Até 10 usuários',
            trilhas: 'Até 3 trilhas personalizadas',
            interface: 'Básica',
            experiencia: 'Padrão por usuário'
        },
        descricao: 'Pequenas empresas que estão começando.' 
    },
    { 
        id: 'premium' as PlanoEscolhido, 
        nome: 'Premium', 
        sub: 'Intermediário',
        preco: 'R$ 990,90 / mês',
        keyFeatures: {
            contas: 'Até 60 usuários',
            trilhas: 'Até 10 trilhas personalizadas',
            interface: 'Personalização parcial',
            experiencia: 'Controle de acesso'
        },
        descricao: 'Perfeito para equipes médias com maior necessidade de controle.'
     },
    { 
        id: 'diamante' as PlanoEscolhido, 
        nome: 'Diamante', 
        sub: 'Avançado',
        preco: 'R$ 1390,90 / mês',
        keyFeatures: {
            contas: 'Usuários ilimitados',
            trilhas: 'Trilhas personalizadas ilimitadas',
            interface: 'Personalização total',
            experiencia: 'Customizada por tipo de usuário'
        },
        descricao: 'Voltado para grandes empresas buscando máxima flexibilidade.' 
    },
];

const featureLabels: { key: string, label: string, source: 'root' | 'keyFeatures' }[] = [
    { key: "preco", label: "Preço por Mês", source: 'root' }, 
    { key: "contas", label: "Limite de Contas (Usuários)", source: 'keyFeatures' }, 
    { key: "trilhas", label: "Trilhas Personalizadas", source: 'keyFeatures' },
    { key: "interface", label: "Interface", source: 'keyFeatures' },
    { key: "experiencia", label: "Experiência do Usuário", source: 'keyFeatures' },
    { key: "descricao", label: "Ideal Para", source: 'root' }, 
];

function TelaSelecaoPlano() {
    const navigate = useNavigate();
    const location = useLocation();
    const planoInicial = (location.state?.plano as PlanoEscolhido) || ""; 
    const [planoSelecionado, setPlanoSelecionado] = useState<PlanoEscolhido>(planoInicial);
    const [erro, setErro] = useState<string | null>(null);
    const [modalAberto, setModalAberto] = useState(false);

    const handleSelecionarPlano = (planoId: PlanoEscolhido) => {
        setPlanoSelecionado(prev => prev === planoId ? "" : planoId);
        setErro(null); 
    };

    const handleConfirmar = () => {
        if (!planoSelecionado) {
            setErro("Por favor, selecione um plano para continuar.");
            return;
        }
        setModalAberto(true);
    };

    const handleCloseModal = () => {
        setModalAberto(false);
        navigate("/dashboardRH");
         
    };

    const handleVoltar = () => { 
        navigate('/dashboardRH/planos'); 
    };

    const planoDetalhes = planosDisponiveis.find(p => p.id === planoSelecionado);

    return (
        <div className="selecao-plano-wrapper dark-theme"> 
        {modalAberto && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Plano atualizado</h2>
                        </div>

                        <p>Sua assinatura foi alterada! As mudanças ocorreão imediatamente</p>

                        <button onClick={handleCloseModal} className="button-primary">
                            Continuar
                        </button>
                    </div>
                </div>
            )}
            <div className="selecao-plano-container"> 
                <h2 className="selecao-titulo">Escolha o plano ideal para você</h2>

                <div className="selecao-grid">
                    {planosDisponiveis.map((plano) => {
                        const isSelecionado = planoSelecionado === plano.id;
                        return (
                            <div
                                key={plano.id}
                                className={`selecao-card ${isSelecionado ? "selected" : ""}`}
                                onClick={() => handleSelecionarPlano(plano.id)}
                                role="radio" aria-checked={isSelecionado} tabIndex={0}
                                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelecionarPlano(plano.id)}} 
                            >
                                <span className="plano-nome">{plano.nome}</span>
                                <span className="plano-sub">{plano.keyFeatures.contas}</span> 
                                {isSelecionado && <div className="selecao-checkmark">✓</div>}
                            </div>
                        );
                    })}
                </div>

                {planoDetalhes && (
                    <div className="comparison-table visible">
                        {featureLabels.map(feature => {
                            const value = feature.source === 'root'
                                ? String(planoDetalhes[feature.key as keyof typeof planoDetalhes])
                                : String(planoDetalhes.keyFeatures[feature.key as keyof typeof planoDetalhes.keyFeatures]);

                            return (
                                <div key={feature.key} className={`feature-row ${feature.key === 'preco' ? 'price-row' : ''}`}>
                                    <div className="feature-label">{feature.label}</div>
                                    <div className="plan-values">
                                        <div className={`plan-value selected-plan-value ${feature.key === 'preco' ? 'price-value' : ''}`}>
                                            {value}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {erro && <p className="error selecao-erro">{erro}</p>}

                <div className="form-buttons form-buttons--between" style={{ marginTop: '2.5rem' }}>
                    <button onClick={handleVoltar} className="button-secondary"> Voltar </button>
                    <button type="button" className="button-primary" onClick={handleConfirmar} disabled={!planoSelecionado}>
                        Confirmar Plano e Pagar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TelaSelecaoPlano;