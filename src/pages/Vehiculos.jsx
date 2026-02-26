import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'

function Vehiculos() {
const [vehiculos, setVehiculos] = useState([])
const [nuevoVehiculo, setNuevoVehiculo] = useState('')

  // Cargar vehículos desde el backend
useEffect(() => {
    api.get('/vehiculos')
    .then(res => setVehiculos(res.data))
    .catch(err => console.error(err))
}, [])

  // Crear vehículo en el backend
const agregarVehiculo = () => {
    if (nuevoVehiculo.trim() !== '') {
    api.post('/vehiculos', { nombre: nuevoVehiculo })
        .then(res => setVehiculos([...vehiculos, res.data]))
        .catch(err => console.error(err))
    setNuevoVehiculo('')
    }
}

  // Eliminar vehículo en el backend
const eliminarVehiculo = (id) => {
    api.delete(`/vehiculos/${id}`)
    .then(() => setVehiculos(vehiculos.filter(v => v._id !== id)))
    .catch(err => console.error(err))
}

return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Vehículos</h2>
            <p className='text-2xl font-semibold text-gray-700'>Bienvenido, {localStorage.getItem('user')}</p>
            <p className="text-gray-600">Administra los vehículos del sistema</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <input 
                        type="text" 
                        value={nuevoVehiculo} 
                        onChange={(e) => setNuevoVehiculo(e.target.value)} 
                        placeholder="Marca" 
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    />
                    <input type="text" placeholder="Modelo" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />
                    <input type="date" placeholder='Año de fabricación' className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />
                    <input type="text" placeholder="Placa" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />
                    <input type="text" placeholder="Color" className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />
                    <input type="text" placeholder='Tipo de vehiculo' className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />
                    <input type="number" placeholder='Kilometraje' className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />
                    <input type="text" placeholder='Descripción' className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />
                </div>
                <button 
                    onClick={agregarVehiculo}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg w-full md:w-auto">
                    Agregar
                </button>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {vehiculos.map(v => (
            <div key={v._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800">{v.modelo}</h3>
                    </div>
                    <button 
                        onClick={() => eliminarVehiculo(v._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                        Eliminar
                    </button>
                </div>
            </div>
            ))}
        </div>
        
        {vehiculos.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-500 text-lg">No hay vehículos registrados</p>
                <p className="text-gray-400 text-sm mt-2">Agrega un vehículo para comenzar</p>
            </div>
        )}
    </div>
    </div>
)
}

export default Vehiculos
