import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import storageSession from "redux-persist/lib/storage/session" // defaults to sessionStorage for web
import authReducer from "./slices/authSlice"
import cartReducer from "./slices/cartSlice"
import productReducer from "./slices/productSlice"

// Redux Persist configuration for localStorage (e.g., cart)
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ["items"], // Only persist the 'items' array from cart slice
}

// Redux Persist configuration for sessionStorage (e.g., temporary form data)
const tempFormDataPersistConfig = {
  key: "tempFormData",
  storage: storageSession,
  whitelist: [], // Add slices here if you have temporary form data
}

const rootReducer = combineReducers({
  auth: authReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  products: productReducer,
  // Add other reducers here
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
