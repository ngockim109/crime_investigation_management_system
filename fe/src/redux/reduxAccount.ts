import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// First, create the thunk
export const fetchAccount = createAsyncThunk(
    'account/fetchAccount',
    async () => {
        const response = await axios.get("http://localhost:3000/api/auth/account", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        console.log("Account data fetched:", response.data);
        return response.data;
    }
)

interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: {
        user_name: string;
        full_name: string;
        date_of_birth: string;
        day_attended: string;
        phone_number: string;
        status: string;
        zone: string;
        role: {
            role_id: string;
            description: string;
            permissions: {
                permission_id: string;
                description: string;
                api_path: string;
                method: string;
                module: string;
            }[]
            created_at: string | null;
            updated_at: string | null;
            isDeleted: boolean;
        };
    };
    activeMenu: string;
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: false,
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        user_name: "",
        full_name: "",
        date_of_birth: "",
        day_attended: "",
        phone_number: "",
        status: "",
        zone: "",
        role: {
            role_id: "",
            description: "",
            permissions: [],
            created_at: null,
            updated_at: null,
            isDeleted: false,
        },
    },
    activeMenu: "home",
}

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        },
        setUserLoginInfo: (state, action) => {
            console.log("Setting user login info:", action.payload);
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user.user_name = action?.payload?.user_name;
            state.user.full_name = action?.payload?.full_name;
            state.user.date_of_birth = action?.payload?.date_of_birth;
            state.user.day_attended = action?.payload?.day_attended;
            state.user.phone_number = action?.payload?.phone_number;
            state.user.status = action?.payload?.status;
            state.user.zone = action?.payload?.zone;
            state.user.role = action?.payload?.role;
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(fetchAccount.pending, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = true;
            }
        })

        builder.addCase(fetchAccount.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
                state.isLoading = false;
                state.user.user_name = action.payload.user_name;
                state.user.full_name = action.payload.full_name;
                state.user.date_of_birth = action.payload.date_of_birth;
                state.user.day_attended = action.payload.day_attended;
                state.user.phone_number = action.payload.phone_number;
                state.user.status = action.payload.status;
                state.user.zone = action.payload.zone;
                if (action.payload.role) {
                    state.user.role = action.payload.role;
                }
            }
        });


        builder.addCase(fetchAccount.rejected, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = false;
                state.isLoading = false;
            }
        })

    },
})

export const { setActiveMenu, setUserLoginInfo } = accountSlice.actions;
export default accountSlice.reducer;