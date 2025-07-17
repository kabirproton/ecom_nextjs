import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase"
import type { User } from "@/types"

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data.user
  },
)

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, fullName }: { email: string; password: string; fullName: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) throw error
    return data.user
  },
)

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
})

export const checkUserSession = createAsyncThunk("auth/checkUserSession", async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session?.user || null
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload as User
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Login failed"
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload as User
        state.isAuthenticated = true
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Signup failed"
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload as User
          state.isAuthenticated = true
        } else {
          state.user = null
          state.isAuthenticated = false
        }
        state.loading = false
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
