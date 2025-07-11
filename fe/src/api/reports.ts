import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type {
  Report,
  ReportsResponse,
  ReportFilters,
} from "../types/report.interface"

export const reportsApi = {
  getAllReports: async (
    filters: ReportFilters
  ): Promise<ApiResponse<ReportsResponse>> => {
    const response = await api.get("/reports", { params: filters })
    return response.data
  },

  getReportById: async (id: string): Promise<ApiResponse<Report>> => {
    const response = await api.get(`/reports/${id}`)
    return response.data
  },

  createReport: async (reportData: unknown): Promise<ApiResponse<Report>> => {
    const response = await api.post("/reports", reportData)
    return response.data
  },
}
