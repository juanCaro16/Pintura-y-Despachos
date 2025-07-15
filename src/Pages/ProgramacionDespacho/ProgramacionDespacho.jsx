import { useState } from "react"
import { Plus, Calendar, Truck, MapPin } from "lucide-react"
import StatusBadge from "../../Components/StatusBadge/StatusBadge"
import WeeklyCalendar from "../../Components/WeeklyCalendar/WeeklyCalendar"

const ProgramacionDespacho = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Datos de ejemplo para el calendario
  const eventosCalendario = [
    {
      id: 1,
      title: "Despacho #001 - Cliente A",
      date: "2023-07-15",
      time: "09:00 - 12:00",
      ruta: "Norte",
      cliente: "Cliente A",
      pedido: "PED-001",
      status: "pendiente",
    },
    {
      id: 2,
      title: "Despacho #002 - Cliente B",
      date: "2023-07-16",
      time: "14:00 - 17:00",
      ruta: "Sur",
      cliente: "Cliente B",
      pedido: "PED-002",
      status: "en proceso",
    },
    {
      id: 3,
      title: "Despacho #003 - Cliente C",
      date: "2023-07-14",
      time: "10:00 - 13:00",
      ruta: "Este",
      cliente: "Cliente C",
      pedido: "PED-003",
      status: "listo",
    },
  ]

  // Función para manejar el clic en un evento
  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false)
    setSelectedEvent(null)
  }

  return (
    <div className="w-full">
      {" "}
      {/* Added w-full here */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold my-6 ml-5">Programación de Despacho</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mr-5"
        >
          <Plus size={20} className="mr-2" />
          Nuevo Despacho
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
        {" "}
        {/* Added w-full here */}
        <WeeklyCalendar events={eventosCalendario} onEventClick={handleEventClick} />
      </div>
      {/* Modal para nuevo despacho o editar existente */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{selectedEvent ? "Editar Despacho" : "Nuevo Despacho"}</h3>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Número de Despacho</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Despacho #001"
                  defaultValue={selectedEvent?.title?.split(" - ")[0] || ""}
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
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedEvent?.date || ""}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Hora inicio</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedEvent?.time?.split(" - ")[0] || ""}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Hora fin</label>
                  <input
                    type="time"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={selectedEvent?.time?.split(" - ")[1] || ""}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-2" />
                    Ruta
                  </div>
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedEvent?.ruta || ""}
                >
                  <option value="">Seleccionar ruta</option>
                  <option value="Norte">Norte</option>
                  <option value="Sur">Sur</option>
                  <option value="Este">Este</option>
                  <option value="Oeste">Oeste</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Cliente</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedEvent?.cliente || ""}
                >
                  <option value="">Seleccionar cliente</option>
                  <option value="Cliente A">Cliente A</option>
                  <option value="Cliente B">Cliente B</option>
                  <option value="Cliente C">Cliente C</option>
                  <option value="Cliente D">Cliente D</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <div className="flex items-center">
                    <Truck size={18} className="mr-2" />
                    Pedido
                  </div>
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedEvent?.pedido || ""}
                >
                  <option value="">Seleccionar pedido</option>
                  <option value="PED-001">PED-001</option>
                  <option value="PED-002">PED-002</option>
                  <option value="PED-003">PED-003</option>
                  <option value="PED-004">PED-004</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="pendiente"
                      defaultChecked={selectedEvent?.status === "pendiente"}
                      className="mr-2"
                    />
                    <StatusBadge status="pendiente" />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="en proceso"
                      defaultChecked={selectedEvent?.status === "en proceso"}
                      className="mr-2"
                    />
                    <StatusBadge status="en proceso" />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="listo"
                      defaultChecked={selectedEvent?.status === "listo"}
                      className="mr-2"
                    />
                    <StatusBadge status="listo" />
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {selectedEvent ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgramacionDespacho

     
