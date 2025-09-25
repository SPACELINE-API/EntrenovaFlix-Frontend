import '../../styles/dashboard.css';

const CardParticipacao = ({ titulo, valor }) => {
  return (
    <div className='cardParticipacao'>
      <h3 className='cardParticipacao-titulo'>{titulo}</h3>
      <h4 className='cardParticipacao-valor'>{valor}</h4>
    </div>
  );
};

export default CardParticipacao;