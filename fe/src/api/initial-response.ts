import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { InitialResponse, InitialResponseData } from "@/types/initial-response.interface"

export const initialResponseApi = {
  // getAllCases: async (
  //   filters: CaseFilters
  // ): Promise<ApiResponse<CaseResponse>> => {
  //   const response = await api.get<ApiResponse<CaseResponse>>("/cases", {
  //     params: filters,
  //   })
  //   return response.data
  // },

  // getCaseById: async (id: string): Promise<ApiResponse<Case>> => {
  //   const response = await api.get<ApiResponse<Case>>(`/cases/${id}`)
  //   return response.data
  // },

  createInitialResponse: async (initialResponseData: Partial<InitialResponseData>): Promise<ApiResponse<InitialResponse>> => {
    const response = await api.post<ApiResponse<InitialResponse>>("/initial-responses", initialResponseData)
    return response.data
  },
}
