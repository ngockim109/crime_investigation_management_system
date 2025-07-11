
import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    isAuth: boolean
    refresh_token: string
    access_token: string
}

const initialState: AuthState = {
    isAuth: false,
    refresh_token: localStorage.getItem("rf") || "",
    access_token: localStorage.getItem("ac") || ""
}

const reduxAuth = createSlice({
    name: "report",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setRefreshToken: (state, action: PayloadAction<string>) => {
            state.refresh_token = action.payload
            localStorage.setItem("refresh_token", action.payload)
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.access_token = action.payload
            localStorage.setItem("access_token", action.payload)
        }
    },
})

export const {
    setAccessToken, setAuth,
    setRefreshToken
} = reduxAuth.actions
export default reduxAuth.reducer
