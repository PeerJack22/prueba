import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'

function Vehiculos() {
const [vehiculos, setVehiculos] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [editando, setEditando] = useState(null)

// Para el formulario
const [formularioVehiculo, setFormularioVehiculo] = useState({
    marca: '',
    modelo: '',
    anio_fabricacion: '',
    placa: '',
    color: '',
    tipo_vehiculo: '',
    kilometraje: '',
    descripcion: ''
})

// Obtener los vehiculos
useEffect(() => {
    cargarVehiculos()
}, [])

const cargarVehiculos = async () => {
    try {
        setLoading(true)
        const response = await api.get('/vehiculos')
        setVehiculos(response.data)
        setError('')
    } catch (err) {
        setError('Error al cargar los vehículos')
        console.error(err)
    } finally {
        setLoading(false)
    }
}


const limpiarFormulario = () => {
    setFormularioVehiculo({
        marca: '',
        modelo: '',
        anio_fabricacion: '',
        placa: '',
        color: '',
        tipo_vehiculo: '',
        kilometraje: '',
        descripcion: ''
    })
    setEditando(null)
    setError('')
}


const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormularioVehiculo(prev => ({
        ...prev,
        [name]: value
    }))
}


const validarFormulario = () => {
    const { marca, modelo, placa } = formularioVehiculo
    if (!marca.trim() || !modelo.trim() || !placa.trim()) {
        setError('Marca, modelo y placa son campos obligatorios')
        return false
    }
    return true
}

// Crear vehículo 
const agregarVehiculo = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    try {
        setLoading(true)
        const response = await api.post('/vehiculos', formularioVehiculo)
        setVehiculos([...vehiculos, response.data])
        limpiarFormulario()
        setError('')
    } catch (err) {
        setError('Error al crear el vehículo')
        console.error(err)
    } finally {
        setLoading(false)
    }
}

// Actualizar vehículo
const actualizarVehiculo = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    try {
        setLoading(true)
        const response = await api.put(`/vehiculos/${editando}`, formularioVehiculo)
        setVehiculos(vehiculos.map(v => v._id === editando ? response.data : v))
        limpiarFormulario()
        setError('')
    } catch (err) {
        setError('Error al actualizar el vehículo')
        console.error(err)
    } finally {
        setLoading(false)
    }
}


const iniciarEdicion = (vehiculo) => {
    setFormularioVehiculo({
        marca: vehiculo.marca || '',
        modelo: vehiculo.modelo || '',
        anio_fabricacion: vehiculo.anio_fabricacion || '',
        placa: vehiculo.placa || '',
        color: vehiculo.color || '',
        tipo_vehiculo: vehiculo.tipo_vehiculo || '',
        kilometraje: vehiculo.kilometraje || '',
        descripcion: vehiculo.descripcion || ''
    })
    setEditando(vehiculo._id)
    setError('')
}

// Eliminar vehículo 
const eliminarVehiculo = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
        try {
            setLoading(true)
            await api.delete(`/vehiculos/${id}`)
            setVehiculos(vehiculos.filter(v => v._id !== id))
            setError('')
        } catch (err) {
            setError('Error al eliminar el vehículo')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
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

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {editando ? 'Editar Vehículo' : 'Agregar Nuevo Vehículo'}
                </h3>
                
                <form onSubmit={editando ? actualizarVehiculo : agregarVehiculo}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Marca *</label>
                            <input 
                                type="text" 
                                name="marca"
                                value={formularioVehiculo.marca} 
                                onChange={manejarCambio}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo *</label>
                            <input 
                                type="text" 
                                name="modelo"
                                value={formularioVehiculo.modelo}
                                onChange={manejarCambio}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Año</label>
                            <input 
                                type="number" 
                                name="anio_fabricacion"
                                value={formularioVehiculo.anio_fabricacion}
                                onChange={manejarCambio}
                                min="1900"
                                max="2030"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Placa *</label>
                            <input 
                                type="text" 
                                name="placa"
                                value={formularioVehiculo.placa}
                                onChange={manejarCambio}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                            <input 
                                type="text" 
                                name="color"
                                value={formularioVehiculo.color}
                                onChange={manejarCambio}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Vehículo</label>
                            <select 
                                name="tipo_vehiculo"
                                value={formularioVehiculo.tipo_vehiculo}
                                onChange={manejarCambio}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                            >
                                <option value="">Seleccione tipo</option>
                                <option value="pequeno">Auto pequeño</option>
                                <option value="mediano">Auto mediano</option>
                                <option value="grande">Auto grande</option>
                                <option value="van">Van</option>
                                <option value="Camion">Camión</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kilometraje</label>
                            <input 
                                type="number" 
                                name="kilometraje"
                                value={formularioVehiculo.kilometraje}
                                onChange={manejarCambio}
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                            />
                        </div>
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea 
                                name="descripcion"
                                value={formularioVehiculo.descripcion}
                                onChange={manejarCambio}
                                placeholder="Descripción del vehículo" 
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            {loading ? 'Guardando...' : (editando ? 'Actualizar' : 'Agregar')}
                        </button>
                        
                        <button 
                            type="button"
                            onClick={limpiarFormulario}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>

        {loading && (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-2">Cargando vehículos...</p>
            </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vehiculos.map(vehiculo => (
                <div key={vehiculo._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {vehiculo.marca} {vehiculo.modelo}
                            </h3>
                            <p className="text-sm text-gray-500">{vehiculo.anio_fabricacion}</p>
                        </div>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => iniciarEdicion(vehiculo)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => eliminarVehiculo(vehiculo._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm font-medium text-gray-600">Placa:</span>
                            <span className="text-sm text-gray-800">{vehiculo.placa || 'N/A'}</span>
                        </div>
                        
                        {vehiculo.color && (
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-600">Color:</span>
                                <span className="text-sm text-gray-800">{vehiculo.color}</span>
                            </div>
                        )}
                        
                        {vehiculo.tipo_vehiculo && (
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-600">Tipo:</span>
                                <span className="text-sm text-gray-800">{vehiculo.tipo_vehiculo}</span>
                            </div>
                        )}
                        
                        {vehiculo.kilometraje && (
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-600">Kilometraje:</span>
                                <span className="text-sm text-gray-800">{Number(vehiculo.kilometraje).toLocaleString()} km</span>
                            </div>
                        )}
                        
                        {vehiculo.descripcion && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-sm text-gray-600">{vehiculo.descripcion}</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        
        {vehiculos.length === 0 && !loading && (
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
