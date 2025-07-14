import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Menu, Bell, User } from "lucide-react"

const AppHeader = ({ userRole }) => {
  const [notifications, setNotifications] = useState(3)
  const location = useLocation()

  // Función para obtener el título según la ruta actual
  const getPageTitle = () => {
    const path = location.pathname

    switch (path) {
      case "/":
        return "Dashboard"
      case "/bodega-pintura":
        return "Bodega de Pintura"
      case "/programacion-pintura":
        return "Programación de Pintura"
      case "/bodega-alistamiento":
        return "Bodega de Alistamiento"
      case "/programacion-despacho":
        return "Programación de Despacho"
      case "/reportes":
        return "Reportes e Indicadores"
      case "/gestion-usuarios":
        return "Gestión de Usuarios"
      default:
        return "Dashboard"
    }
  }

  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button className="mr-4 md:hidden">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <div className="ml-2 hidden md:block">
              <p className="text-sm font-medium">
                {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : "Usuario"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
