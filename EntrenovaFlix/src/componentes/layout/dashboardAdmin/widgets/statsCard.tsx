import { ReactNode } from "react";

interface StatsProps {
    title: string;
    value: string | number | null | undefined; 
    isLoading: boolean;
    hasError: boolean;
    icon: ReactNode; 
}

export default function StatsCard({ title, value, isLoading, hasError, icon }: StatsProps) {

    const renderContent = () => {
        if (isLoading) {
            return <div className="stats-loading">Carregando...</div>;
        }

        if (hasError) {
            return (
                <>
                    <div className="stats-icon">{icon}</div>
                    <h3 className="stats-title">{title}</h3>
                    <p className="stats-error">--</p>
                </>
            );
        }

        if (value === 0 || value === null || value === undefined || value === "") {
            return (
                <>
                    <div className="stats-icon">{icon}</div>
                    <h3 className="stats-title">{title}</h3>
                    <p className="stats-value">Sem dados</p>
                </>
            );
        }

        return (
            <>
                <div className="stats-icon">{icon}</div>
                <h3 className="stats-title">{title}</h3>
                <p className="stats-value">{value}</p>
            </>
        );
    };

    return (
        <div className="stats-card">
            {renderContent()}
        </div>
    );
}
