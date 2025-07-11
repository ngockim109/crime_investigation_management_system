import type { ApiResponse } from "@/types/api.interface"
import { api } from "."

import type {
  ResponseGetAllUserApi,
  User,
  UserFilters,
  UserFormAdd,
  UserFormEdit,
  UserResponse,
} from "@/types/user.interface"

export const userApi = {
  createUser: async (
    userData: UserFormAdd
  ): Promise<ApiResponse<UserResponse>> => {
    const response = await api.post("/users", userData)
    return response.data
  },

  getAllUsersFilters: async (
    params: UserFilters
  ): Promise<ApiResponse<ResponseGetAllUserApi>> => {
    const response = await api.get(
      `/users?currentPage=${params.currentPage}&position=${params.position}`
    )
    return response.data
  },

  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get("/users")
    return response.data
  },

  getUserByUsername: async (
    user_name: string | undefined
  ): Promise<ApiResponse<UserResponse>> => {
    const response = await api.get(`/users/${user_name}`)
    return response.data
  },
  updateUser: async (
    userData: UserFormEdit,
    user_name: string
  ): Promise<ApiResponse<UserResponse>> => {
    const response = await api.patch(`/users/${user_name}`, userData)
    return response.data
  },
}
