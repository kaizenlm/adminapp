import React, { useEffect, useState } from 'react';

const BackLogin = () => {
    return (
        <div className="flex flex-col justify-center h-screen bg-inherit px-6 py-12 ">
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
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="text" className="block text-sm/6 font-medium text-white">
                            Nombre de usuario
                        </label>
                        <div className="mt-2">
                            <input
                                id="nombredeusuario"
                                name="nombredeusuario"
                                type="text"
                                required
                                autoComplete="text"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Iniciar sesion
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BackLogin