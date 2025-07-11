import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/user/userSlice"
import reduxReport from "./reduxReport"
import reduxInitialResponse from "./reduxInitialResponse"
import reduxAuth from "./reduxAuth"

export const store = configureStore({
  reducer: {
    user: userReducer,
    report: reduxReport,
    initialResponse: reduxInitialResponse,
    auth: reduxAuth
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
