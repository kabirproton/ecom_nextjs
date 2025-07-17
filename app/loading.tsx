import type React from "react"

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="spinner"></div>
      <p className="ml-4 text-lg text-gray-700">Loading...</p>
    </div>
  )
}

export default Loading
