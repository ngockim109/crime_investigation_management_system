import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type {
  Report,
  ReportsResponse,
  ReportFilters,
} from "../types/report.interface"
import type { ReportStatusType } from "@/enum/report.enum"

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

  updateReport: async (
    id: string,
    status: ReportStatusType
  ): Promise<ApiResponse<Report>> => {
    const response = await api.patch(`/reports/${id}`, { status: status })
    return response.data
  },
}
