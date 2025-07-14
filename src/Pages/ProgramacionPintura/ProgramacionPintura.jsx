import { useState } from "react"
import { Plus, Calendar, User, Palette } from "lucide-react"
import WeeklyCalendar from "../../Components/WeeklyCalendar/WeeklyCalendar"
import StatusBadge from "../../Components/StatusBadge/StatusBadge"

const ProgramacionPintura = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Datos de ejemplo para el calendario
  const eventosCalendario = [
    {
      id: 1,
      title: "REF-001 Puerta principal",
      date: "2023-07-15",
      time: "09:00 - 12:00",
      operario: "Juan Pérez",
      color: "Blanco",
      status: "pendiente",
    },
    {
      id: 2,
      title: "REF-002 Ventana corredera",
      date: "2023-07-16",
      time: "14:00 - 17:00",
      operario: "María López",
      color: "Negro",
      status: "en proceso",
    },
    {
      id: 3,
      title: "REF-003 Marco metálico",
      date: "2023-07-14",
      time: "10:00 - 13:00",
      operario: "Carlos Gómez",
      color: "Gris",
      status: "listo",
    },
    {
      id: 4,
      title: "REF-004 Puerta interior",
      date: "2023-07-17",
      time: "08:00 - 11:00",
      operario: "Juan Pérez",
      color: "Blanco",
      status: "pendiente",
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
      <div className="flex justify-between items-center mb-6 ml-5">
        <h2 className="text-2xl font-bold mt-5">Programación de Pintura</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center mt-5 mr-5"
        >
          <Plus size={20} className="mr-2" />
          Nueva Programación
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
        {" "}
        {/* Added w-full here */}
        <WeeklyCalendar events={eventosCalendario} onEventClick={handleEventClick} />
      </div>
      {/* Modal para nueva programación o editar existente */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{selectedEvent ? "Editar Programación" : "Nueva Programación"}</h3>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Producto</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedEvent?.title?.split(" ")[0] || ""}
                >
                  <option value="">Seleccionar producto</option>
                  <option value="REF-001">REF-001 Puerta principal</option>
                  <option value="REF-002">REF-002 Ventana corredera</option>
                  <option value="REF-003">REF-003 Marco metálico</option>
                  <option value="REF-004">REF-004 Puerta interior</option>
                  <option value="REF-005">REF-005 Reja decorativa</option>
                  <option value="REF-006">REF-006 Barandilla</option>
                </select>
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
                    <User size={18} className="mr-2" />
                    Operario
                  </div>
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedEvent?.operario || ""}
                >
                  <option value="">Seleccionar operario</option>
                  <option value="Juan Pérez">Juan Pérez</option>
                  <option value="María López">María López</option>
                  <option value="Carlos Gómez">Carlos Gómez</option>
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
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedEvent?.color || ""}
                >
                  <option value="">Seleccionar color</option>
                  <option value="Blanco">Blanco</option>
                  <option value="Negro">Negro</option>
                  <option value="Gris">Gris</option>
                  <option value="Azul">Azul</option>
                  <option value="Rojo">Rojo</option>
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

export default ProgramacionPintura
