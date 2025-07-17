import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
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

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({
    email,
    password,
    firstName,
    lastName,
  }: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) throw error
    return data.user
  },
)

export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data.user
  },
)

export const signOut = createAsyncThunk("auth/signOut", async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Sign up failed"
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Sign in failed"
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { setUser, clearError } = authSlice.actions
export default authSlice.reducer
