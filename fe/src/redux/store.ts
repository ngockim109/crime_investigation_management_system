import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import { accountReducer } from "@/features/account/accountSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,

    account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
