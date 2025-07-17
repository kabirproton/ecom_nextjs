import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "@/types"
import { encryptData } from "@/lib/encryption"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false
      state.user = action.payload.user
      state.token = encryptData(action.payload.token) // Encrypt token
      state.isAuthenticated = true
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
    logout: (state) => {
      state.user = null
      state.token = null // Clear token
      state.isAuthenticated = false
      state.error = null
      state.loading = false
    },
    // You might want a separate action to set user from session/cookie if already logged in
    setUserFromSession: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = encryptData(action.payload.token)
      state.isAuthenticated = true
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, setUserFromSession } = authSlice.actions
export default authSlice.reducer
