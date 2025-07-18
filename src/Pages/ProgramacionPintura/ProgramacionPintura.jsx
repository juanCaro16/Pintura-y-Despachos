"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Plus, Calendar, User, Palette, Hash, Search, Edit, Trash2 } from "lucide-react"
import WeeklyCalendar from "../../Components/WeeklyCalendar/WeeklyCalendar"
import StatusBadge from "../../Components/StatusBadge/StatusBadge"
import axios from "axios"
import Swal from "sweetalert2"

// Función de debounce
const debounce = (func, delay) => {
  let timeout
  return function executed(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}

const ProgramacionPintura = () => {
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("create") // "create", "detail", "edit"
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: "", // Nombre del producto seleccionado
    id_programacion: null, // Para actualizar/eliminar
    id_producto: null,
    id_operario: null,
    date: "",
    timeStart: "",
    timeEnd: "",
    operario: "", // Nombre del operario seleccionado
    color: "",
    cantidad: 1,
    fecha_registro_avance: "",
    avance_porcentaje: 0,
  })

  const [allProducts, setAllProducts] = useState([]) // Almacena todos los productos
  const [productSearchTerm, setProductSearchTerm] = useState("")
  const [filteredProductOptions, setFilteredProductOptions] = useState([])
  const [showProductDropdown, setShowProductDropdown] = useState(false)
  const productInputRef = useRef(null)

  const [colorOptions, setColorOptions] = useState([]) // Almacena los colores únicos
  const [loadingProducts, setLoadingProducts] = useState(true) // Indica si se están cargando todos los productos
  const [loadingEvents, setLoadingEvents] = useState(true) // Indica si se están cargando los eventos del calendario
  const [loadingDetail, setLoadingDetail] = useState(false) // Indica si se está cargando el detalle de un evento

  // Operarios hardcodeados (ya que no están en la BD)
  const operarioOptions = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "María López" },
    { id: 3, nombre: "Carlos Gómez" },
  ]

  const [eventosCalendario, setEventosCalendario] = useState([])

  // Fetch all products and extract unique colors on component mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoadingProducts(true)
      try {
        const token = localStorage.getItem("token")
        const response = await axios.get("http://localhost:10101/producto/listar", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const productsData = response.data.data || []
        setAllProducts(productsData)

        const uniqueColors = [...new Set(productsData.map((p) => p.color))].filter(Boolean)
        setColorOptions(uniqueColors)
      } catch (error) {
        console.error("Error fetching all products:", error)
        Swal.fire("Error", "No se pudieron cargar los productos.", "error")
      } finally {
        setLoadingProducts(false)
      }
    }
    fetchAllProducts()
  }, [])

  // Fetch calendar events (memoized with useCallback)
  const fetchCalendarEvents = useCallback(async () => {
    setLoadingEvents(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:10101/programacion/listar", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const eventsData = response.data.data || []

      const mappedEvents = eventsData.map((event) => ({
        id: event.id_programacion_pintura, // Corrected: Use id_programacion_pintura for calendar event ID
        title: event.nombre_producto,
        id_producto: event.id_producto,
        date: event.fecha_programada.split("T")[0],
        time: `${event.hora_inicio.substring(0, 5)} - ${event.hora_fin.substring(0, 5)}`,
        operario: event.nombre_operario,
        id_operario: event.id_operario,
        color: event.color,
        status: event.estado_programacion,
        cantidad: event.cantidad_programada,
        fecha_registro_avance: event.fecha_registro_avance ? event.fecha_registro_avance.split("T")[0] : "",
        avance_porcentaje: event.avance_porcentaje,
      }))
      setEventosCalendario(mappedEvents)
    } catch (error) {
      console.error("Error fetching calendar events:", error)
      Swal.fire("Error", "No se pudieron cargar las programaciones.", "error")
    } finally {
      setLoadingEvents(false)
    }
  }, [])

  // Load calendar events on component mount
  useEffect(() => {
    fetchCalendarEvents()
  }, [fetchCalendarEvents])

  // Effect for client-side product search filtering
  const filterProducts = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.length > 0) {
        const filtered = allProducts.filter((product) =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredProductOptions(filtered)
      } else {
        setFilteredProductOptions([])
      }
    }, 300),
    [allProducts],
  )

  useEffect(() => {
    filterProducts(productSearchTerm)
  }, [productSearchTerm, filterProducts])

  // Close product dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (productInputRef.current && !productInputRef.current.contains(event.target)) {
        setShowProductDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleEventClick = async (event) => {
    console.log("Event clicked:", event)

    if (!event || event.id === undefined || event.id === null) {
      console.error("handleEventClick received an invalid event or event ID:", event)
      Swal.fire("Error", "No se pudo cargar el detalle de la programación. ID de evento no encontrado.", "error")
      closeModal()
      setLoadingDetail(false)
      return
    }

    setLoadingDetail(true)
    setShowModal(true)
    setModalMode("detail")
    setSelectedEvent(event)

    try {
      const token = localStorage.getItem("token")
      // Use event.id (which is id_programacion_pintura) for the detail API call
      const response = await axios.get(`http://localhost:10101/programacion/detalle/${event.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const detailData = response.data.data

      if (!detailData) {
        console.error("Detail data is undefined or null from API:", response.data)
        Swal.fire("Error", "No se pudo cargar el detalle de la programación. Datos incompletos del servidor.", "error")
        closeModal()
        return
      }

      // Ensure id_programacion is consistently set from id_programacion_pintura from detailData
      setSelectedEvent({
        ...event,
        ...detailData,
        id_programacion: detailData.id_programacion_pintura, // Corrected: Use id_programacion_pintura from detailData
        id_producto: detailData.id_producto,
        id_operario: detailData.id_operario,
        date: detailData.fecha_programada.split("T")[0],
        timeStart: detailData.hora_inicio.substring(0, 5),
        timeEnd: detailData.hora_fin.substring(0, 5),
        operario: operarioOptions.find((o) => o.id === detailData.id_operario)?.nombre || "Desconocido",
        color: detailData.color,
        cantidad: detailData.cantidad_programada,
        fecha_registro_avance: detailData.fecha_registro_avance ? detailData.fecha_registro_avance.split("T")[0] : "",
        avance_porcentaje: detailData.avance_porcentaje,
        status: detailData.estado_programacion,
      })

      // Populate formData for potential editing, using id_programacion_pintura
      setFormData({
        title: detailData.nombre_producto,
        id_programacion: detailData.id_programacion_pintura, // Corrected: Use id_programacion_pintura from detailData
        id_producto: detailData.id_producto,
        id_operario: detailData.id_operario,
        date: detailData.fecha_programada.split("T")[0],
        timeStart: detailData.hora_inicio.substring(0, 5),
        timeEnd: detailData.hora_fin.substring(0, 5),
        operario: operarioOptions.find((o) => o.id === detailData.id_operario)?.nombre || "",
        color: detailData.color,
        cantidad: detailData.cantidad_programada,
        fecha_registro_avance: detailData.fecha_registro_avance ? detailData.fecha_registro_avance.split("T")[0] : "",
        avance_porcentaje: detailData.avance_porcentaje,
      })
      setProductSearchTerm(detailData.nombre_producto)
    } catch (error) {
      console.error("Error fetching event detail:", error)
      Swal.fire("Error", "No se pudo cargar el detalle de la programación.", "error")
      closeModal()
    } finally {
      setLoadingDetail(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedEvent(null)
    setFormData({
      title: "",
      id_programacion: null,
      id_producto: null,
      id_operario: null,
      date: "",
      timeStart: "",
      timeEnd: "",
      operario: "",
      color: "",
      cantidad: 1,
      fecha_registro_avance: "",
      avance_porcentaje: 0,
    })
    setProductSearchTerm("")
    setFilteredProductOptions([])
    setModalMode("create") // Reset mode
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === "operario") {
      const selectedOperario = operarioOptions.find((o) => o.nombre === value)
      setFormData((prev) => ({ ...prev, [name]: value, id_operario: selectedOperario ? selectedOperario.id : null }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleProductSearchChange = (e) => {
    setProductSearchTerm(e.target.value)
    setFormData((prev) => ({ ...prev, title: e.target.value, id_producto: null })) // Clear ID until a product is selected
    setShowProductDropdown(true)
  }

  const handleProductSelect = (product) => {
    setFormData((prev) => ({ ...prev, title: product.nombre, id_producto: product.id_producto }))
    setProductSearchTerm(product.nombre)
    setShowProductDropdown(false)
  }

  const handleAvanceChange = (e) => {
    const newAvance = Number.parseInt(e.target.value)
    setFormData((prev) => ({
      ...prev,
      avance_porcentaje: newAvance,
      // status: newAvance === 100 ? "listo" : newAvance > 0 ? "en proceso" : "pendiente", // Status derived from avance
    }))
  }

  const handleStatusChange = (status) => {
    let newAvance = formData.avance_porcentaje
    if (status === "pendiente") newAvance = 0
    else if (status === "en proceso") newAvance = newAvance === 0 || newAvance === 100 ? 50 : newAvance
    else if (status === "listo") newAvance = 100

    setFormData((prev) => ({
      ...prev,
      avance_porcentaje: newAvance,
      // status: status, // Status derived from avance
    }))
  }

  const handleGuardarProgramacion = async () => {
    const token = localStorage.getItem("token")

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "No se encontró el token de sesión. Por favor, inicie sesión nuevamente.",
      })
      return
    }

    const estadoProgramacion =
      formData.avance_porcentaje === 100 ? "listo" : formData.avance_porcentaje > 0 ? "en proceso" : "pendiente"

    const dataToSend = {
      id_producto: formData.id_producto,
      id_operario: formData.id_operario,
      fecha_programada: formData.date,
      hora_inicio: formData.timeStart + ":00",
      hora_fin: formData.timeEnd + ":00",
      fecha_registro_avance: formData.fecha_registro_avance ? `${formData.fecha_registro_avance}T00:00:00` : null,
      avance_porcentaje: formData.avance_porcentaje,
      estado_programacion: estadoProgramacion,
      cantidad_programada: formData.cantidad,
      color: formData.color,
    }

    if (
      !dataToSend.id_producto ||
      !dataToSend.id_operario ||
      !dataToSend.fecha_programada ||
      !dataToSend.hora_inicio ||
      !dataToSend.hora_fin ||
      !dataToSend.cantidad_programada ||
      !dataToSend.color
    ) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos obligatorios (Producto, Operario, Fecha, Horas, Cantidad, Color).",
      })
      return
    }

    try {
      // Use formData.id_programacion for the update request
      if (modalMode === "edit" && formData.id_programacion) {
        const res = await axios.put(
          `http://localhost:10101/programacion/actualizar/${formData.id_programacion}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Programación actualizada correctamente.",
            timer: 1500,
            showConfirmButton: false,
          })
          closeModal()
          fetchCalendarEvents()
        }
      } else {
        const res = await axios.post("http://localhost:10101/programacion/crear", dataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "¡Éxito!",
            text: "Programación creada correctamente.",
            timer: 1500,
            showConfirmButton: false,
          })
          closeModal()
          fetchCalendarEvents()
        }
      }
    } catch (error) {
      console.error("Error al guardar la programación:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Hubo un error al guardar la programación.",
      })
    }
  }

  const handleEliminarProgramacion = async () => {
    const token = localStorage.getItem("token")
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Error de autenticación",
        text: "No se encontró el token de sesión. Por favor, inicie sesión nuevamente.",
      })
      return
    }

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    })

    if (result.isConfirmed) {
      try {
        // Use formData.id_programacion for the delete request
        await axios.delete(`http://localhost:10101/programacion/eliminar/${formData.id_programacion}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        Swal.fire("¡Eliminado!", "La programación ha sido eliminada.", "success")
        closeModal()
        fetchCalendarEvents()
      } catch (error) {
        console.error("Error al eliminar la programación:", error)
        Swal.fire("Error", error.response?.data?.message || "Hubo un error al eliminar la programación.", "error")
      }
    }
  }

  const getProgressColor = (porcentaje) => {
    if (porcentaje === 0) return "bg-gray-300"
    if (porcentaje < 50) return "bg-red-500"
    if (porcentaje < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  if (loadingProducts || loadingEvents) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
        <div className="text-xl text-gray-600">Cargando datos...</div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 ml-5">
        <h2 className="text-2xl font-bold mt-5">Programación de Pintura</h2>
        <button
          onClick={() => {
            setSelectedEvent(null)
            setFormData({
              title: "",
              id_programacion: null,
              id_producto: null,
              id_operario: null,
              date: new Date().toISOString().split("T")[0],
              timeStart: "08:00",
              timeEnd: "17:00",
              operario: "",
              color: "",
              cantidad: 1,
              fecha_registro_avance: new Date().toISOString().split("T")[0],
              avance_porcentaje: 0,
            })
            setProductSearchTerm("")
            setFilteredProductOptions([])
            setModalMode("create")
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mt-5 mr-5"
        >
          <Plus size={20} className="mr-2" />
          Nueva Programación
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
        <WeeklyCalendar events={eventosCalendario} onEventClick={handleEventClick} />
      </div>
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">
              {modalMode === "create"
                ? "Nueva Programación"
                : modalMode === "edit"
                  ? "Editar Programación"
                  : "Detalle de Programación"}
            </h3>

            {loadingDetail ? (
              <div className="flex justify-center items-center h-40">
                <div className="text-lg text-gray-600">Cargando detalles...</div>
              </div>
            ) : modalMode === "detail" && selectedEvent ? (
              <div className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-bold text-lg mb-1">{selectedEvent.title}</h4>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Referencia:</span> {selectedEvent.referencia || "N/A"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Color:</span> {selectedEvent.color}
                  </p>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Cantidad:</span> {selectedEvent.cantidad}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Fecha Programada:</span> {selectedEvent.date}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Hora:</span> {selectedEvent.time}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Operario:</span> {selectedEvent.operario}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Fecha Avance:</span> {selectedEvent.fecha_registro_avance || "N/A"}
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Avance:</span> {selectedEvent.avance_porcentaje}%
                    </p>
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Estado:</span> <StatusBadge status={selectedEvent.status} />
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalMode("edit")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <Edit size={16} className="mr-2" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={handleEliminarProgramacion}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Columna 1 */}
                  <div>
                    <div className="mb-4 relative" ref={productInputRef}>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Producto</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="title"
                          value={productSearchTerm}
                          onChange={handleProductSearchChange}
                          onFocus={() => setShowProductDropdown(true)}
                          className="pl-10 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Buscar producto..."
                          required
                          disabled={modalMode === "edit"} // Disable product selection on edit
                        />
                      </div>
                      {showProductDropdown && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                          {loadingProducts ? (
                            <li className="p-3 text-gray-500">Cargando productos...</li>
                          ) : filteredProductOptions.length > 0 ? (
                            filteredProductOptions.map((product) => (
                              <li
                                key={product.id_producto}
                                className="p-3 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleProductSelect(product)}
                              >
                                {product.nombre}
                              </li>
                            ))
                          ) : (
                            productSearchTerm.length > 0 && (
                              <li className="p-3 text-gray-500">No se encontraron productos.</li>
                            )
                          )}
                        </ul>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <div className="flex items-center">
                          <Hash size={18} className="mr-2" />
                          Cantidad
                        </div>
                      </label>
                      <input
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ingrese la cantidad"
                        min="1"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <div className="flex items-center">
                          <Calendar size={18} className="mr-2" />
                          Fecha
                        </div>
                      </label>
                      <input
                        type="date"
                        name="date"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Hora inicio</label>
                        <input
                          type="time"
                          name="timeStart"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.timeStart}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Hora fin</label>
                        <input
                          type="time"
                          name="timeEnd"
                          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={formData.timeEnd}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Columna 2 */}
                  <div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <div className="flex items-center">
                          <User size={18} className="mr-2" />
                          Operario
                        </div>
                      </label>
                      <select
                        name="operario"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.operario}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Seleccionar operario</option>
                        {operarioOptions.map((option) => (
                          <option key={option.id} value={option.nombre}>
                            {option.nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <div className="flex items-center">
                          <Palette size={18} className="mr-2" />
                          Color
                        </div>
                      </label>
                      <select
                        name="color"
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.color}
                        onChange={handleInputChange}
                      >
                        <option value="">Seleccionar color</option>
                        {colorOptions.map((color, index) => (
                          <option key={index} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        <div className="flex items-center">
                          <Calendar size={18} className="mr-2" />
                          Fecha de Registro de Avance
                        </div>
                      </label>
                      <input
                        type="date"
                        name="fecha_registro_avance"
                        value={formData.fecha_registro_avance}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Porcentaje de Avance: {formData.avance_porcentaje}%
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={formData.avance_porcentaje}
                      onChange={handleAvanceChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className={`h-4 rounded-full transition-all duration-300 ${getProgressColor(formData.avance_porcentaje)}`}
                        style={{ width: `${formData.avance_porcentaje}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <span
                        className={`text-sm font-medium ${
                          formData.avance_porcentaje === 0
                            ? "text-gray-500"
                            : formData.avance_porcentaje < 50
                              ? "text-red-600"
                              : formData.avance_porcentaje < 100
                                ? "text-yellow-600"
                                : "text-green-600"
                        }`}
                      >
                        {formData.avance_porcentaje === 0
                          ? "Sin iniciar"
                          : formData.avance_porcentaje < 50
                            ? "Iniciado"
                            : formData.avance_porcentaje < 100
                              ? "En progreso"
                              : "Completado"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="pendiente"
                        checked={formData.avance_porcentaje === 0}
                        onChange={() => handleStatusChange("pendiente")}
                        className="mr-2"
                      />
                      <StatusBadge status="pendiente" />
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="en proceso"
                        checked={formData.avance_porcentaje > 0 && formData.avance_porcentaje < 100}
                        onChange={() => handleStatusChange("en proceso")}
                        className="mr-2"
                      />
                      <StatusBadge status="en proceso" />
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="listo"
                        checked={formData.avance_porcentaje === 100}
                        onChange={() => handleStatusChange("listo")}
                        className="mr-2"
                      />
                      <StatusBadge status="listo" />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={modalMode === "edit" ? () => setModalMode("detail") : closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                  >
                    {modalMode === "edit" ? "Cancelar Edición" : "Cancelar"}
                  </button>
                  <button
                    type="submit"
                    onClick={handleGuardarProgramacion}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {modalMode === "edit" ? "Actualizar" : "Guardar"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramacionPintura
