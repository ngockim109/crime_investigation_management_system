import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { User } from "../types/user.interface"

export const usersApi = {
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    const response = await api.get("/users")
    return response.data
  },
}
