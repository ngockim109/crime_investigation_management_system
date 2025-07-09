import type { ApiResponse } from "@/types/api.interface"
import { api } from "."

import type { ResponseGetAllUserApi, UserFilters, UserFormAdd, UserFormEdit, UserReponse } from "@/types/user.interface"

export const userApi = {
    createUser: async (userData: UserFormAdd): Promise<ApiResponse<UserReponse>> => {
        const response = await api.post("/users", userData)
        return response.data
    },

    getAllUser: async (params: UserFilters): Promise<ApiResponse<ResponseGetAllUserApi>> => {
        const response = await api.get(`/users?current=${params.current}&pageSize=${params.pageSize}`)
        return response.data
    },
    getUserByUsername: async (user_name: string | undefined): Promise<ApiResponse<UserReponse>> => {

        const response = await api.get(`/users/${user_name}`)
        return response.data
    },
    updateUser: async (userData: UserFormEdit, user_name: string): Promise<ApiResponse<UserReponse>> => {
        const response = await api.patch(`/users/${user_name}`, userData)
        return response.data
    },
}
