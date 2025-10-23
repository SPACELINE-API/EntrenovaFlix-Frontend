import '../../../styles/dashboard.css';

interface CardProps {
  titulo: string;
  valor: string | number;
  icone?: React.ReactElement;
  tipo?: string;
}

const Card: React.FC<CardProps> = ({ titulo, valor, icone, tipo }) => {
  if (tipo === 'DashboardRH') {
    return (
      <div className='card-visaoGeral'>
        <div className="card-topo">
          <h3 className="cardTitulo-visaoGeral">{titulo}</h3>
        </div>
        <h4 className="valor">{valor}</h4>
      </div>
    );
  }

  return (
    <div className='card'>
      <div className="card-topo">
        <h3 className="card-titulo">{titulo}</h3>
        <div>{icone}</div>
      </div>
      <h4 className="valor">{valor}</h4>
    </div>
  );
};

export default Card;