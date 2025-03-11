
// const usuariosMock = [
//     { username: 'Dev', password: 'K147593', accesslevel: 3 },
//     { username: 'Admin', password: 'K147593', accesslevel: 2 },
//     { username: 'Worker', password: 'K147593', accesslevel: 1 },
//     { username: 'Owner', password: 'K147593', accesslevel: 3 },
// ];

// const sesion = JSON.parse(localStorage.getItem('Sesion_Usuario'));

// if (sesion) {
//     console.log(`Usuario logueado: ${sesion.username}, Nivel de acceso: ${sesion.accesslevel}`);
// } else {
//     console.log('No hay sesión activa');
// }

// const handleLogout = () => {
//     localStorage.removeItem('Sesion_Usuario');
//     alert('Sesión cerrada');
// };

// const [username, setUsername] = useState('');
// const [password, setPassword] = useState('');
// const [error, setError] = useState('');
// const navigate = useNavigate();

// const handleLogin = (e) => {
//     e.preventDefault();

//     const usuarioEncontrado = usuariosMock.find(
//         (u) => u.username === username && u.password === password
//     );

//     if (usuarioEncontrado) {
//         const { password, ...datosSesion } = usuarioEncontrado; // Excluimos password
//         localStorage.setItem('Sesion_Usuario', JSON.stringify(datosSesion));
//         alert(`Bienvenido ${datosSesion.username}!`);
//         // Simular redirección
//         console.log('Datos Sesion:', datosSesion);
//         navigate('/menu');
//     } else {
//         setError('Usuario o contraseña incorrectos');
//     }
// };


export const usuariosMock = [
    { username: 'Dev', password: 'K147593', accesslevel: 3 },
    { username: 'Admin', password: 'K147593', accesslevel: 2 },
    { username: 'Worker', password: 'K147593', accesslevel: 1 },
    { username: 'Owner', password: 'K147593', accesslevel: 3 },
];

export const validarCredenciales = (username, password) => {
    const usuarioEncontrado = usuariosMock.find(
        (u) => u.username === username && u.password === password
    );

    if (usuarioEncontrado) {
        const { password, ...datosSesion } = usuarioEncontrado; 
        return datosSesion;
    }
    return null;
};

export const cerrarSesion = () => {
    localStorage.removeItem('Sesion_Usuario');
};

export const obtenerSesion = () => {
    return JSON.parse(localStorage.getItem('Sesion_Usuario'));
};

export const guardarSesion = (datosSesion) => {
    localStorage.setItem('Sesion_Usuario', JSON.stringify(datosSesion));
};

export const handleLogout = (navigate) => {
    localStorage.removeItem('Sesion_Usuario');
    alert('Sesion cerrada');
    navigate('/login');
};

export const verificarSesion = (navigate) => {
    const sesion = JSON.parse(localStorage.getItem('Sesion_Usuario'));
    if (!sesion) {
        navigate('/login');  // Si no hay sesión, redirigir al login
    }
};