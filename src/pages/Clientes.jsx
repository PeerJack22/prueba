import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'

function Clientes() {
const [clientes, setClientes] = useState([])
const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    ciudad: '',
    email: '',
    direccion: '',
    telefono: '',
    fecha_nacimiento: ''
})
const [editando, setEditando] = useState(null)

  // Cargar clientes desde el backend
useEffect(() => {
    api.get('/clientes')
    .then(res => setClientes(res.data))
    .catch(err => console.error(err))
}, [])

  // Crear o actualizar cliente
const handleSubmit = (e) => {
    e.preventDefault()
    if (editando) {
      // Actualizar
    api.put(`/clientes/${editando}`, formData)
        .then(res => {
        setClientes(clientes.map(cli => cli._id === editando ? res.data : cli))
        resetForm()
        })
        .catch(err => console.error(err))
    } else {
      // Crear
    api.post('/clientes', formData)
        .then(res => setClientes([...clientes, res.data]))
        .catch(err => console.error(err))
    resetForm()
    }
}

  // Eliminar cliente
const eliminarCliente = (id) => {
    api.delete(`/clientes/${id}`)
    .then(() => setClientes(clientes.filter(c => c._id !== id)))
    .catch(err => console.error(err))
}

  // Editar cliente
const editarCliente = (cliente) => {
    setFormData({
    cedula: cliente.cedula,
    nombre: cliente.nombre,
    apellido: cliente.apellido,
    ciudad: cliente.ciudad,
    email: cliente.email,
    direccion: cliente.direccion,
    telefono: cliente.telefono,
    fecha_nacimiento: cliente.fecha_nacimiento
    })
    setEditando(cliente._id)
}

  // Resetear formulario
const resetForm = () => {
    setFormData({ cedula: '', nombre: '', apellido: '', ciudad: '', email: '', direccion: '', telefono: '', fecha_nacimiento: '' })
    setEditando(null)
}

return (
    <div className="min-h-screen bg-gray-50">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Gestión de Clientes</h2>
        <p className="text-gray-600">Administra los clientes del sistema</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
            {editando ? 'Editar Cliente' : 'Agregar Cliente'}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
            <input type="text"
                placeholder="Cédula"
                value={formData.cedula}
                onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <input
                type="text"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <input type="text"
                placeholder="Ciudad"
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <input
                type="email"
                placeholder="Correo electrónico"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <input type="text"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <input type="text"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            <input type="date"
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
            </div>
            <div className="flex gap-3">
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                {editando ? 'Actualizar' : 'Agregar'}
            </button>
            {editando && (
                <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md">
                Cancelar
                </button>
            )}
            </div>
        </form>
        </div>

        {/* Lista de clientes */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Nacimiento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {clientes.map(cliente => (
                <tr key={cliente._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.cedula}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nombre}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.apellido}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.ciudad}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.correo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.telefono}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cliente.fechaNacimiento}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                        onClick={() => editarCliente(cliente)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition-colors duration-200">
                    </button>
                    <button
                        onClick={() => eliminarCliente(cliente._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors duration-200">
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        {clientes.length === 0 && (
            <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay clientes registrados</p>
            <p className="text-gray-400 text-sm mt-2">Agrega un cliente para comenzar</p>
            </div>
        )}
        </div>
    </div>
    </div>
)
}

export default Clientes