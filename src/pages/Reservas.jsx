import { useState } from 'react'
import Navbar from '../components/Navbar'

function Reservas() {
const user = localStorage.getItem('user')

  // Datos simulados: estudiantes y materias
const [Clientes] = useState([
    { id: 1, nombre: 'Ana', apellido: 'Pérez', correo: 'ana@correo.com' },
    { id: 2, nombre: 'Luis', apellido: 'García', correo: 'luis@correo.com' }
])

const [vehiculos] = useState([
    { id: 1, nombre: 'auto1' },
    { id: 2, nombre: 'auto2' }
])

  // Lista de matrículas
const [matriculas, setMatriculas] = useState([])
const [nuevoCliente, setNuevoCliente] = useState('')
const [nuevoVehiculo, setNuevoVehiculo] = useState('')

  // Crear matrícula
const agregarMatricula = () => {
    if (nuevoCliente && nuevoVehiculo) {
    const cliente = Clientes.find(c => c.id === parseInt(nuevoCliente))
    const vehiculo = vehiculos.find(v => v.id === parseInt(nuevoVehiculo))

    const nuevaMatricula = {
        id: Date.now(),
        cliente,
        vehiculo
    }

    setMatriculas([...matriculas, nuevaMatricula])
    setNuevoCliente('')
    setNuevoVehiculo('')
    }
}

  // Eliminar matrícula
const eliminarMatricula = (id) => {
    setMatriculas(matriculas.filter(m => m.id !== id))
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

        {/* Formulario de matrícula */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Nueva Reserva</h3>
            <div className="grid md:grid-cols-3 gap-4">
                <select 
                    value={nuevoCliente} 
                    onChange={(e) => setNuevoCliente(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200">
                    <option value="">Seleccione cliente</option>
                    {Clientes.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.nombre} {c.apellido}
                    </option>
                    ))}
                </select>

                <select 
                    value={nuevoVehiculo} 
                    onChange={(e) => setNuevoVehiculo(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200">
                    <option value="">Seleccione vehículo</option>
                    {vehiculos.map(v => (
                    <option key={v.id} value={v.id}>
                        {v.nombre}
                    </option>
                    ))}
                </select>

                <button 
                    onClick={agregarMatricula}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                    Reservar
                </button>
            </div>
        </div>

        {/* Lista de reservas */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700">Reservas Registradas</h3>
            </div>
            <div className="divide-y divide-gray-200">
                {matriculas.map(m => (
                <div key={m.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <p className="text-lg font-medium text-gray-800">
                                {m.cliente.nombre} {m.cliente.apellido}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Vehículo: <span className="font-semibold text-blue-600">{m.vehiculo.nombre}</span>
                            </p>
                        </div>
                        <button 
                            onClick={() => eliminarMatricula(m.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                            Eliminar
                        </button>
                    </div>
                </div>
                ))}
            </div>
            {matriculas.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No hay reservas registradas</p>
                    <p className="text-gray-400 text-sm mt-2">Selecciona un cliente y vehículo para comenzar</p>
                </div>
            )}
        </div>
    </div>
    </div>
)
}

export default Reservas
