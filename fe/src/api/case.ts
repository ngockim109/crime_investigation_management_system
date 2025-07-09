import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { Case, CaseFilters, CaseResponse } from "@/types/case.interface"

export const casesApi = {
  getAllCases: async (
    filters: CaseFilters
  ): Promise<ApiResponse<CaseResponse>> => {
    const response = await api.get<ApiResponse<CaseResponse>>("/cases", {
      params: filters,
    })
    return response.data
  },

  getCaseById: async (id: string): Promise<ApiResponse<Case>> => {
    const response = await api.get<ApiResponse<Case>>(`/cases/${id}`)
    return response.data
  },

  createCase: async (caseData: Partial<Case>): Promise<ApiResponse<Case>> => {
    const response = await api.post<ApiResponse<Case>>("/cases", caseData)
    return response.data
  },
}
