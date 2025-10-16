import '../../../styles/global.css';
import '../../../styles/lp.css';
import { IoIosArrowDown } from "react-icons/io";


function HeroSection() {    
  return (
    <section className="hero-section">
      <h1 className="h1Lp">
        PARE DE GASTAR COM TREINAMENTOS <br /> GENÉRICOS QUE NÃO FUNCIONAM.
      </h1>

      <p className="texto-normal">
        Descubra, em poucos minutos, qual é o plano de desenvolvimento ideal para sua empresa.
        Responda nosso diagnóstico gratuito e receba um plano de conteúdo 100% personalizado.
      </p>

      <div
        className="scroll-down-wrapper"
        onClick={() => document.getElementById("motivos")?.scrollIntoView({ behavior: "smooth" })}
      >
        <IoIosArrowDown className="scroll-arrow-static" />
        <IoIosArrowDown className="scroll-arrow delay-1" />
        <IoIosArrowDown className="scroll-arrow delay-2" />
      </div>
    </section>
  );
}

export default HeroSection;
