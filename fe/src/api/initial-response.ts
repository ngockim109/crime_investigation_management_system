import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type {
  InitialResponse,
  InitialResponseData,
} from "@/types/initial-response.interface"

export const initialResponseApi = {
  getInitialResponseByCaseId: async (
    caseId: string
  ): Promise<ApiResponse<InitialResponse>> => {
    const response = await api.get<ApiResponse<InitialResponse>>(
      `/cases/${caseId}/initial-response`
    )
    return response.data
  },

  createInitialResponse: async (
    initialResponseData: InitialResponseData
  ): Promise<ApiResponse<InitialResponse>> => {
    const response = await api.post<ApiResponse<InitialResponse>>(
      "/initial-responses",
      initialResponseData
    )
    return response.data
  },

  updateInitialResponse: async (
    initialResponseId: string,
    initialResponseData: InitialResponseData
  ): Promise<ApiResponse<InitialResponse>> => {
    const response = await api.patch<ApiResponse<InitialResponse>>(
      `/initial-responses/${initialResponseId}`,
      initialResponseData
    )
    return response.data
  },
}
