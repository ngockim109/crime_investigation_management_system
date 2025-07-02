import type { ApiResponse } from "@/types/api"
import { api } from "."
import type { Report, ReportsResponse, ReportFilters } from "../types/report"

export const reportsApi = {
  getAllReports: async (
    filters: ReportFilters
  ): Promise<ApiResponse<ReportsResponse>> => {
    const response = await api.get("/reports", { params: filters })
    return response.data
  },

  getReportById: async (id: number): Promise<ApiResponse<Report>> => {
    const response = await api.get(`/reports/${id}`)
    return response.data
  },

  getAllReportsByEmail: async (
    email: string
  ): Promise<ApiResponse<Report[]>> => {
    const response = await api.get(`/reports/by-email/${email}`)
    return response.data
  },

  createReport: async (reportData: unknown): Promise<ApiResponse<Report>> => {
    const response = await api.post("/reports", reportData)
    return response.data
  },
}
