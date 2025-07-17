"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/store"
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase" // Client-side Supabase client
import { encryptData } from "@/lib/encryption"

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginStart())

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      dispatch(loginFailure("Please enter both email and password."))
      toast({
        title: "Login Failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      })
      return
    }

    try {
      // Encrypt sensitive data before sending (e.g., password)
      const encryptedPassword = encryptData(password)

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password: encryptedPassword, // Send encrypted password
      })

      if (authError) {
        throw authError
      }

      if (data.user) {
        // In a real app, you might fetch more user details from your 'users' table
        // For now, use basic user data from Supabase auth
        const user = {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata?.full_name || data.user.email!.split("@")[0],
          isAdmin: false, // Determine admin status from your database
        }
        dispatch(loginSuccess(user))
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          variant: "default",
        })
        router.push("/dashboard") // Redirect to dashboard or homepage
      } else {
        dispatch(loginFailure("No user data received after login."))
        toast({
          title: "Login Failed",
          description: "No user data received after login.",
          variant: "destructive",
        })
      }
    } catch (err: any) {
      dispatch(loginFailure(err.message || "An unexpected error occurred."))
      toast({
        title: "Login Failed",
        description: err.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">Login</CardTitle>
          <CardDescription className="text-gray-600">Enter your email below to login to your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="ml-auto inline-block text-sm underline text-bibaRed-600 hover:text-bibaRed-700"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-bibaRed-600 hover:bg-bibaRed-700 text-white" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline text-bibaRed-600 hover:text-bibaRed-700">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
