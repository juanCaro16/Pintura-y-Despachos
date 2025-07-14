import { useState } from "react"
import { Search, Filter, CheckCircle } from "lucide-react"
import StatusBadge from "../../Components/StatusBadge/StatusBadge"

const BodegaAlistamiento = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterReference, setFilterReference] = useState("")

  // Datos de ejemplo
  const productos = [
    { id: 1, referencia: "REF-001", nombre: "Puerta principal", color: "Blanco", estado: "listo", fecha: "2023-07-10" },
    { id: 2, referencia: "REF-002", nombre: "Ventana corredera", color: "Negro", estado: "listo", fecha: "2023-07-11" },
    { id: 3, referencia: "REF-003", nombre: "Marco metálico", color: "Gris", estado: "listo", fecha: "2023-07-12" },
    { id: 4, referencia: "REF-007", nombre: "Puerta garaje", color: "Azul", estado: "listo", fecha: "2023-07-13" },
    { id: 5, referencia: "REF-008", nombre: "Ventana abatible", color: "Blanco", estado: "listo", fecha: "2023-07-14" },
  ]

  // Referencias disponibles
  const referencias = [...new Set(productos.map((p) => p.referencia))]

  // Filtrar productos
  const productosFiltrados = productos.filter((producto) => {
    return (
      (searchTerm === "" ||
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.referencia.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterReference === "" || producto.referencia === filterReference)
    )
  })

  return (
    <div className="w-full">
      {" "}
      {/* Added w-full here */}
      <h2 className="text-2xl font-bold ml-5 my-6">Bodega de Alistamiento</h2>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
        {" "}
        {/* Added w-full here */}
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
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Referencia</th>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Color</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Fecha Pintura</th>
                <th className="py-3 px-6 text-center">Acciones</th>
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
                  <td className="py-3 px-6 text-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded flex items-center mx-auto">
                      <CheckCircle size={16} className="mr-1" />
                      Despachar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {productosFiltrados.length === 0 && (
          <div className="text-center py-4 text-gray-500">No se encontraron productos listos para despachar.</div>
        )}
      </div>
    </div>
  )
}

export default BodegaAlistamiento
