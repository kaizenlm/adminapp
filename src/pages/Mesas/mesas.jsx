import React, { useState, useEffect } from 'react';
import {
    obtenerMesas,
    guardarMesas,
    crearMesa,
    actualizarMesa,
    eliminarMesa,
    eliminarTodasMesas,
    obtenerHistorialPedidos,
    agregarPedidoAHistorial,
    actualizarReferenciasMesa,
    generarUrlQR
} from './backmesas.jsx';
import { obtenerEmpleados, meseros } from './backmesas.jsx';

import { getProducts } from '../../data/data.js';

const Mesas = () => {
    const [modalAbierto, setModalAbierto] = useState(false);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);

    const [meseroSeleccionadoId, setMeseroSeleccionadoId] = useState('');
    const [modalMeseroAbierto, setModalMeseroAbierto] = useState(false);


    const [mesas, setMesas] = useState([]);
    const [nuevaMesa, setNuevaMesa] = useState({ numero: '', zona: 'patio', estado: 'libre', asignado: '' });

    const [modoEdicion, setModoEdicion] = useState(false);
    const [mesaEditada, setMesaEditada] = useState(null);

    const [modalHistorialAbierto, setModalHistorialAbierto] = useState(false);
    const [historialPedidos, setHistorialPedidos] = useState({});

    const [productosSeleccionados, setProductosSeleccionados] = useState([]);
    const [productosDisponibles, setProductosDisponibles] = useState([]);

    const [empleadosDisponibles] = useState(obtenerEmpleados());

    useEffect(() => {
        const cargarProductos = async () => {
            const productos = await getProducts();
            setProductosDisponibles(productos);
        };
        cargarProductos();
    }, []);


    useEffect(() => {
        // Cargar mesas usando la función del backend
        const mesasGuardadas = obtenerMesas();
        console.log('Mesas cargadas desde Local Storage >', mesasGuardadas);
        setMesas(mesasGuardadas);

        // Cargar historial de pedidos
        const historialGuardado = obtenerHistorialPedidos();
        setHistorialPedidos(historialGuardado);
    }, []);

    const abrirModal = (mesa) => {
        setMesaSeleccionada(mesa);
        setMesaEditada({ ...mesa });
        setModalAbierto(true);
        setModoEdicion(false);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setMesaSeleccionada(null);
        setModoEdicion(false);
    };

    const activarModoEdicion = () => {
        setModoEdicion(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setMesaEditada({
            ...mesaEditada,
            [name]: value
        });
    };



    const guardarEdicion = () => {
        try {
            // Usar la función de backend para actualizar la mesa
            const mesasActualizadas = actualizarMesa(mesaEditada, mesaSeleccionada, mesas);

            // Si el número de mesa ha cambiado, actualizar las referencias en el historial
            if (mesaEditada.numero !== mesaSeleccionada.numero) {
                const historialActualizado = actualizarReferenciasMesa(
                    mesaSeleccionada.numero,
                    mesaEditada.numero
                );
                setHistorialPedidos(historialActualizado);
            }

            if (mesaEditada.estado === 'libre') {
                mesaEditada.asignadoA = null; // Limpiar asignación si está libre
            }

            // Guardar y actualizar estado
            guardarMesas(mesasActualizadas);
            setMesas(mesasActualizadas);
            setMesaSeleccionada(mesaEditada);
            setModoEdicion(false);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEliminarMesa = () => {
        // Usar la función de backend para eliminar la mesa
        const mesasActualizadas = eliminarMesa(mesaSeleccionada.numero, mesas);
        guardarMesas(mesasActualizadas);
        setMesas(mesasActualizadas);
        cerrarModal();
    };

    const handleAgregarMesa = () => {
        try {
            // Usar la función de backend para crear una nueva mesa
            const mesasActualizadas = crearMesa(nuevaMesa, mesas);
            guardarMesas(mesasActualizadas);
            setMesas(mesasActualizadas);

            // Limpiar los campos
            setNuevaMesa({ numero: '', zona: 'patio', estado: 'libre', asignado: '' });
        } catch (error) {
            alert(error.message);
        }
    };

    const asignarMesero = (mesa) => {
        setMesaSeleccionada(mesa);
        setModalMeseroAbierto(true);
    };

    const confirmarMesero = () => {
        setModalMeseroAbierto(false);
        // Actualiza mesaSeleccionada con la información más reciente
        const mesaActualizada = mesas.find((m) => m.numero === mesaSeleccionada.numero);
        setMesaSeleccionada(mesaActualizada);
    };

    const handleSeleccionarMesero = (event) => {
        const meseroId = parseInt(event.target.value);
        setMeseroSeleccionadoId(meseroId);

        const meseroAsignado = empleadosDisponibles.find((mesero) => mesero.id === meseroId);

        if (meseroAsignado) {
            const mesasActualizadas = mesas.map((m) => {
                if (m.numero === mesaSeleccionada.numero) {
                    return { ...m, asignado: meseroAsignado.nombre };
                }
                return m;
            });
            setMesas(mesasActualizadas);
            guardarMesas(mesasActualizadas); // Guarda los cambios
        }
    };

    const handleEliminarTodasMesas = () => {
        if (confirm('¿Estás seguro de eliminar todas las mesas?')) {
            // Usar la función de backend para eliminar todas las mesas
            setMesas(eliminarTodasMesas());
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaMesa({
            ...nuevaMesa,
            [name]: value
        });
    };

    // Funciones para el historial de pedidos
    const abrirModalHistorial = () => {
        setModalHistorialAbierto(true);
    };

    const cerrarModalHistorial = () => {
        setModalHistorialAbierto(false);
    };

    // Función para simular la adición de un pedido (para pruebas)
    const agregarPedidoPrueba = () => {
        const numeroMesa = mesaSeleccionada.numero;
        const productosDelPedido = productosDisponibles.filter(producto =>
            producto.id === 'MH-1' || producto.id === 'MH-4'
        );

        const total = productosDelPedido.reduce((acc, producto) => acc + producto.price, 0);

        const nuevoPedido = {
            id: Date.now(),
            fecha: new Date().toLocaleString(),
            items: productosDelPedido.map(producto => producto.title),
            total: total
        };

        // Usar la función de backend para agregar pedido
        const historialActualizado = agregarPedidoAHistorial(numeroMesa, nuevoPedido);
        setHistorialPedidos(historialActualizado);

        alert('Pedido agregado correctamente');
    };

    return (
        <div className='bg-smneutral800'>
            <h1 className="flex justify-center pt-40 text-4xl font-bold mb-5">SISTEMA DE MESAS</h1>
            <div className="flex justify-center">
                {/* Resto del código JSX igual que antes, 
                pero usando las funciones correspondientes */}
                <form onSubmit={e => e.preventDefault()}>
                    <div className="outline outline-black bg-red-500 flex justify-center mt-1">
                        <label>Numero de mesa:</label>
                    </div>
                    <div>
                        <input
                            className="outline outline-black mt-3"
                            name='numero'
                            type="number"
                            value={nuevaMesa.numero}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="outline outline-black flex justify-center mt-3">
                        <label>Zona:</label>
                    </div>

                    <div className="flex justify-center mt-3">
                        <select className="outline outline-black" name='zona' value={nuevaMesa.zona} onChange={handleChange}>
                            <option value="terraza">Terraza</option>
                            <option value="patio">Patio</option>
                            <option value="dentro">Dentro</option>
                        </select>
                    </div>
                    <div className=" outline outline-black bg-red-500 flex justify-center mt-3">
                        <label>Estado:</label>
                    </div>
                    <div className="flex justify-center mt-3">
                        <select className="outline outline-black" name='estado' value={nuevaMesa.estado} onChange={handleChange}>
                            <option value="reservada">Reservada</option>
                            <option value="ocupada">Ocupada</option>
                            <option value="libre">Libre</option>
                        </select>
                    </div>
                    <div className="flex flex-col items-center mt-8">
                        <button
                            className='outline outline-black bg-red-500 mb-10 px-4 py-2 w-full'
                            type="button"
                            onClick={handleAgregarMesa}>Agregar mesa
                        </button>

                        <button
                            className='outline outline-black bg-red-500 px-4 py-2 w-full'
                            type="button"
                            onClick={handleEliminarTodasMesas}>Eliminar Mesas
                        </button>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-3 grid-rows-5 gap-8 mt-5">
                    {mesas.length > 0 ? (
                        mesas.map((mesa, index) => (
                            <button
                                key={index}
                                onClick={() => abrirModal(mesa)}
                                className="outline outline-black bg-red-500 text-white w-22 h-22 flex flex-col items-center justify-center text-center p-4"
                            >
                                <p>N: {mesa.numero}</p>
                                <p>Z: {mesa.zona}</p>
                                <p>A: {mesa.asignado || 'Sin asignar'}</p>

                            </button>
                        ))
                    ) : (
                        <div className="col-span-3 flex justify-center">
                            <p>No hay mesas disponibles. ¡Agrega una nueva!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de detalles de mesa */}
            {modalAbierto && mesaSeleccionada && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        {!modoEdicion ? (
                            // Modo visualización
                            <>
                                <h2 className="text-2xl font-bold mb-4">Detalles de la Mesa</h2>
                                <p><strong>Número:</strong> {mesaSeleccionada.numero}</p>
                                <p><strong>Zona:</strong> {mesaSeleccionada.zona}</p>
                                <p><strong>Estado:</strong> {mesaSeleccionada.estado}</p>
                                <p><strong>Mesero:</strong> {mesaSeleccionada.asignado || 'Sin asignar'}</p>

                                {modalMeseroAbierto && mesaSeleccionada && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                                            <h2 className="text-2xl font-bold mb-4">Asignar Mesero a Mesa {mesaSeleccionada.numero}</h2>
                                            <select onChange={handleSeleccionarMesero} value={meseroSeleccionadoId}>
                                                <option value="">Seleccionar mesero</option>
                                                {empleadosDisponibles.map((mesero) => (
                                                    <option key={mesero.id} value={mesero.id}>
                                                        {mesero.nombre}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="mt-4 flex justify-end gap-2">
                                                <button onClick={() => setModalMeseroAbierto(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                                                    Cerrar
                                                </button>
                                                <button onClick={confirmarMesero} className="px-4 py-2 bg-green-500 text-white rounded-lg">
                                                    Aceptar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Código QR */}
                                <div className="mt-6 flex flex-col items-center">
                                    <h3 className="text-lg font-semibold mb-2">Código QR de la Mesa</h3>
                                    <img
                                        src={generarUrlQR(mesaSeleccionada)}
                                        alt={`QR Mesa ${mesaSeleccionada.numero}`}
                                        className="mb-4 border border-gray-300 p-2 rounded"
                                    />
                                </div>

                                <div className="mt-6 flex flex-wrap justify-between gap-2">
                                    <button onClick={cerrarModal} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                                        Cerrar
                                    </button>
                                    <button onClick={activarModoEdicion} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                        Editar
                                    </button>
                                    <button onClick={() => asignarMesero(mesaSeleccionada)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                                        Asignar
                                    </button>

                                    <button onClick={handleEliminarMesa} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                                        Eliminar
                                    </button>
                                    <button onClick={abrirModalHistorial} className="px-4 py-2 bg-green-600 text-white rounded-lg">
                                        Historial
                                    </button>
                                    {/* Botón para agregar pedido de prueba */}
                                    <button onClick={agregarPedidoPrueba} className="px-4 py-2 bg-purple-600 text-white rounded-lg mt-2 w-full">
                                        Agregar Pedido (Prueba)
                                    </button>
                                </div>
                            </>
                        ) : (
                            // Modo edición
                            <>
                                <h2 className="text-2xl font-bold mb-4">Editar Mesa</h2>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Número:</label>
                                    <input
                                        type="number"
                                        name="numero"
                                        value={mesaEditada.numero}
                                        onChange={handleEditChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Zona:</label>
                                    <select
                                        name="zona"
                                        value={mesaEditada.zona}
                                        onChange={handleEditChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="terraza">Terraza</option>
                                        <option value="patio">Patio</option>
                                        <option value="dentro">Dentro</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 font-bold mb-2">Estado:</label>
                                    <select
                                        name="estado"
                                        value={mesaEditada.estado}
                                        onChange={handleEditChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="reservada">Reservada</option>
                                        <option value="ocupada">Ocupada</option>
                                        <option value="libre">Libre</option>
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


            {/* Modal de historial de pedidos */}
            {modalHistorialAbierto && mesaSeleccionada && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full max-h-screen overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Historial de Pedidos - Mesa {mesaSeleccionada.numero}</h2>

                        {historialPedidos[mesaSeleccionada.numero] && historialPedidos[mesaSeleccionada.numero].length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left">Fecha</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-left">Productos</th>
                                            <th className="py-2 px-4 border-b border-gray-300 bg-gray-100 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {historialPedidos[mesaSeleccionada.numero].map((pedido) => (
                                            <tr key={pedido.id} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b border-gray-300">{pedido.fecha}</td>
                                                <td className="py-2 px-4 border-b border-gray-300">
                                                    <ul className="list-disc list-inside">
                                                        {pedido.items.map((item, idx) => (
                                                            <li key={idx}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td className="py-2 px-4 border-b border-gray-300 text-right">${pedido.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="bg-gray-100">
                                            <td className="py-2 px-4 border-t border-gray-300 font-bold" colSpan="2">Total</td>
                                            <td className="py-2 px-4 border-t border-gray-300 text-right font-bold">
                                                ${historialPedidos[mesaSeleccionada.numero].reduce((total, pedido) => total + pedido.total, 0)}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        ) : (
                            <div className="bg-gray-100 rounded-lg p-6 text-center">
                                <p className="text-gray-600">Esta mesa no tiene pedidos registrados.</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <button onClick={cerrarModalHistorial} className="px-4 py-2 bg-gray-500 text-white rounded-lg">
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Mesas;