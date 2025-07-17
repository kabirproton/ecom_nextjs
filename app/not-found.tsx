import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-center px-4">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-foreground mb-4">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">The page you are looking for does not exist or has been moved.</p>
      <Link href="/">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Go to Homepage</Button>
      </Link>
    </div>
  )
}
