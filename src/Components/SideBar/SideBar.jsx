import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Package, Calendar, Truck, BarChart2, Users, LogOut, ChevronRight, X } from "lucide-react"
import Swal from "sweetalert2"
import logo from "../../assets/images/logo2.png"


const Sidebar = ({ userRole, onLogout, isOpen, onClose }) => {
  const location = useLocation()
  const [expanded, setExpanded] = useState(true)

  // Remove the problematic useEffect that was auto-closing the sidebar
  // useEffect(() => {
  //   if (window.innerWidth < 1024) {
  //     onClose()
  //   }
  // }, [location.pathname, onClose])

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home size={20} />,
      path: "/",
      roles: ["administrador", "lider pintura", "lider despacho"],
    },
    {
      title: "Bodega de Pintura",
      icon: <Package size={20} />,
      path: "/bodega-pintura",
      roles: ["administrador", "lider pintura"],
    },
    {
      title: "Programación de Pintura",
      icon: <Calendar size={20} />,
      path: "/programacion-pintura",
      roles: ["administrador", "lider pintura"],
    },
    {
      title: "Bodega de Alistamiento",
      icon: <Package size={20} />,
      path: "/bodega-alistamiento",
      roles: ["administrador", "lider despacho"],
    },
    {
      title: "Programación de Despacho",
      icon: <Truck size={20} />,
      path: "/programacion-despacho",
      roles: ["administrador", "lider despacho"],
    },
    {
      title: "Reportes e Indicadores",
      icon: <BarChart2 size={20} />,
      path: "/reportes",
      roles: ["administrador"],
    },
    {
      title: "Gestión de Usuarios",
      icon: <Users size={20} />,
      path: "/gestion-usuarios",
      roles: ["administrador"],
    },
  ]

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás seguro de que deseas cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      await Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente.",
        timer: 1500,
        showConfirmButton: false,
      })

      onLogout()
    }
  }

  const handleLinkClick = () => {
    // Only close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024) {
      onClose()
    }
  }


  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
        hidden lg:flex flex-col bg-gray-800 text-white transition-all duration-300 
        ${expanded ? "w-64" : "w-20"}
      `}
      >
        <div className="p-4 flex items-center justify-between">
          <img src={logo || "/placeholder.svg"} alt="Logo" className={`h-8 ${expanded ? "block rounded-2xl" : "hidden"}`} />
          {expanded && <h2 className="text-lg font-light mr-2">ONLY HOME</h2>}
          <button onClick={() => setExpanded(!expanded)} className="p-2 rounded-full hover:bg-gray-700">
            <ChevronRight size={18} className={`transform transition-transform ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              if (!item.roles.includes(userRole)) return null

              const isActive = location.pathname === item.path

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center py-3 px-4 transition-colors text-sm
                      ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}
                      ${expanded ? "" : "justify-center"}
                    `}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {expanded && <span className="truncate">{item.title}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4">
          <button
            onClick={handleLogout}
            className={`
              flex items-center py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-sm
              ${expanded ? "w-full" : "mx-auto"}
            `}
          >
            <LogOut size={18} />
            {expanded && <span className="ml-2">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(-100%)",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <img src={logo || "/placeholder.svg"} alt="Logo" className="h-8 mr-3" />
            <h2 className="text-lg font-light">ONLY HOME</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item, index) => {
              if (!item.roles.includes(userRole)) return null

              const isActive = location.pathname === item.path

              return (
                <li key={index}>
                  <Link
                    to={item.path}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center py-4 px-6 transition-colors
                      ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}
                    `}
                  >
                    <span className="mr-4">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            <span className="ml-3">Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
