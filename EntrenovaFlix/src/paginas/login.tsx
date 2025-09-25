import '../styles/login.css'
import LgSection from '../componentes/layout/Login/loginLayout'
import { ActionIcon } from '@mantine/core';
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Login(){
    return(
        <div className='bodyLg'>
            <ActionIcon 
            className= 'butaoSaida'
            variant="outline" 
            color='#5449CC' 
            aria-label="Settings"
            component={Link}
            to='/' >
                <IoArrowBackOutline className= 'butaoSaida' style={{ width: '70%', height: '70%' }} />
            </ActionIcon>
            <LgSection/>

        </div>
    )
}
