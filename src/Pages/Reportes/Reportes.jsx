"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, Calendar, User, Palette, Package } from "lucide-react"

const Reportes = () => {
  const [selectedReport, setSelectedReport] = useState("operario")

  // Datos de ejemplo para gráficos
  const datosOperario = [
    { nombre: "Juan Pérez", completados: 45, eficiencia: 92 },
    { nombre: "María López", completados: 38, eficiencia: 88 },
    { nombre: "Carlos Gómez", completados: 42, eficiencia: 90 },
    { nombre: "Ana Rodríguez", completados: 35, eficiencia: 85 },
  ]

  const datosLinea = [
    { linea: "Línea A", produccion: 125, meta: 150 },
    { linea: "Línea B", produccion: 140, meta: 160 },
    { linea: "Línea C", produccion: 95, meta: 100 },
    { linea: "Línea D", produccion: 110, meta: 120 },
  ]

  const datosColor = [
    { color: "Blanco", cantidad: 85, porcentaje: 35 },
    { color: "Negro", cantidad: 65, porcentaje: 27 },
    { color: "Gris", cantidad: 45, porcentaje: 18 },
    { color: "Azul", cantidad: 30, porcentaje: 12 },
    { color: "Rojo", cantidad: 20, porcentaje: 8 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  // Custom tooltip para mejor visualización
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const renderReport = () => {
    switch (selectedReport) {
      case "operario":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">Rendimiento por Operario</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={datosOperario}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="nombre" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar dataKey="completados" fill="#8884d8" name="Productos Completados" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="eficiencia" fill="#82ca9d" name="Eficiencia %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )

      case "linea":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">Producción por Línea</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={datosLinea}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="linea" tick={{ fontSize: 12 }} height={60} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Bar dataKey="produccion" fill="#8884d8" name="Producción Actual" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meta" fill="#82ca9d" name="Meta" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )

      case "color":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">Distribución por Color</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={datosColor}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ color, porcentaje }) => `${color} ${porcentaje}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="cantidad"
                    >
                      {datosColor.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold mb-4">Detalles por Color</h4>
                {datosColor.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="font-medium">{item.color}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{item.cantidad}</div>
                      <div className="text-sm text-gray-600">{item.porcentaje}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "cumplimiento":
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6">Reporte de Cumplimiento</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                <div className="text-gray-700">Cumplimiento General</div>
                <div className="text-sm text-green-600 mt-1">+2% vs mes anterior</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                <div className="text-gray-700">Entregas a Tiempo</div>
                <div className="text-sm text-green-600 mt-1">+5% vs mes anterior</div>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">12</div>
                <div className="text-gray-700">Días Promedio</div>
                <div className="text-sm text-red-600 mt-1">+1 día vs mes anterior</div>
              </div>
              <div className="bg-red-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">3%</div>
                <div className="text-gray-700">Productos Defectuosos</div>
                <div className="text-sm text-green-600 mt-1">-1% vs mes anterior</div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Reportes e Indicadores</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <Download size={20} className="mr-2" />
          Exportar Reporte
        </button>
      </div>

      {/* Selector de tipo de reporte */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4">Seleccionar Tipo de Reporte</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setSelectedReport("operario")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === "operario" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <User size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Por Operario</div>
          </button>

          <button
            onClick={() => setSelectedReport("linea")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === "linea" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Package size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Por Línea</div>
          </button>

          <button
            onClick={() => setSelectedReport("color")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === "color" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Palette size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Por Color</div>
          </button>

          <button
            onClick={() => setSelectedReport("cumplimiento")}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === "cumplimiento" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Calendar size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Cumplimiento</div>
          </button>
        </div>
      </div>

      {/* Renderizar el reporte seleccionado */}
      {renderReport()}

      {/* Resumen de indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">245</div>
          <div className="text-gray-600">Total Productos</div>
          <div className="text-sm text-green-600 mt-1">+12% vs mes anterior</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
          <div className="text-gray-600">Eficiencia Promedio</div>
          <div className="text-sm text-green-600 mt-1">+3% vs mes anterior</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">92%</div>
          <div className="text-gray-600">Cumplimiento</div>
          <div className="text-sm text-red-600 mt-1">-2% vs mes anterior</div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2">15%</div>
          <div className="text-gray-600">Productos Pendientes</div>
          <div className="text-sm text-green-600 mt-1">-8% vs mes anterior</div>
        </div>
      </div>
    </div>
  )
}

export default Reportes
