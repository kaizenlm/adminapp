// Función para obtener usuarios desde localStorage
export const obtenerUsuarios = () => {
    const datos = JSON.parse(localStorage.getItem('AdminAPP_temp')) || { Usuarios_temp: [] };
    return datos.Usuarios_temp;
};

// Función para guardar usuarios en localStorage
export const guardarUsuarios = (usuarios) => {
    localStorage.setItem('AdminAPP_temp', JSON.stringify({ Usuarios_temp: usuarios }));
};

// Función para agregar un nuevo usuario
export const agregarUsuario = (usuario) => {
    const usuarios = obtenerUsuarios();
    usuarios.push({ ...usuario, estado: true });
    guardarUsuarios(usuarios);
};

// Función para editar un usuario
export const editarUsuario = (id, nuevosDatos) => {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...nuevosDatos };
        guardarUsuarios(usuarios);
    }
};

// Función para desactivar un usuario
export const desactivarUsuario = (id) => {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
        usuarios[index].estado = false;
        guardarUsuarios(usuarios);
    }
};

export const eliminarUsuario = (id) => {
    const usuarios = obtenerUsuarios();
    const index = usuarios.findIndex(user => user.id === id);
    if (index !== -1) {
        usuarios.splice(index, 1);  // Eliminar el usuario de la lista.
    }
};