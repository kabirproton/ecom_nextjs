import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabase"
import type { User, AuthState } from "@/types"
import { encryptData, decryptData } from "@/lib/encryption"

// Async Thunks
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password, name }: { email: string; password: string; name: string }, { rejectWithValue }) => {
    try {
      // Encrypt sensitive data before sending (example for name/other profile data)
      const encryptedName = encryptData(name)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: encryptedName, // Store encrypted name
            is_admin: false, // Default to non-admin
          },
        },
      })

      if (error) {
        return rejectWithValue(error.message)
      }

      if (data.user) {
        // Decrypt name for local state
        const decryptedName = data.user.user_metadata?.name ? decryptData(data.user.user_metadata.name) : undefined
        const user: User = {
          id: data.user.id,
          email: data.user.email!,
          name: decryptedName,
          isAdmin: data.user.user_metadata?.is_admin || false,
        }
        return user
      }
      return rejectWithValue("Signup failed: No user data returned.")
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return rejectWithValue(error.message)
      }

      if (data.user) {
        const decryptedName = data.user.user_metadata?.name ? decryptData(data.user.user_metadata.name) : undefined
        const user: User = {
          id: data.user.id,
          email: data.user.email!,
          name: decryptedName,
          isAdmin: data.user.user_metadata?.is_admin || false,
        }
        return user
      }
      return rejectWithValue("Login failed: No user data returned.")
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { rejectWithValue }) => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return rejectWithValue(error.message)
    }
    return true
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const checkUserSession = createAsyncThunk("auth/checkUserSession", async (_, { rejectWithValue }) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()

    if (error) {
      return rejectWithValue(error.message)
    }

    if (session?.user) {
      const decryptedName = session.user.user_metadata?.name ? decryptData(session.user.user_metadata.name) : undefined
      const user: User = {
        id: session.user.id,
        email: session.user.email!,
        name: decryptedName,
        isAdmin: session.user.user_metadata?.is_admin || false,
      }
      return user
    }
    return null // No active session
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload as string
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload as string
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      // Check Session
      .addCase(checkUserSession.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkUserSession.fulfilled, (state, action: PayloadAction<User | null>) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = !!action.payload
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.error = action.payload as string
      })
  },
})

export const { clearAuthError } = authSlice.actions
export default authSlice.reducer
