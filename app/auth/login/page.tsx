"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { loginStart, loginSuccess, loginFailure } from "@/store/slices/authSlice"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RootState } from "@/store"

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginStart())

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        throw authError
      }

      if (data.user && data.session) {
        // Fetch profile to get isAdmin status
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          throw profileError
        }

        const user = {
          id: data.user.id,
          email: data.user.email!,
          name: profileData?.full_name || data.user.email!,
          isAdmin: profileData?.is_admin || false,
        }

        dispatch(loginSuccess({ user, token: data.session.access_token }))
        router.push("/") // Redirect to homepage or dashboard
      } else {
        dispatch(loginFailure("Login failed: No user or session data."))
      }
    } catch (err: any) {
      dispatch(loginFailure(err.message || "An unexpected error occurred."))
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-bibaRed-700">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <Button
                type="submit"
                className="w-full bg-bibaRed-600 hover:bg-bibaRed-700 text-white py-2 px-4 rounded-md font-semibold"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-medium text-bibaRed-600 hover:text-bibaRed-500">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
