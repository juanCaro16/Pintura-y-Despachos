import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Home, Package, Calendar, Truck, BarChart2, Users, LogOut, ChevronRight } from "lucide-react"

const Sidebar = ({ userRole, onLogout }) => {
  const location = useLocation()
  const [expanded, setExpanded] = useState(true)

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home size={24} />,
      path: "/",
      roles: ["administrador", "lider pintura", "lider despacho"],
    },
    {
      title: "Bodega de Pintura",
      icon: <Package size={24} />,
      path: "/bodega-pintura",
      roles: ["administrador", "lider pintura"],
    },
    {
      title: "Programación de Pintura",
      icon: <Calendar size={24} />,
      path: "/programacion-pintura",
      roles: ["administrador", "lider pintura"],
    },
    {
      title: "Bodega de Alistamiento",
      icon: <Package size={24} />,
      path: "/bodega-alistamiento",
      roles: ["administrador", "lider despacho"],
    },
    {
      title: "Programación de Despacho",
      icon: <Truck size={24} />,
      path: "/programacion-despacho",
      roles: ["administrador", "lider despacho"],
    },
    {
      title: "Reportes e Indicadores",
      icon: <BarChart2 size={24} />,
      path: "/reportes",
      roles: ["administrador"],
    },
    {
      title: "Gestión de Usuarios",
      icon: <Users size={24} />,
      path: "/gestion-usuarios",
      roles: ["administrador"],
    },
  ]

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${expanded ? "w-64" : "w-20"} flex flex-col`}>
      <div className="p-4 flex items-center justify-between">
        {expanded && <h2 className="text-xl font-bold">Only Home</h2>}
        <button onClick={() => setExpanded(!expanded)} className="p-2 rounded-full hover:bg-gray-700">
          <ChevronRight size={20} className={`transform transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 mt-6">
        <ul>
          {menuItems.map((item, index) => {
            // Verificar si el usuario tiene permiso para ver este elemento
            if (!item.roles.includes(userRole)) return null

            const isActive = location.pathname === item.path

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center py-3 px-4 transition-colors
                    ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}
                    ${expanded ? "" : "justify-center"}
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  {expanded && <span>{item.title}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4">
        <button
          onClick={onLogout}
          className={`
            flex items-center py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 transition-colors
            ${expanded ? "w-full" : "mx-auto"}
          `}
        >
          <LogOut size={20} />
          {expanded && <span className="ml-2">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
