"use client"

import { useState } from "react"
import { User, Lock, Eye, EyeOff } from "lucide-react"
import Swal from "sweetalert2" // Asegúrate de tener sweetalert2 instalado
import axios from "axios"

const Login = ({ onLogin }) => {
  const [nombre, setNombre] = useState("")
  const [password_hash, setPassword_hash] = useState("")
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:10101/login/login", { nombre, password_hash })

      const token = res.data.token
      const userRoleId = res.data.user.id_rol
      const userName = res.data.user.nombre

      // Map role IDs to role names
      let roleName = ""
      if (userRoleId === 1) {
        roleName = "administrador"
      } else if (userRoleId === 2) {
        roleName = "lider pintura"
      } else if (userRoleId === 3) {
        roleName = "lider despacho"
      }

      Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Inicio de sesión exitoso como ${roleName}.`,
        timer: 1500,
        showConfirmButton: false,
      })

      // Store token in localStorage for future requests
      localStorage.setItem("token", token)
      localStorage.setItem("userRole", roleName)
      localStorage.setItem("userName", userName)

      onLogin(roleName)
    } catch (error) {
      console.error("Error al iniciar sesión:", error)

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        timer: 2000,
        showConfirmButton: false,
      })

      setError("Usuario o contraseña incorrectos")
    }
  }

  // Para la alerta de cierre de sesión, agrégala en el componente donde se maneja el logout:
  // Ejemplo en el handler de logout:
  // Swal.fire({ icon: "info", title: "Sesión cerrada", text: "Has cerrado sesión correctamente.", timer: 1500, showConfirmButton: false })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Sistema de Gestión</h1>
          <p className="text-gray-600">Pintura y Despachos</p>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                id="username"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su usuario"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password_hash}
                onChange={(e) => setPassword_hash(e.target.value)}
                className="pl-10 pr-10 w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="text-center text-sm text-gray-500">
            <p>Usuarios de prueba:</p>
            <p>admin / admin - pintura / pintura - despacho / despacho</p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
  