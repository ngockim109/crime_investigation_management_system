import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { Case } from "../types/case.interface"

export const casesApi = {
  getAllCases: async (): Promise<ApiResponse<Case[]>> => {
    const response = await api.get("/cases")
    return response.data
  },
}
