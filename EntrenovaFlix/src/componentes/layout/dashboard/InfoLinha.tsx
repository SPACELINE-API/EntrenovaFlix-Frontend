import { IoIosArrowRoundForward } from "react-icons/io";
import '../../../styles/dashboard.css';

const InfoLinha = ({icone, titulo, subtitulo} : any) => {
    return (
        <div className='infoLinha'>
            {icone} {titulo} <IoIosArrowRoundForward className="info-icone"/> {subtitulo}
        </div>
    )
}

export default InfoLinha;