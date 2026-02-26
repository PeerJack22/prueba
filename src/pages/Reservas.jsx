import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'

function Reservas() {
const user = localStorage.getItem('user')

const [clientes, setClientes] = useState([])
const [vehiculos, setVehiculos] = useState([])
const [reservas, setReservas] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState('')
const [editando, setEditando] = useState(null)
const [mostrandoFormulario, setMostrandoFormulario] = useState(false)

const [formularioReserva, setFormularioReserva] = useState({
    codigo: '',
    descripcion: '',
    clienteId: '',
    vehiculoId: ''
})

useEffect(() => {
    cargarDatos()
}, [])

const cargarDatos = async () => {
    try {
        setLoading(true)
        const [clientesRes, vehiculosRes, reservasRes] = await Promise.all([
            api.get('/clientes'),
            api.get('/vehiculos'),
            api.get('/reservas')
        ])
        
        setClientes(clientesRes.data)
        setVehiculos(vehiculosRes.data)
        setReservas(reservasRes.data)
        setError('')
    } catch (err) {
        setError('Error al cargar los datos')
        console.error(err)
    } finally {
        setLoading(false)
    }
}

const limpiarFormulario = () => {
    setFormularioReserva({
        codigo: '',
        descripcion: '',
        clienteId: '',
        vehiculoId: ''
    })
    setEditando(null)
    setMostrandoFormulario(false)
    setError('')
}

const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormularioReserva(prev => ({
        ...prev,
        [name]: value
    }))
}

const validarFormulario = () => {
    const { codigo, descripcion, clienteId, vehiculoId } = formularioReserva
    if (!codigo.trim() || !descripcion.trim() || !clienteId || !vehiculoId) {
        setError('Todos los campos son obligatorios')
        return false
    }
    return true
}

const agregarReserva = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    try {
        setLoading(true)
        const response = await api.post('/reservas', formularioReserva)
        setReservas([...reservas, response.data])
        limpiarFormulario()
        setError('')
    } catch (err) {
        setError('Error al crear la reserva')
        console.error(err)
    } finally {
        setLoading(false)
    }
}

const actualizarReserva = async (e) => {
    e.preventDefault()
    if (!validarFormulario()) return

    try {
        setLoading(true)
        const response = await api.put(`/reservas/${editando}`, formularioReserva)
        setReservas(reservas.map(r => r._id === editando ? response.data : r))
        limpiarFormulario()
        setError('')
    } catch (err) {
        setError('Error al actualizar la reserva')
        console.error(err)
    } finally {
        setLoading(false)
    }
}

const iniciarEdicion = (reserva) => {
    setFormularioReserva({
        codigo: reserva.codigo || '',
        descripcion: reserva.descripcion || '',
        clienteId: reserva.clienteId || reserva.cliente?._id || '',
        vehiculoId: reserva.vehiculoId || reserva.vehiculo?._id || ''
    })
    setEditando(reserva._id)
    setMostrandoFormulario(true)
    setError('')
}

// Para eliminar la reserva
const eliminarReserva = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta reserva?')) {
        try {
            setLoading(true)
            await api.delete(`/reservas/${id}`)
            setReservas(reservas.filter(r => r._id !== id))
            setError('')
        } catch (err) {
            setError('Error al eliminar la reserva')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
}

const obtenerNombreCliente = (reserva) => {
    if (reserva.cliente) {
        return `${reserva.cliente.nombre} ${reserva.cliente.apellido}`
    }
    const cliente = clientes.find(c => c._id === reserva.clienteId)
    return cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente no encontrado'
}

const obtenerNombreVehiculo = (reserva) => {
    if (reserva.vehiculo) {
        return `${reserva.vehiculo.marca} ${reserva.vehiculo.modelo}`
    }
    const vehiculo = vehiculos.find(v => v._id === reserva.vehiculoId)
    return vehiculo ? `${vehiculo.marca} ${vehiculo.modelo}` : 'Vehículo no encontrado'
}

return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Reservas de vehiculos</h2>
            <p className="text-2xl font-semibold text-gray-700">Bienvenido {user}</p>
            <p className="text-gray-600">Reserva vehículos para los clientes</p>
        </div>

        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
            </div>
        )}

        <div className="mb-6">
            <button
                onClick={() => {
                    setMostrandoFormulario(!mostrandoFormulario)
                    if (!mostrandoFormulario) {
                        limpiarFormulario()
                    }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
                {mostrandoFormulario ? 'Ocultar Formulario' : 'Nueva Reserva'}
            </button>
        </div>

        {mostrandoFormulario && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {editando ? 'Editar Reserva' : 'Nueva Reserva'}
                </h3>
                
                <form onSubmit={editando ? actualizarReserva : agregarReserva}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Código *</label>
                            <input 
                                type="text" 
                                name="codigo"
                                value={formularioReserva.codigo} 
                                onChange={manejarCambio}
                                placeholder="Código de la reserva"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Cliente *</label>
                            <select 
                                name="clienteId"
                                value={formularioReserva.clienteId} 
                                onChange={manejarCambio}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                required
                            >
                                <option value="">Seleccione cliente</option>
                                {clientes.map(cliente => (
                                <option key={cliente._id} value={cliente._id}>
                                    {cliente.nombre} {cliente.apellido}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vehículo *</label>
                            <select 
                                name="vehiculoId"
                                value={formularioReserva.vehiculoId} 
                                onChange={manejarCambio}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                required
                            >
                                <option value="">Seleccione vehículo</option>
                                {vehiculos.map(vehiculo => (
                                <option key={vehiculo._id} value={vehiculo._id}>
                                    {vehiculo.marca} {vehiculo.modelo} - {vehiculo.placa}
                                </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
                            <textarea 
                                name="descripcion"
                                value={formularioReserva.descripcion}
                                onChange={manejarCambio}
                                placeholder="Descripción de la reserva"
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                        >
                            {loading ? 'Guardando...' : (editando ? 'Actualizar' : 'Reservar')}
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
        )}

        {loading && !mostrandoFormulario && (
            <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="text-gray-600 mt-2">Cargando reservas...</p>
            </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">Reservas Registradas</h3>
            </div>
            <div className="divide-y divide-gray-200">
                {reservas.map(reserva => (
                <div key={reserva._id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <p className="text-lg font-medium text-gray-800">
                                    Código: {reserva.codigo}
                                </p>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-1">
                                Cliente: <span className="font-semibold text-green-600">{obtenerNombreCliente(reserva)}</span>
                            </p>
                            
                            <p className="text-sm text-gray-600 mb-2">
                                Vehículo: <span className="font-semibold text-blue-600">{obtenerNombreVehiculo(reserva)}</span>
                            </p>
                            
                            {reserva.descripcion && (
                                <p className="text-sm text-gray-500 mt-2 italic">{reserva.descripcion}</p>
                            )}
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                            <button 
                                onClick={() => iniciarEdicion(reserva)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                            >
                                Editar
                            </button>
                            <button 
                                onClick={() => eliminarReserva(reserva._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors duration-200"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            {reservas.length === 0 && !loading && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📅</div>
                    <p className="text-gray-500 text-lg">No hay reservas registradas</p>
                    <p className="text-gray-400 text-sm mt-2">Crea una nueva reserva para comenzar</p>
                </div>
            )}
        </div>
    </div>
    </div>
)
}

export default Reservas
