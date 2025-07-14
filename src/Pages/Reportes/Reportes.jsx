import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Download, Calendar, User, Palette, Package } from 'lucide-react'

const Reportes = () => {
  const [selectedReport, setSelectedReport] = useState('operario')
  
  // Datos de ejemplo para gráficos
  const datosOperario = [
    { nombre: 'Juan Pérez', completados: 45, eficiencia: 92 },
    { nombre: 'María López', completados: 38, eficiencia: 88 },
    { nombre: 'Carlos Gómez', completados: 42, eficiencia: 90 },
    { nombre: 'Ana Rodríguez', completados: 35, eficiencia: 85 },
  ]
  
  const datosLinea = [
    { linea: 'Línea A', produccion: 125, meta: 150 },
    { linea: 'Línea B', produccion: 140, meta: 160 },
    { linea: 'Línea C', produccion: 95, meta: 100 },
    { linea: 'Línea D', produccion: 110, meta: 120 },
  ]
  
  const datosColor = [
    { color: 'Blanco', cantidad: 85, porcentaje: 35 },
    { color: 'Negro', cantidad: 65, porcentaje: 27 },
    { color: 'Gris', cantidad: 45, porcentaje: 18 },
    { color: 'Azul', cantidad: 30, porcentaje: 12 },
    { color: 'Rojo', cantidad: 20, porcentaje: 8 },
  ]
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
  
  const renderReport = () => {
    switch(selectedReport) {
      case 'operario':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 w-full"> {/* Added w-full here */}
            <h3 className="text-xl font-bold mb-4">Rendimiento por Operario</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={datosOperario}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completados" fill="#8884d8" name="Productos Completados" />
                <Bar dataKey="eficiencia" fill="#82ca9d" name="Eficiencia %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      
      case 'linea':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 w-full"> {/* Added w-full here */}
            <h3 className="text-xl font-bold mb-4">Producción por Línea</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={datosLinea}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="linea" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="produccion" fill="#8884d8" name="Producción Actual" />
                <Bar dataKey="meta" fill="#82ca9d" name="Meta" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )
      
      case 'color':
        return (
          <div className="bg-white rounded-lg shadow-md p-6 w-full"> {/* Added w-full here */}
            <h3 className="text-xl font-bold mb-4">Distribución por Color</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={datosColor}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ color, porcentaje }) => `${color} ${porcentaje}%`}
                    outerRadius={80}
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
              
              <div className="space-y-3">
                {datosColor.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="font-medium">{item.color}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{item.cantidad}</div>
                      <div className="text-sm text-gray-600">{item.porcentaje}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }
  
  return (
    <div className="w-full"> {/* Added w-full here */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold my-6 ml-5">Reportes e Indicadores</h2>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center mr-5">
          <Download size={20} className="mr-2" />
          Exportar Reporte
        </button>
      </div>
      
      {/* Selector de tipo de reporte */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full"> {/* Added w-full here */}
        <h3 className="text-lg font-bold mb-4">Seleccionar Tipo de Reporte</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setSelectedReport('operario')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === 'operario' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <User size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Por Operario</div>
          </button>
          
          <button
            onClick={() => setSelectedReport('linea')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === 'linea' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Package size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Por Línea</div>
          </button>
          
          <button
            onClick={() => setSelectedReport('color')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === 'color' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Palette size={24} className="mx-auto mb-2" />
            <div className="text-sm font-medium">Por Color</div>
          </button>
          
          <button
            onClick={() => setSelectedReport('cumplimiento')}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedReport === 'cumplimiento' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 w-full"> {/* Added w-full here */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2 ml-5">245</div>
          <div className="text-gray-600 ml-5">Total Productos</div>
          <div className="text-sm text-green-600 mt-1 ml-5">+12% vs mes anterior</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2 mr-5">89%</div>
          <div className="text-gray-600 mr-12">Eficiencia Promedio</div>
          <div className="text-sm text-green-600 mt-1 mr-12">+3% vs mes anterior</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2 mr-17">92%</div>
          <div className="text-gray-600 mr-20">Cumplimiento</div>
          <div className="text-sm text-red-600 mt-1 mr-25">-2% vs mes anterior</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <div className="text-3xl font-bold text-red-600 mb-2 mr-30">15%</div>
          <div className="text-gray-600 mr-32">Productos Pendientes</div>
          <div className="text-sm text-green-600 mt-1 mr-35">-8% vs mes anterior</div>
        </div>
      </div>
    </div>
  )
}

export default Reportes
