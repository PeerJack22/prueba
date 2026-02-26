import {Route , Routes} from 'react-router-dom'
import Login from './pages/Login'
import Clientes from './pages/Clientes'
import Reservas from './pages/Reservas'
import Vehiculos from './pages/Vehiculos'
import PrivateRoutes from './components/PrivateRoutes'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/clientes" element={<PrivateRoutes><Clientes /></PrivateRoutes>} />
      <Route path="/reservas" element={<PrivateRoutes><Reservas /></PrivateRoutes>} />
      <Route path="/vehiculos" element={<PrivateRoutes><Vehiculos /></PrivateRoutes>} />
    </Routes>
  )
}

export default App
