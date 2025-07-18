import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
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
  const [userName, setUserName] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check for stored authentication on app load
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedRole = localStorage.getItem("userRole")
    const storedName = localStorage.getItem("userName")

    if (token && storedRole) {
      setIsAuthenticated(true)
      setUserRole(storedRole)
      setUserName(storedName)
    }

    setLoading(false)
  }, [])

  const handleLogin = (role) => {
    setIsAuthenticated(true)
    setUserRole(role)
    const storedName = localStorage.getItem("userName")
    setUserName(storedName)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserRole(null)
    setUserName(null)
    setSidebarOpen(false)

    // Clear stored authentication
    localStorage.removeItem("token")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
  }

  const toggleSidebar = () => {
    console.log("toggleSidebar called, current state:", sidebarOpen)
    setSidebarOpen((prev) => !prev)
  }

  const closeSidebar = () => {
    console.log("closeSidebar called")
    setSidebarOpen(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Cargando...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-opacity-50 z-40 lg:hidden" onClick={closeSidebar} />}

      <Sidebar userRole={userRole} onLogout={handleLogout} isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <AppHeader userRole={userRole} userName={userName} onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Routes>
            <Route path="/" element={<Dashboard userRole={userRole} />} />
            <Route
              path="/bodega-pintura"
              element={
                userRole === "administrador" || userRole === "lider pintura" ? (
                  <BodegaPintura />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/programacion-pintura"
              element={
                userRole === "administrador" || userRole === "lider pintura" ? (
                  <ProgramacionPintura />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/bodega-alistamiento"
              element={
                userRole === "administrador" || userRole === "lider despacho" ? (
                  <BodegaAlistamiento />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/programacion-despacho"
              element={
                userRole === "administrador" || userRole === "lider despacho" ? (
                  <ProgramacionDespacho />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/reportes"
              element={userRole === "administrador" ? <Reportes /> : <Navigate to="/" replace />}
            />
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
