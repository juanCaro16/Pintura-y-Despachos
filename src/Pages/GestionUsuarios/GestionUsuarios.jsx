import { useState } from "react"
import { Plus, Edit, Trash2, User, Shield } from "lucide-react"
import StatusBadge from "../../Components/StatusBadge/StatusBadge"

const GestionUsuarios = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [users, setUsers] = useState([
    {
      id: 1,
      nombre: "Juan Pérez",
      email: "juan@empresa.com",
      rol: "lider pintura",
      estado: "activo",
      fechaCreacion: "2023-01-15",
    },
    {
      id: 2,
      nombre: "María López",
      email: "maria@empresa.com",
      rol: "administrador",
      estado: "activo",
      fechaCreacion: "2023-01-10",
    },
    {
      id: 3,
      nombre: "Carlos Gómez",
      email: "carlos@empresa.com",
      rol: "lider despacho",
      estado: "activo",
      fechaCreacion: "2023-02-01",
    },
    {
      id: 4,
      nombre: "Ana Rodríguez",
      email: "ana@empresa.com",
      rol: "lider pintura",
      estado: "inactivo",
      fechaCreacion: "2023-01-20",
    },
  ])

  const roles = [
    {
      value: "administrador",
      label: "Administrador",
      permisos: ["Accede a todos los módulos", "Crea usuarios", "Visualiza indicadores"],
    },
    {
      value: "lider pintura",
      label: "Líder de Pintura",
      permisos: ["Programa pintura", "Registra avances", "Consulta bodega en pintura"],
    },
    {
      value: "lider despacho",
      label: "Líder de Despacho",
      permisos: ["Programa alistamiento y despacho", "Consulta estado de pedidos"],
    },
  ]

  const handleEdit = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const handleDelete = (userId) => {
    if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
      setUsers(users.filter((user) => user.id !== userId))
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedUser(null)
  }

  const getRoleBadge = (rol) => {
    switch (rol) {
      case "administrador":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            Administrador
          </span>
        )
      case "lider pintura":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">Líder de Pintura</span>
        )
      case "lider despacho":
        return (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            Líder de Despacho
          </span>
        )
      default:
        return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">{rol}</span>
    }
  }

  return (
    <div className="w-full">
      {" "}
      {/* Added w-full here */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold my-6 ml-5">Gestión de Usuarios</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-5 rounded flex items-center"
        >
          <Plus size={20} className="mr-2" />
          Nuevo Usuario
        </button>
      </div>
      {/* Tabla de usuarios */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full">
        {" "}
        {/* Added w-full here */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Usuario</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-center">Rol</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Fecha Creación</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                        <User size={16} />
                      </div>
                      {user.nombre}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-center">{getRoleBadge(user.rol)}</td>
                  <td className="py-3 px-6 text-center">
                    <StatusBadge status={user.estado === "activo" ? "listo" : "pendiente"} />
                  </td>
                  <td className="py-3 px-6 text-center">{user.fechaCreacion}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Información de roles y permisos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {" "}
        {/* Added w-full here */}
        {roles.map((rol, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Shield size={24} className="text-blue-500 mr-2" />
              <h3 className="text-lg font-bold">{rol.label}</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600 mb-3">Permisos:</p>
              {rol.permisos.map((permiso, pIndex) => (
                <div key={pIndex} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                  <p className="text-sm">{permiso}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Modal para crear/editar usuario */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{selectedUser ? "Editar Usuario" : "Nuevo Usuario"}</h3>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el nombre completo"
                  defaultValue={selectedUser?.nombre || ""}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingrese el email"
                  defaultValue={selectedUser?.email || ""}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Rol</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={selectedUser?.rol || ""}
                >
                  <option value="">Seleccionar rol</option>
                  {roles.map((rol, index) => (
                    <option key={index} value={rol.value}>
                      {rol.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="estado"
                      value="activo"
                      defaultChecked={selectedUser?.estado === "activo" || !selectedUser}
                      className="mr-2"
                    />
                    <StatusBadge status="listo" />
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="estado"
                      value="inactivo"
                      defaultChecked={selectedUser?.estado === "inactivo"}
                      className="mr-2"
                    />
                    <StatusBadge status="pendiente" />
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
                  {selectedUser ? "Actualizar" : "Crear"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionUsuarios
