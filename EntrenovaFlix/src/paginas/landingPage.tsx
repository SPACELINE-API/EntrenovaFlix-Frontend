import '../styles/global.css';
import '../styles/lp.css';
import '../styles/estiloForms.css'
import { Toaster } from 'react-hot-toast';
import HeroSection from '../componentes/layout/LandingPage/heroSection';
import Formularios from '../componentes/layout/LandingPage/formulario/formularioSection'
import MotivosSection from '../componentes/layout/LandingPage/motivosSection';
import Footer from '../componentes/layout/LandingPage/footer';

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

                <div id='motivos'>
                    <MotivosSection/>
                </div>
        
            </div>


            <div className='form-section-wrapper'>
                <div id='formulario'>
                    <Toaster position="top-right" /> 
                    <Formularios />
                </div>

            </div>

            <Footer/>

            
        </>
    );
}

export default LandingPage;
