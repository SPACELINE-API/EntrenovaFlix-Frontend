import '../../styles/dashboard.css'

const Card = ({ titulo, valor, icone }) => {
  return (
    <div className='card'>
      <div className='card-topo'>
        <h3 className='card-titulo'>{titulo}</h3>
        <div>{icone}</div>
      </div>
      <h4 className='valor'>{valor}</h4>
    </div>
  );
};

export default Card;