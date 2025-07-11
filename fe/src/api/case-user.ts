import type { ApiResponse } from "@/types/api.interface"
import { api } from "."

export const caseUserApi = {

  createCaseUser: async (data: { case_id: string, user_name: string }[]) => {
    const response = await api.post<ApiResponse<any>>("/case-user", data)
    return response.data
  },
}