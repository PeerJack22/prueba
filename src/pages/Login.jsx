import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Login() {
    
    const [email, setEmail] = useState("")
    const [clave, setClave] = useState("")
    const navigate = useNavigate()


    const handleLogin = (e) => {
        e.preventDefault() 

        if (email === 'admin@gmail.com' && clave === '123') {
            alert('Inicio de sesión exitoso')
            localStorage.setItem('user', email) 
            navigate('/clientes')
        } else {
            alert('Credenciales incorrectas')
        }
    }

return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sistema de gestión de renta de carros</h2>
                <p className="text-gray-600">Iniciar sesión</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="ejemplo@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Clave
                    </label>
                    <input 
                        type="password" 
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                        required
                        placeholder="••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                    Ingresar
                </button>
            </form>
            <div className="mt-6 text-center text-sm text-gray-600">
                <p>Credenciales de prueba:</p>
                <p className="font-mono text-xs mt-1">admin@gmail.com / 123</p>
            </div>
        </div>
    </div>
)

}



export default Login

