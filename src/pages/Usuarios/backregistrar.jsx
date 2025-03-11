// // Función para obtener usuarios desde localStorage
// export const obtenerUsuarios = () => {
//     const datos = JSON.parse(localStorage.getItem('AdminAPP_temp')) || { Usuarios_temp: [] };
//     return datos.Usuarios_temp;
// };

export const obtenerUsuarios = () => {
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosGuardados;
};

// // Función para guardar usuarios en localStorage
// export const guardarUsuarios = (usuarios) => {
//     localStorage.setItem('AdminAPP_temp', JSON.stringify({ Usuarios_temp: usuarios }));
// };


// Función para guardar el array de mesas en localStorage
export const guardarUsuarios = (usuarios) => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return usuarios;
};


// // Función para agregar un nuevo usuario
// export const agregarUsuario = (usuario) => {
//     const usuarios = obtenerUsuarios();
//     usuarios.push({ ...usuario, estado: true });
//     guardarUsuarios(usuarios);
// };


// Función para crear un nuevo usuario (validando que no exista)
export const crearUsuario = (nuevoUsuario, usuariosExistentes) => {
    // Verificar si el id de usuario ya existe
    if (usuariosExistentes.some(usuario => usuario.id === nuevoUsuario.id)) {
        throw new Error('Ya existe un Usuario con esa ID');
    }

    // Si no existe, devolvemos una nueva lista con el usuario añadido
    return [...usuariosExistentes, nuevoUsuario];
};

// // Función para editar un usuario
// export const editarUsuario = (id, nuevosDatos) => {
//     const usuarios = obtenerUsuarios();
//     const index = usuarios.findIndex(user => user.id === id);
//     if (index !== -1) {
//         usuarios[index] = { ...usuarios[index], ...nuevosDatos };
//         guardarUsuarios(usuarios);
//     }
// };


// Función para actualizar un usuario existente
export const actualizarUsuario = (usuarioEditado, usuarioOriginal, usuariosExistentes) => {
    // Verificar si el id editado ya existe en otro usuario
    if (
        usuarioEditado.id !== usuarioOriginal.id &&
        usuariosExistentes.some(usuario => usuario.id === usuarioEditado.id)
    ) {
        throw new Error('Ya existe un Usuario con esa ID');
    }

    // Crear una nueva lista actualizando solo el usuario editado
    return usuariosExistentes.map(usuario =>
        usuario.id === usuarioOriginal.id ? usuarioEditado : usuario
    );
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

// export const eliminarUsuario = (id) => {
//     const usuarios = obtenerUsuarios();
//     const index = usuarios.findIndex(user => user.id === id);
//     if (index !== -1) {
//         usuarios.splice(index, 1);  // Eliminar el usuario de la lista.
//     }
// };


// Función para eliminar un usuario
export const eliminarUsuario = (idUsuario, usuariosExistentes) => {
    return usuariosExistentes.filter(usuario => usuario.id !== idUsuario);
};


// Función para eliminar ttodos los usuarios
export const eliminarTodosUsuarios = () => {
    localStorage.removeItem('usuarios');
    return [];
};