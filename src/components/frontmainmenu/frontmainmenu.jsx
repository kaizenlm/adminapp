import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarSesion, handleLogout } from '../backlogin/backlogin.jsx';
import Navbar from '../frontnavbar/frontnavbar.jsx';
import CustomButton from '../btn/btn.jsx';


const MainMenu = () => {
    const navigate = useNavigate();
    useEffect(() => {
        verificarSesion(navigate); // Verificar si hay sesión activa
    }, [navigate]);


    return (

        <div>

            <nav>
                <Navbar />

            </nav >
            <div className="flex flex-col items-center justify-center h-full mt-10">

                <div> <CustomButton to="/registrar" className='py-8 my-3 w-38'> REGISTRAR </CustomButton></div>
                <div> <CustomButton className='py-8 my-3 w-38'> MENU </CustomButton></div>
                <div> <CustomButton className='py-8 my-3 w-38'> MESAS </CustomButton></div>
                <div> <CustomButton className='py-8 my-3 w-38'> PEDIDOS </CustomButton></div>
                <div> <CustomButton className='py-8 my-3 w-38'> ESTADISTICAS </CustomButton></div>

            </div>
        </div >
    )
}

export default MainMenu