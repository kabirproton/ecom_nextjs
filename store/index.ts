import { configureStore, type Middleware } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import storageSession from "redux-persist/lib/storage/session" // defaults to sessionStorage for web
import { combineReducers } from "redux"

import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import productReducer from "./slices/productSlice"

// Redux-persist configuration for localStorage (e.g., cart)
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ["items", "totalQuantity", "totalAmount"], // Only persist these parts of the cart state
}

// Redux-persist configuration for sessionStorage (e.g., temporary form data)
const authPersistConfig = {
  key: "auth",
  storage: storageSession,
  whitelist: ["user", "isAuthenticated"], // Only persist these parts of the auth state
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
  products: productReducer, // Products might not need persistence if always fetched from API
})

// Simple logging middleware
const logger: Middleware = (store) => (next) => (action) => {
  console.log("dispatching", action)
  const result = next(action)
  console.log("next state", store.getState())
  return result
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger), // Add logger middleware
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
