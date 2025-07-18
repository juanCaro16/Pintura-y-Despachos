"use client"

import { useState, useEffect } from "react"
import { Search, Filter } from "lucide-react"
import StatusBadge from "../../Components/StatusBadge/StatusBadge"
import axios from "axios"
import Swal from "sweetalert2"

const BodegaPintura = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterColor, setFilterColor] = useState("")
  const [filterReference, setFilterReference] = useState("")
  // Por defecto, solo mostrar productos con estado "listo"
  const [filterStatus, setFilterStatus] = useState(["listo"])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Obtener productos de la API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No authentication token found.")
        }
        // Llamar al endpoint de BodegaPintura
        const response = await axios.get("http://localhost:10101/bodega-pintura/listar", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const productsData = response.data || [] // Asume que la respuesta es directamente el array de datos

        // Mapear los datos de la tabla BODEGA_PINTURA a la estructura esperada por el frontend
        // ASUNCIÓN: La tabla BODEGA_PINTURA tiene columnas como id_bodega_pintura, referencia, nombre, color, estado_producto, fecha_creacion
        const mappedProducts = productsData.map((p) => ({
          id: p.id_bodega_pintura,
          referencia: p.referencia,
          nombre: p.nombre_producto, // Cambiado de p.nombre a p.nombre_producto
          color: p.color,
          estado: p.estado_programacion, // Cambiado de p.estado_producto a p.estado_programacion
          fecha: p.fecha_programacion ? p.fecha_programacion.split("T")[0] : "", // Cambiado de p.fecha_creacion a p.fecha_programacion
        }))
        setProducts(mappedProducts)
        console.log("Fetched products from BodegaPintura (raw):", mappedProducts)
      } catch (err) {
        console.error("Error fetching products for Bodega de Pintura:", err)
        setError("No se pudieron cargar los productos. Intente de nuevo más tarde.")
        Swal.fire("Error", "No se pudieron cargar los productos de la bodega de pintura.", "error")
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Obtener referencias, colores y estados únicos de los productos obtenidos
  const referencias = [...new Set(products.map((p) => p.referencia))].filter(Boolean)
  const colors = [...new Set(products.map((p) => p.color))].filter(Boolean)
  const statuses = [...new Set(products.map((p) => p.estado))].filter(Boolean)

  // Filtrar productos según los términos de búsqueda, referencia, color y estado
  const productosFiltrados = products.filter((producto) => {
    // CORRECCIÓN: Asegurarse de que las propiedades no sean undefined/null antes de llamar toLowerCase()
    const productName = (producto.nombre || "").toLowerCase()
    const productReference = (producto.referencia || "").toLowerCase()
    const productColor = (producto.color || "").toLowerCase()
    const productStatus = (producto.estado || "").toLowerCase()

    const matchesSearch =
      searchTerm === "" ||
      productName.includes(searchTerm.toLowerCase()) ||
      productReference.includes(searchTerm.toLowerCase())

    const matchesReference = filterReference === "" || productReference === filterReference.toLowerCase()

    const matchesColor = filterColor === "" || productColor === filterColor.toLowerCase()

    const matchesStatus = filterStatus.length === 0 || filterStatus.includes(productStatus)

    return matchesSearch && matchesReference && matchesColor && matchesStatus
  })

  console.log("Filtered products:", productosFiltrados)

  // Manejador para el cambio del filtro de estado
  const handleStatusFilterChange = (e) => {
    const selectedValue = e.target.value
    if (selectedValue === "") {
      setFilterStatus([]) // Mostrar todos los estados
    } else {
      setFilterStatus([selectedValue]) // Mostrar solo el estado seleccionado
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-xl text-gray-600">Cargando productos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold ml-5 my-6">Bodega de Pintura</h2>
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

          {/* Filtro de Estado */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              // Establecer el valor seleccionado por defecto a "listo"
              value={filterStatus.length === 1 && filterStatus[0] === "listo" ? "listo" : ""}
              onChange={handleStatusFilterChange}
              className="pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="listo">Listos para Despacho</option>
              <option value="">Todos los estados</option>
              {statuses.map((status, index) => (
                <option key={index} value={status.toLowerCase()}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Color */}
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
              {colors.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro de Referencia */}
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
                <th className="py-3 px-6 text-center">Fecha Creación</th>
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
                        style={{ backgroundColor: (producto.color || "gray").toLowerCase() }}
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
          <div className="text-center py-4 text-gray-500">No se encontraron productos con los filtros aplicados.</div>
        )}
      </div>
    </div>
  )
}

export default BodegaPintura
