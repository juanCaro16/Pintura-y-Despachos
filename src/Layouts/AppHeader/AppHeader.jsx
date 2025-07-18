"use client"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Menu, Bell, User } from "lucide-react"

const AppHeader = ({ userRole, userName, onToggleSidebar, sidebarOpen }) => {
  const [notifications, setNotifications] = useState(3)
  const location = useLocation()

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

  const handleMenuClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    

    if (onToggleSidebar) {
      onToggleSidebar()
    } else {
      console.error("onToggleSidebar is not defined!")
    }
  }

  return (
    <header className="bg-white shadow-md py-3 px-4 sm:py-4 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleMenuClick}
            className="mr-3 p-2 rounded-md hover:bg-gray-100 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-blue-500"
            style={{ minWidth: "40px", minHeight: "40px" }} // Ensure touch target
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 truncate">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell size={18} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <div className="ml-2 hidden sm:block">
              <p className="text-sm font-medium truncate  max-w-35">{userName || "Usuario"}</p>
              <p className="text-xs text-gray-500 truncate">
                {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </header>
  )
}

export default AppHeader
