import { useState, useEffect } from 'react';
import {
    obtenerUsuarios,
    guardarUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    eliminarTodosUsuarios
} from './backregistrar.jsx';

const UserManager = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarioEditado, setUsuarioEditado] = useState(null);
    const [modoEdicion, setModoEdicion] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        id: '',
        nombreDeUsuario: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        contrasena: '',
        rol: '',
        activo: '',
        fechaRegistro: '',
        fechaDeCreacion: '',
        fechaUltimaEdicion: '',
        fechaDeDesactivacion: ''
    });
    const [errores, setErrores] = useState({
        id: '',
        nombreDeUsuario: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        contrasena: '',
        rol: '',
        activo: '',
        fechaRegistro: '',
        fechaDeCreacion: '',
        fechaUltimaEdicion: '',
        fechaDeDesactivacion: ''
    });

    useEffect(() => {
        // Cargar mesas usando la función del backend
        const usuariosGuardados = obtenerUsuarios();
        console.log('Usuarios cargados desde Local Storage >', usuariosGuardados);
        setUsuarios(usuariosGuardados);
    }, []);


    const abrirModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setUsuarioEditado({ ...usuario });
        setModalAbierto(true);
        setModoEdicion(false);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setUsuarioSeleccionado(null);
        setModoEdicion(false);
    };

    const activarModoEdicion = () => {
        setModoEdicion(true);
    };


    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setUsuarioEditado({
            ...usuarioEditado,
            [name]: value
        });
    };


    const guardarEdicion = () => {
        try {
            // Usar la función de backend para actualizar la mesa
            const usuariosActualizados = actualizarUsuario(usuarioEditado, usuarioSeleccionado, usuarios);
            // Guardar y actualizar estado
            guardarUsuarios(usuariosActualizados);
            setUsuarios(usuariosActualizados);
            setUsuarioSeleccionado(usuarioEditado);
            setModoEdicion(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEliminarUsuario = () => {
        // Usar la función de backend para eliminar la mesa
        const usuariosActualizados = eliminarUsuario(usuarioSeleccionado.id, usuarios);
        guardarUsuarios(usuariosActualizados);
        setUsuarios(usuariosActualizados);
        cerrarModal();
    };


    const handleAgregarUsuario = () => {
        try {
            // Usar la función de backend para crear una nueva mesa
            const usuariosActualizados = crearUsuario(nuevoUsuario, usuarios);
            guardarUsuarios(usuariosActualizados);
            setUsuarios(usuariosActualizados);

            // Limpiar los campos
            setNuevoUsuario({
                id: '',
                nombreDeUsuario: '',
                nombre: '',
                apellido: '',
                email: '',
                telefono: '',
                contrasena: '',
                rol: '',
                activo: '',
                fechaRegistro: '',
                fechaDeCreacion: '',
                fechaUltimaEdicion: '',
                fechaDeDesactivacion: ''
            });
        } catch (error) {
            alert(error.message);
        }
    };


    const handleEliminarTodosUsuarios = () => {
        if (confirm('¿Estás seguro de eliminar todos los usuarios?')) {
            // Usar la función de backend para eliminar todos
            setUsuarios(eliminarTodosUsuarios());
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevoUsuario({
            ...nuevoUsuario,
            [name]: value
        });
    };


    return (
        <div>
            <section className="px-5 bg-smneutral800 h-screen">
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
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre de Usuario</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="text" name="nombreDeUsuario" placeholder="Nombre de Usuario" value={nuevoUsuario.nombreDeUsuario} onChange={handleChange} />
                            {errores.nombreDeUsuario && <p>{errores.nombreDeUsuario}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="text" name="nombre" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={handleChange} />
                            {errores.nombre && <p>{errores.nombre}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellido</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="text" name="apellido" placeholder="Apellido" value={nuevoUsuario.apellido} onChange={handleChange} />
                            {errores.apellido && <p>{errores.apellido}</p>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="email" name="email" placeholder="Direccion de correo electronico" value={nuevoUsuario.email} onChange={handleChange} />
                            {errores.email && <p>{errores.email}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefono</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="number" name="telefono" placeholder="Telefono" value={nuevoUsuario.telefono} onChange={handleChange} />
                            {errores.telefono && <p>{errores.telefono}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                type="password" name="contrasena" placeholder="Contraseña" value={nuevoUsuario.contrasena} onChange={handleChange} />
                            {errores.contrasena && <p>{errores.contrasena}</p>}
                        </div>

                        <div className="w-full">
                            <label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ROL</label>
                            <select
                                name="rol"
                                value={nuevoUsuario.rol}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            >
                                <option value=""></option>
                                <option value="empleado">Empleado</option>
                                <option value="admin">Admin</option>
                                <option value="dueno">Dueño</option>
                            </select>
                            {errores.rol && <p>{errores.rol}</p>}
                        </div>

                        <button className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            onClick={handleAgregarUsuario}>Agregar Usuario</button>

                        <button className="inline-flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            onClick={handleEliminarTodosUsuarios}>Eliminar Todos</button>
                    </div>
                </form>

                <div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white mt-20">Lista de Usuarios</h2>
                </div>
                <ul>
                    {usuarios.filter(usuario => usuario.activo === "").map(usuario => (
                        <li className="my-5" key={`${usuario.id}-${usuario.email}-${usuario.telefono}`}>
                            <button
                                onClick={() => abrirModal(usuario)}
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full flex justify-between"
                            >
                                {usuario.nombre} {usuario.apellido} - {usuario.email} - {usuario.telefono} - {usuario.rol}
                            </button>

                        </li>
                    ))}
                </ul>
                {/* Modal de detalles de mesa */}
                {modalAbierto && usuarioSeleccionado && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                            {!modoEdicion ? (
                                // Modo visualización
                                <>
                                    <h2 className="text-2xl font-bold mb-4">Detalles del Usuario</h2>
                                    <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
                                    <p><strong>Nombre y Apellido: </strong> {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}</p>
                                    <p><strong>Email:</strong> {usuarioSeleccionado.email}</p>
                                    <p><strong>Telefono:</strong> {usuarioSeleccionado.telefono}</p>
                                    <p><strong>ROL:</strong> {usuarioSeleccionado.rol}</p>



                                    <div className="mt-6 flex flex-wrap justify-between gap-2">
                                        <button onClick={cerrarModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                                            Cerrar
                                        </button>
                                        <button onClick={activarModoEdicion} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                            Editar
                                        </button>
                                        <button onClick={handleEliminarUsuario} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                                            Eliminar
                                        </button>
                                    </div>
                                </>
                            ) : (
                                // Modo edición
                                <>
                                    <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">Nombre:</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={usuarioEditado.nombre}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">Apellido:</label>
                                        <input
                                            type="text"
                                            name="apellido"
                                            value={usuarioEditado.apellido}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">Email:</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={usuarioEditado.email}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">Telefono:</label>
                                        <input
                                            type="number"
                                            name="telefono"
                                            value={usuarioEditado.telefono}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">Contraseña:</label>
                                        <input
                                            type="password"
                                            name="contrasena"
                                            value={usuarioEditado.contrasena}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2">ROL:</label>
                                        <select
                                            name="rol"
                                            value={usuarioEditado.rol}
                                            onChange={handleEditChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value=""></option>
                                            <option value="empleado">Empleado</option>
                                            <option value="admin">Admin</option>
                                            <option value="dueño">Dueño</option>
                                        </select>
                                    </div>

                                    <div className="mt-6 flex justify-between">
                                        <button onClick={() => setModoEdicion(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                                            Cancelar
                                        </button>
                                        <button onClick={guardarEdicion} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                                            Guardar Cambios
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default UserManager;
