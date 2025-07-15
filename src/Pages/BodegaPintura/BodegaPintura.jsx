import { useState } from "react"
import { Search, Filter } from "lucide-react"
import StatusBadge from "../../Components/StatusBadge/StatusBadge"

const BodegaPintura = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterColor, setFilterColor] = useState("")
  const [filterReference, setFilterReference] = useState("")

  // Datos de ejemplo
  const productos = [
    {
      id: 1,
      referencia: "REF-001",
      nombre: "Puerta principal",
      color: "Blanco",
      estado: "pendiente",
      fecha: "2023-07-15",
    },
    {
      id: 2,
      referencia: "REF-002",
      nombre: "Ventana corredera",
      color: "Negro",
      estado: "pendiente",
      fecha: "2023-07-16",
    },
    {
      id: 3,
      referencia: "REF-003",
      nombre: "Marco metálico",
      color: "Gris",
      estado: "en proceso",
      fecha: "2023-07-14",
    },
    {
      id: 4,
      referencia: "REF-004",
      nombre: "Puerta interior",
      color: "Blanco",
      estado: "pendiente",
      fecha: "2023-07-17",
    },
    {
      id: 5,
      referencia: "REF-005",
      nombre: "Reja decorativa",
      color: "Negro",
      estado: "en proceso",
      fecha: "2023-07-13",
    },
    { id: 6, referencia: "REF-006", nombre: "Barandilla", color: "Gris", estado: "pendiente", fecha: "2023-07-18" },
  ]

  // Colores disponibles
  const colores = ["Blanco", "Negro", "Gris", "Azul", "Rojo"]

  // Referencias disponibles
  const referencias = [...new Set(productos.map((p) => p.referencia))]

  // Filtrar productos
  const productosFiltrados = productos.filter((producto) => {
    return (
      (searchTerm === "" ||
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.referencia.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterColor === "" || producto.color === filterColor) &&
      (filterReference === "" || producto.referencia === filterReference)
    )
  })

  return (
    <div className="w-full">
      
     
      <h2 className="text-2xl font-bold my-6 ml-5">Bodega de Pintura</h2>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
        
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Buscar por nombre o referencia"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={filterColor}
                onChange={(e) => setFilterColor(e.target.value)}
                className="pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos los colores</option>
                {colores.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
              <select
                value={filterReference}
                onChange={(e) => setFilterReference(e.target.value)}
                className="pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las referencias</option>
                {referencias.map((ref, index) => (
                  <option key={index} value={ref}>
                    {ref}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Referencia</th>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Color</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Fecha</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {productosFiltrados.map((producto) => (
                <tr key={producto.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">{producto.referencia}</td>
                  <td className="py-3 px-6 text-left">{producto.nombre}</td>
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: producto.color.toLowerCase() }}
                      ></div>
                      {producto.color}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <StatusBadge status={producto.estado} />
                  </td>
                  <td className="py-3 px-6 text-center">{producto.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productosFiltrados.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No se encontraron productos que coincidan con los filtros.
          </div>
        )}
      </div>
    </div>
  )
}

export default BodegaPintura
