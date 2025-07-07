import { createSlice } from '@reduxjs/toolkit';
interface IState {
    isAuthenticated: boolean;
    isLoading: boolean;
    isRefreshToken: boolean;
    errorRefreshToken: string;
    user: {
        userName: string;
        fullName: string;
        avatarUrl: string | null;
        email: string;
        phoneNumber: string;
        role: {
            roleId: number;
            description: string;
            permissions: {
                permissionId: string;
                description: string;
                apiPath: string;
                method: string;
                module: string;
            }[]
        }
    };
    activeMenu: string;
}

const initialState: IState = {
    isAuthenticated: false,
    isLoading: true,
    isRefreshToken: false,
    errorRefreshToken: "",
    user: {
        userName: "",
        fullName: "",
        avatarUrl: "",
        email: "",
        phoneNumber: "",
        role: {
            roleId: 0,
            description: "",
            permissions: [],
        },
    },

    activeMenu: 'home'
};
const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setUserLoginInfo: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user.userName = action?.payload?.userName;
            state.user.email = action.payload.email;
            state.user.fullName = action.payload.fullName;
            state.user.role = action?.payload?.role;
            state.user.role.permissions = action?.payload?.role?.permissions;
        },
    }
})

export const { setUserLoginInfo } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;