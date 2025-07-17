import type React from "react"

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-bibaRed-600 rounded-full"></div>
        <div className="w-3 h-3 bg-bibaRed-600 rounded-full"></div>
        <div className="w-3 h-3 bg-bibaRed-600 rounded-full"></div>
      </div>
    </div>
  )
}

export default Loading
