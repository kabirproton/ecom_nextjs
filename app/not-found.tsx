import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] bg-gray-50 text-center p-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-bibaRed-600 hover:bg-bibaRed-700 text-white px-6 py-3 text-lg rounded-md">
          Go to Homepage
        </Button>
      </Link>
    </div>
  )
}

export default NotFound
