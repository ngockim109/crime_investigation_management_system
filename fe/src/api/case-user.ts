import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { CaseUsersResponse } from "@/types/user-case.interface"
import type { Case } from "@/types/case.interface"

export const caseUserApi = {

  createCaseUser: async (data: { case_id: string, user_name: string }[]) => {
    const response = await api.post<ApiResponse<any>>("/case-user", data)
    return response.data
  },

  getUsersByCaseId: async (id: string) => {
    const response = await api.get<ApiResponse<CaseUsersResponse[]>>(`/case-user/${id}/case-id`)
    return response.data
  },

  getUsersByUserId: async () => {
    const response = await api.get<ApiResponse<Case[]>>(`/case-user/user`)
    return response.data
  }
}