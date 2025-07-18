"use client"

const BigButton = ({ icon, title, description, onClick, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  }

  return (
    <button
      onClick={onClick}
      className={`
        ${colorClasses[color]} text-white rounded-lg p-4 sm:p-6
        flex flex-col items-center justify-center
        transition-all duration-200 transform hover:scale-105
        shadow-md hover:shadow-lg w-full h-32 sm:h-40
        touch-manipulation
      `}
    >
      <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
      <h3 className="text-base sm:text-xl font-bold mb-1 text-center leading-tight">{title}</h3>
      {description && <p className="text-xs sm:text-sm text-center opacity-90 leading-tight px-2">{description}</p>}
    </button>
  )
}

export default BigButton
