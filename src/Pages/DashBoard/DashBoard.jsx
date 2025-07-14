import { Package, Calendar, Truck, BarChart2, Users } from "lucide-react"
import BigButton from "../../Components/BigButton/BigButton"

const Dashboard = ({ userRole }) => {
  // Definir los módulos disponibles según el rol del usuario
  const getAvailableModules = () => {
    switch (userRole) {
      case "administrador":
        return [
          {
            title: "Bodega de Pintura",
            icon: <Package size={32} />,
            description: "Visualizar productos pendientes por pintar",
            path: "/bodega-pintura",
            color: "blue",
          },
          {
            title: "Programación de Pintura",
            icon: <Calendar size={32} />,
            description: "Asignar productos a pintar",
            path: "/programacion-pintura",
            color: "green",
          },
          {
            title: "Bodega de Alistamiento",
            icon: <Package size={32} />,
            description: "Visualizar productos listos para despachar",
            path: "/bodega-alistamiento",
            color: "yellow",
          },
          {
            title: "Programación de Despacho",
            icon: <Truck size={32} />,
            description: "Asignar productos a despachos",
            path: "/programacion-despacho",
            color: "red",
          },
          {
            title: "Reportes e Indicadores",
            icon: <BarChart2 size={32} />,
            description: "Generar gráficas e informes",
            path: "/reportes",
            color: "blue",
          },
          {
            title: "Gestión de Usuarios",
            icon: <Users size={32} />,
            description: "Administrar usuarios y roles",
            path: "/gestion-usuarios",
            color: "gray",
          },
        ]
      case "lider pintura":
        return [
          {
            title: "Bodega de Pintura",
            icon: <Package size={32} />,
            description: "Visualizar productos pendientes por pintar",
            path: "/bodega-pintura",
            color: "blue",
          },
          {
            title: "Programación de Pintura",
            icon: <Calendar size={32} />,
            description: "Asignar productos a pintar",
            path: "/programacion-pintura",
            color: "green",
          },
        ]
      case "lider despacho":
        return [
          {
            title: "Bodega de Alistamiento",
            icon: <Package size={32} />,
            description: "Visualizar productos listos para despachar",
            path: "/bodega-alistamiento",
            color: "yellow",
          },
          {
            title: "Programación de Despacho",
            icon: <Truck size={32} />,
            description: "Asignar productos a despachos",
            path: "/programacion-despacho",
            color: "red",
          },
        ]
      default:
        return []
    }
  }

  const modules = getAvailableModules()

  return (
    <div className="w-full">
      {" "}
      {/* Added w-full here */}
      <h2 className="text-2xl font-bold my-6 ml-5">Bienvenido al Sistema de Gestión de Pintura y Despachos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
        {modules.map((module, index) => (
          <BigButton
            key={index}
            icon={module.icon}
            title={module.title}
            description={module.description}
            color={module.color}
            onClick={() => (window.location.href = module.path)}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
