import { useState, useEffect } from 'react';

const UserManager = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        id: '',
        nombre: '',
        email: '',
        rol: 'empleado'
    });
    const [errores, setErrores] = useState({
        id: '',
        nombre: '',
        email: '',
        rol: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario({
            ...nuevoUsuario,
            [name]: value
        });
    };

    const validarFormulario = () => {
        const errores = {};
        if (!nuevoUsuario.id) {
            errores.id = 'El ID de usuario es obligatorio';
        }
        if (!nuevoUsuario.nombre) {
            errores.nombre = 'El nombre completo es obligatorio';
        }
        if (!nuevoUsuario.email) {
            errores.email = 'El correo electrónico es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(nuevoUsuario.email)) {
            errores.email = 'El correo electrónico no es válido';
        }
        if (!nuevoUsuario.rol) {
            errores.rol = 'El rol es obligatorio';
        }
        setErrores(errores);
        return Object.keys(errores).length === 0;
    };

    const handleAgregar = () => {
        if (validarFormulario()) {
            const usuario = { ...nuevoUsuario, estado: true, showMenu: false };
            const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
            usuariosGuardados.push(usuario);
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados)); // Guardar los usuarios en localStorage
            setUsuarios(usuariosGuardados); // Actualizar el estado con los usuarios guardados
            setNuevoUsuario({ id: '', nombre: '', email: '', rol: '' }); // Limpiar formulario
        } else {
            console.log('Formulario con errores');
        }
    };

    const handleEditar = (id) => {
        const nuevosDatos = { nombre: prompt('Nuevo nombre:'), email: prompt('Nuevo email:'), rol: prompt('Nuevo rol:') };
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const index = usuariosGuardados.findIndex(user => user.id === id);
        if (index !== -1) {
            usuariosGuardados[index] = { ...usuariosGuardados[index], ...nuevosDatos };
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados)); // Guardar los usuarios actualizados
            setUsuarios(usuariosGuardados);
        }
    };

    const handleDesactivar = (id) => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const index = usuariosGuardados.findIndex(user => user.id === id);
        if (index !== -1) {
            usuariosGuardados[index].estado = false;
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados)); // Guardar los usuarios actualizados
            setUsuarios(usuariosGuardados);
        }
    };


    //Borrar todos
    const eliminarTodosUsuarios = () => {
        localStorage.removeItem('usuarios'); // Elimina todos los usuarios del localStorage
        setUsuarios([]); // Vaciar el estado local
    };

    useEffect(() => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log('Usuarios cargados desde localStorage:', usuariosGuardados); // Agregado para hacer un log de los usuarios cargados
        setUsuarios(usuariosGuardados); // Cargar los usuarios del localStorage al iniciar el componente
    }, []);


    const handleAccionUsuario = (id) => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const index = usuariosGuardados.findIndex(user => user.id === id);
        if (index !== -1) {
            usuariosGuardados[index].showMenu = !usuariosGuardados[index].showMenu;
            localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));
            setUsuarios(usuariosGuardados);
        }
    };


    return (
        <div>
            <section className="px-5 bg-white dark:bg-gray-900 h-screen">
                <div className="py-8 px-4 ">
                    <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Gestion de Usuarios</h1>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID de Usuario</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="text" name="id" placeholder="ID" value={nuevoUsuario.id} onChange={handleChange} />
                            {errores.id && <p>{errores.id}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre Completo</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="text" name="nombre" placeholder="Nombre y Apellido" value={nuevoUsuario.nombre} onChange={handleChange} />
                            {errores.nombre && <p>{errores.nombre}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="email" name="email" placeholder="Direccion de correo electronico" value={nuevoUsuario.email} onChange={handleChange} />
                            {errores.email && <p>{errores.email}</p>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ROL</label>
                            <select
                                name="rol"
                                value={nuevoUsuario.rol}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value="empleado">Empleado</option>
                                <option value="admin">Admin</option>
                                <option value="dueno">Dueño</option>
                            </select>
                            {errores.rol && <p>{errores.rol}</p>}
                        </div>

                        <button className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            onClick={handleAgregar}>Agregar Usuario</button>

                        <button className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            onClick={eliminarTodosUsuarios}>Eliminar Todos</button>
                    </div>
                </form>

                <div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white mt-20">Lista de Usuarios</h2>
                </div>
                <ul>
                    {usuarios.filter(user => user.estado).map(user => (
                        <li className="my-5" key={`${user.id}-${user.email}`}>
                            <button
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full flex justify-between"
                                onClick={() => handleAccionUsuario(user.id)}
                            >
                                {user.nombre} - {user.email} - {user.rol}
                            </button>

                            {user.showMenu && (
                                <div className="mt-2 space-x-2">
                                    <button
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={() => handleEditar(user.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        onClick={() => handleDesactivar(user.id)}
                                    >
                                        Desactivar
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default UserManager;
