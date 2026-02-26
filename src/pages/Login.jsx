import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from '../services/api'

function Login() {
    
    const [email, setEmail] = useState("")
    const [clave, setClave] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault() 

        try {
            setLoading(true)
            setError('')
            
            const response = await api.post('/auth/login', {
            email,
            clave
            })

            if (response.data.token) {
            localStorage.setItem('token', response.data.token)
            // Configurar el token en los headers por defecto
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            }
            
            localStorage.setItem('user', response.data.user?.email || email)
            navigate('/usarios')
            
        } catch (err) {
            if (err.response?.status === 401) {
                setError('Credenciales incorrectas')
            } else if (err.response?.data?.message) {
                setError(err.response.data.message)
            } else {
                setError('Error al conectar con el servidor')
            }
            console.error('Error de login:', err)
        } finally {
            setLoading(false)
        }
    }

return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Sistema de gestión de renta de carros</h2>
                <p className="text-gray-600">Iniciar sesión</p>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                    {error}
                </div>
            )}

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
                        disabled={loading}
                        placeholder="ejemplo@gmail.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100"
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
                        disabled={loading}
                        placeholder="••••••"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed">
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Ingresando...
                        </div>
                    ) : (
                        'Ingresar'
                    )}
                </button>
            </form>
        </div>
    </div>
)

}



export default Login

