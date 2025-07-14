import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import AppHeader from "./Layouts/AppHeader/AppHeader"
import Sidebar from "./Components/SideBar/SideBar"
import Dashboard from "./Pages/DashBoard/DashBoard"
import BodegaPintura from "./Pages/BodegaPintura/BodegaPintura"
import ProgramacionPintura from "./Pages/ProgramacionPintura/ProgramacionPintura"
import BodegaAlistamiento from "./Pages/BodegaAlistamiento/BodegaAlistamiento"
import ProgramacionDespacho from "./Pages/ProgramacionDespacho/ProgramacionDespacho"
import Reportes from "./Pages/Reportes/Reportes"
import GestionUsuarios from "./Pages/GestionUsuarios/GestionUsuarios"
import Login from "./Pages/Login/Login"
import "./index.css"


export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole={userRole} onLogout={handleLogout} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <AppHeader userRole={userRole} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard userRole={userRole} />} />
            <Route path="/bodega-pintura" element={<BodegaPintura />} />
            <Route path="/programacion-pintura" element={<ProgramacionPintura />} />
            <Route path="/bodega-alistamiento" element={<BodegaAlistamiento />} />
            <Route path="/programacion-despacho" element={<ProgramacionDespacho />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route
              path="/gestion-usuarios"
              element={userRole === "administrador" ? <GestionUsuarios /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
