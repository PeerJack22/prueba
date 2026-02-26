import {Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Clientes from './pages/Clientes'
import Reservas from './pages/Reservas'
import Vehiculos from './pages/Vehiculos'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/reservas" element={<Reservas />} />
      <Route path="/vehiculos" element={<Vehiculos />} />
    </Routes>
  )
}

export default App
