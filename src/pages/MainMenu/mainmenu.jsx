import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesion, handleLogout } from '../Login/backlogin.jsx';
import Navbar from '../../components/navbar.jsx';
import CustomButton from '../../components/ui/btn.jsx';


const MainMenu = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verificarSesion(navigate); // Verificar si hay sesión activa
    }, [navigate]);


    return (

        <div className='bg-smneutral800 h-screen'>

            <nav>
                <Navbar />

            </nav >
            <div className="flex flex-col bg-smneutral800 items-center pt-15">

                <div> <CustomButton to="/registrar" className='bg-smprimary600 text-white py-8 my-3 w-58'> REGISTRAR </CustomButton></div>
                <div> <CustomButton  className='bg-smprimary600 text-white py-8 my-3 w-58'> MENU </CustomButton></div>
                <div> <CustomButton to="/mesas" className='bg-smprimary600 text-white py-8 my-3 w-58'> MESAS </CustomButton></div>
                <div> <CustomButton className='bg-smprimary600  text-white py-8 my-3 w-58'> PEDIDOS </CustomButton></div>
                <div> <CustomButton className='bg-smprimary600  text-white py-8 my-3 w-58'> ESTADISTICAS </CustomButton></div>

            </div>
        </div >
    )
}

export default MainMenu