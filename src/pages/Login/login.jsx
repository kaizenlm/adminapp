import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    validarCredenciales,
    cerrarSesion,
    obtenerSesion,
    guardarSesion,
} from './backlogin.jsx';

const FrontLogin = () => {
    const sesion = obtenerSesion(); // comprobar sesion
    const navigate = useNavigate();

    //  redireccion si ya estas conectado
    useEffect(() => {
        if (sesion) {
            console.log(`Usuario logeado: ${sesion.username}, Nivel de acceso: ${sesion.accesslevel}`); //print de consola del usuario que esta logeado
            navigate('/menu');  // redireccion al menu si estas conectado
        } else {
            console.log('No hay sesión activa');
        }
    }, [sesion, navigate]); 

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');



    const handleLogin = (e) => {
        e.preventDefault();

        const datosSesion = validarCredenciales(username, password);

        if (datosSesion) {
            guardarSesion(datosSesion);
            alert(`Bienvenido ${datosSesion.username}!`);
            console.log('Datos Sesion:', datosSesion);
            navigate('/menu');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };


    return (
        <div className="flex flex-col justify-center h-screen bg-smneutral700 px-6 py-12 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Smart Menu"
                    src="src\assets\Logo_V1.svg"
                    className="mx-auto h-25 w-auto"
                />
                <h2 className="mt-10 pb-1 text-center text-2xl/9 font-bold tracking-tight text-white ">
                    Bienvenido a SMART MENU
                </h2>
            </div>

            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="text" className="block text-sm/6 font-medium text-white">
                            Nombre de usuario
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                placeholder='Ingrese su Nombre de Usuario'
                                type="text"
                                autoComplete="text"
                                value={username}
                                className="block w-full rounded-md bg-inherit px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-white placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div >
                            <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                Contraseña
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                placeholder='Ingrese su contraseña'
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-inherit px-3 py-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-smprimary700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FrontLogin