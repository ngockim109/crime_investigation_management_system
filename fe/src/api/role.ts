import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { RoleResponse } from "@/types/role.interface"

export const roleApi = {

  getAllRoles: async () => {
    const response = await api.get<ApiResponse<RoleResponse[]>>(`/roles`)
    return response.data
  }
}
