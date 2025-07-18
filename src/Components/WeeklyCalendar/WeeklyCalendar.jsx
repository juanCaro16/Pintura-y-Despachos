"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const WeeklyCalendar = ({ events = [], onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Obtener el primer día de la semana (lunes)
  const getWeekStart = (date) => {
    const d = new Date(date) // Crear una copia para evitar modificar el objeto original
    const dayOfWeek = d.getDay() // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
    // Calcular la diferencia para llegar al Lunes (día 1)
    // Si hoy es Lunes (1), daysToSubtract = 0
    // Si hoy es Martes (2), daysToSubtract = 1
    // Si hoy es Domingo (0), daysToSubtract = 6 (para retroceder al Lunes anterior)
    const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    d.setDate(d.getDate() - daysToSubtract)
    d.setHours(0, 0, 0, 0) // Establecer la hora al inicio del día para evitar problemas de huso horario
    return d
  }

  // Obtener los días de la semana actual
  const getWeekDays = () => {
    const weekStart = getWeekStart(new Date(currentDate))
    const days = []

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart)
      day.setDate(weekStart.getDate() + i)
      days.push(day)
    }

    return days
  }

  // Cambiar a la semana anterior
  const prevWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  // Cambiar a la semana siguiente
  const nextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  // Formatear fecha para mostrar
  const formatDate = (date) => {
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" })
  }

  // Obtener nombre del día
  const getDayName = (date) => {
    return date.toLocaleDateString("es-ES", { weekday: "short" })
  }

  // Verificar si un día es hoy
  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  // Obtener eventos para un día específico
  const getEventsForDay = (date) => {
    // 'date' es un objeto Date local (del calendario)
    return events.filter((event) => {
      // Parsear la cadena 'event.date' (YYYY-MM-DD) como una fecha local
      const parts = event.date.split("-") // ["YYYY", "MM", "DD"]
      const eventYear = Number.parseInt(parts[0], 10)
      const eventMonth = Number.parseInt(parts[1], 10) - 1 // Meses son 0-indexados en JavaScript
      const eventDay = Number.parseInt(parts[2], 10)

      // Crear un objeto Date en la zona horaria local a medianoche
      const eventDateLocalMidnight = new Date(eventYear, eventMonth, eventDay)

      // Comparar los componentes de fecha (año, mes, día) de ambos objetos Date locales
      return (
        eventDateLocalMidnight.getFullYear() === date.getFullYear() &&
        eventDateLocalMidnight.getMonth() === date.getMonth() &&
        eventDateLocalMidnight.getDate() === date.getDate()
      )
    })
  }

  const weekDays = getWeekDays()

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          {formatDate(weekDays[0])} - {formatDate(weekDays[6])}
        </h2>
        <div className="flex space-x-2">
          <button onClick={prevWeek} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextWeek} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day, index) => (
          <div key={index} className={`text-center py-2 font-medium ${isToday(day) ? "bg-blue-50" : ""}`}>
            <div className="text-gray-500">{getDayName(day)}</div>
            <div className={`text-lg ${isToday(day) ? "text-blue-600" : ""}`}>{day.getDate()}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 h-96 overflow-y-auto">
        {weekDays.map((day, dayIndex) => {
          const dayEvents = getEventsForDay(day)

          return (
            <div key={dayIndex} className={`border-r min-h-full ${isToday(day) ? "bg-blue-50" : ""}`}>
              {dayEvents.map((event, eventIndex) => (
                <div
                  key={eventIndex}
                  onClick={() => onEventClick && onEventClick(event)}
                  className={`
                  m-1 p-2 rounded text-sm cursor-pointer
                  ${
                    event.status === "listo"
                      ? "bg-green-100 text-green-800"
                      : event.status === "en proceso"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }
                `}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-xs">{event.time}</div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default WeeklyCalendar
