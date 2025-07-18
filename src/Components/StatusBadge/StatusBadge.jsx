const StatusBadge = ({ status }) => {
  let bgColor = "bg-gray-200"
  let textColor = "text-gray-800"
  let statusText = "Desconocido"

  // CORRECCIÓN: Asegurarse de que status sea una cadena antes de llamar toLowerCase()
  const normalizedStatus = (status || "").toLowerCase()

  switch (normalizedStatus) {
    case "listo":
      bgColor = "bg-green-100"
      textColor = "text-green-800"
      statusText = "Listo"
      break
    case "en proceso":
      bgColor = "bg-yellow-100"
      textColor = "text-yellow-800"
      statusText = "En Proceso"
      break
    case "pendiente":
      bgColor = "bg-red-100"
      textColor = "text-red-800"
      statusText = "Pendiente"
      break
    default:
      // Si status es null, undefined, o una cadena no reconocida, se usará el estilo por defecto (gris).
      break
  }

  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${bgColor} ${textColor}`}>{statusText}</span>
}

export default StatusBadge
