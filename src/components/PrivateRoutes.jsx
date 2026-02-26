import { Navigate } from "react-router-dom";

function PrivateRoutes({ children }) {
    // Para saber si esta autenticado el usuario
    const isLoggedIn = localStorage.getItem('user') !== null;

    // Si el usuario no inicio sesión se pone en el Login
    return isLoggedIn ? children : <Navigate to="/" />

}

export default PrivateRoutes