import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] text-center px-4">
      <h1 className="text-6xl font-bold text-primary-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button asChild className="bg-primary-800 hover:bg-primary-700 text-white px-6 py-3 text-lg">
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  )
}
