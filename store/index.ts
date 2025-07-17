import { configureStore } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import cartSlice from "./slices/cartSlice"
import productSlice from "./slices/productSlice"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth"], // Only persist cart and auth
}

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  products: productSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
