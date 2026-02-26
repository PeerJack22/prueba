import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    // Para cerrar la sesión
    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    }

    return(
        <nav className="bg-blue-600 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-8">
                        <Link 
                            to="/clientes" 
                            className="text-white hover:text-blue-200 font-medium transition-colors duration-200">
                            Clientes
                        </Link>
                        <Link 
                            to="/Vehiculos" 
                            className="text-white hover:text-blue-200 font-medium transition-colors duration-200">
                            Vehículos
                        </Link>
                        <Link 
                            to="/Reservas" 
                            className="text-white hover:text-blue-200 font-medium transition-colors duration-200">
                            Reservas
                        </Link>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 shadow-md">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;