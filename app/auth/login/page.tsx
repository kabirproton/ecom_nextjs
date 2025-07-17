"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux"
import { loginUser, signupUser, clearAuthError } from "@/store/slices/authSlice"
import type { AppDispatch, RootState } from "@/store"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("") // For signup
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/") // Redirect to home if already authenticated
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication Error",
        description: error,
        variant: "destructive",
      })
      dispatch(clearAuthError()) // Clear error after showing toast
    }
  }, [error, toast, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      dispatch(loginUser({ email, password }))
    } else {
      dispatch(signupUser({ email, password, name }))
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gray-100 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary-800">{isLogin ? "Login" : "Sign Up"}</CardTitle>
          <CardDescription>
            {isLogin ? "Enter your credentials to access your account." : "Create an account to get started."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-primary-800 hover:bg-primary-700 text-white" disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Link href="#" onClick={() => setIsLogin(false)} className="text-primary-800 hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="#" onClick={() => setIsLogin(true)} className="text-primary-800 hover:underline">
                  Login
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
