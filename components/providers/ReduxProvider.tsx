"use client"

import type React from "react"

import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { checkUserSession } from "@/store/slices/authSlice"
import type { AppDispatch } from "@/store"

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    // Check user session on initial load
    dispatch(checkUserSession())

    // Listen for auth state changes from Supabase
    const { data: authListener } = store.dispatch(
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          dispatch(checkUserSession()) // Re-check session to update Redux state
        } else {
          dispatch(logoutUser()) // Clear Redux state on logout
        }
      }),
    )

    return () => {
      authListener?.unsubscribe()
    }
  }, [dispatch])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

// Import supabase and logoutUser here to avoid circular dependency with store/slices/authSlice
import { supabase } from "@/lib/supabase"
import { logoutUser } from "@/store/slices/authSlice"
