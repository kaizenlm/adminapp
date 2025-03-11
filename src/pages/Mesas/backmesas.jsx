// backmesas.jsx
/**
 * Funciones backend para gestión de mesas
 * Estas funciones manejan la logica del negocio
 */

// Funcion para obtener todas las mesas del localStorage
export const obtenerMesas = () => {
  const mesasGuardadas = JSON.parse(localStorage.getItem('mesas')) || [];
  return mesasGuardadas;
};

// Función para guardar el array de mesas en localStorage
export const guardarMesas = (mesas) => {
  localStorage.setItem('mesas', JSON.stringify(mesas));
  return mesas;
};

// Función para crear una nueva mesa (validando que no exista)
export const crearMesa = (nuevaMesa, mesasExistentes) => {
  // Verificar si el número de mesa ya existe
  if (mesasExistentes.some(mesa => mesa.numero === nuevaMesa.numero)) {
    throw new Error('Ya existe una mesa con ese número');
  }

  // Si no existe, devolvemos una nueva lista con la mesa añadida
  return [...mesasExistentes, nuevaMesa];
};

// Función para actualizar una mesa existente
export const actualizarMesa = (mesaEditada, mesaOriginal, mesasExistentes) => {
  // Verificar si el número editado ya existe en otra mesa
  if (
    mesaEditada.numero !== mesaOriginal.numero &&
    mesasExistentes.some(mesa => mesa.numero === mesaEditada.numero)
  ) {
    throw new Error('Ya existe una mesa con ese número');
  }

  if (mesaEditada.estado === 'libre' && mesaEditada.asignadoA) {
    throw new Error('No se puede asignar empleado a mesa libre');
  }

  // Crear una nueva lista actualizando solo la mesa editada
  return mesasExistentes.map(mesa =>
    mesa.numero === mesaOriginal.numero ? mesaEditada : mesa
  );
};

// Función para eliminar una mesa
export const eliminarMesa = (numeroMesa, mesasExistentes) => {
  return mesasExistentes.filter(mesa => mesa.numero !== numeroMesa);
};

// Función para eliminar todas las mesas
export const eliminarTodasMesas = () => {
  localStorage.removeItem('mesas');
  return [];
};

// Función para obtener el historial de pedidos
export const obtenerHistorialPedidos = () => {
  return JSON.parse(localStorage.getItem('historialPedidos')) || {};
};

// Función para guardar el historial de pedidos
export const guardarHistorialPedidos = (historialPedidos) => {
  localStorage.setItem('historialPedidos', JSON.stringify(historialPedidos));
  return historialPedidos;
};

// Función para agregar un nuevo pedido al historial
export const agregarPedidoAHistorial = (numeroMesa, pedido) => {
  const historialActual = obtenerHistorialPedidos();

  if (!historialActual[numeroMesa]) {
    historialActual[numeroMesa] = [];
  }

  historialActual[numeroMesa].push(pedido);
  guardarHistorialPedidos(historialActual);

  return historialActual;
};

// Función para actualizar referencias en el historial al cambiar número de mesa
export const actualizarReferenciasMesa = (numeroAntiguo, numeroNuevo) => {
  const historialActual = obtenerHistorialPedidos();

  if (historialActual[numeroAntiguo]) {
    historialActual[numeroNuevo] = historialActual[numeroAntiguo];
    delete historialActual[numeroAntiguo];
    guardarHistorialPedidos(historialActual);
  }

  return historialActual;
};

// Función para generar URL del código QR
export const generarUrlQR = (numeroMesa) => {
  const baseUrl = window.location.origin;
  return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${baseUrl}/mesa/${numeroMesa}`;
};


export const meseros = [
  { id: 1, nombre: "Juan Pérez" },
  { id: 2, nombre: "María García" },
  { id: 3, nombre: "Carlos Rodríguez" },
];


export const obtenerEmpleados = () => {
  return meseros; // En futuro podrían venir de una API
};

