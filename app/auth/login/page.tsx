"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { loginUser, signupUser, clearAuthError } from "@/store/slices/authSlice"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("") // For signup
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(clearAuthError()) // Clear previous errors

    if (isLogin) {
      const resultAction = await dispatch(loginUser({ email, password }))
      if (loginUser.fulfilled.match(resultAction)) {
        toast({
          title: "Login Successful!",
          description: "Welcome back!",
        })
        router.push("/") // Redirect to homepage on successful login
      } else if (loginUser.rejected.match(resultAction)) {
        toast({
          title: "Login Failed",
          description: resultAction.payload as string,
          variant: "destructive",
        })
      }
    } else {
      const resultAction = await dispatch(signupUser({ email, password, name }))
      if (signupUser.fulfilled.match(resultAction)) {
        toast({
          title: "Signup Successful!",
          description: "Please check your email to confirm your account.",
        })
        setIsLogin(true) // Switch to login after successful signup
      } else if (signupUser.rejected.match(resultAction)) {
        toast({
          title: "Signup Failed",
          description: resultAction.payload as string,
          variant: "destructive",
        })
      }
    }
  }

  // Redirect if already authenticated
  if (isAuthenticated && typeof window !== "undefined") {
    router.push("/")
    return null // Render nothing while redirecting
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-red-800">{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Enter your credentials to access your account" : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-700 text-white py-2 rounded-none"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isLogin ? "Logging In..." : "Signing Up..."}
                </>
              ) : isLogin ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <Link href="#" onClick={() => setIsLogin(false)} className="text-red-800 hover:underline">
                  Sign Up
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link href="#" onClick={() => setIsLogin(true)} className="text-red-800 hover:underline">
                  Login
                </Link>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
