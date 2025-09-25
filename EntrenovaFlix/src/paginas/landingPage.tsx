<<<<<<< HEAD
function landingPage(){
    return <h1>Bem vindo ao landing page</h1>;
}
export default landingPage;
=======
import '../styles/global.css';
import '../styles/lp.css';
import '../styles/estiloForms.css'
import { Toaster } from 'react-hot-toast';
import HeroSection from '../componentes/layout/LandingPage/heroSection';
import MotivosSection from '../componentes/layout/LandingPage/motivosSection';
import PassoSection from '../componentes/layout/LandingPage/passosSection';
import Formularios from '../componentes/layout/LandingPage/formularioSection'

function LandingPage() {
    return (
        <>
            <HeroSection />

            <div className="main-content-block">
                <svg 
                    className="top-border-svg" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 1440 100" 
                    preserveAspectRatio="none"
                >
                    <polyline 
                        points="0,100 720,0 1440,100" 
                        fill="none" 
                        stroke="#4A4A4A"   
                        strokeWidth="4"     
                    />
                </svg>

                <MotivosSection/>
                <div id='passos'>
                    <PassoSection/>
                </div>
            </div>

            <div id='formulario' className="form-section-wrapper">
                <Toaster position="top-right" /> 
                <Formularios />
            </div>
        </>
    );
}

export default LandingPage;
>>>>>>> b475a84f7e517d130c3a35ba93a3d0f08fb8513b
