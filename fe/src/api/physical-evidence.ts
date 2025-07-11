import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type {
  PhysicalEvidence,
  PhysicalEvidenceResponse,
  PhysicalEvidenceFilters,
  CreatePhysicalEvidenceData,
  UpdatePhysicalEvidenceData,
} from "../types/physical-evidence.interface"

export const physicalEvidenceApi = {
  getAllEvidence: async (
    filters: PhysicalEvidenceFilters
  ): Promise<ApiResponse<PhysicalEvidenceResponse>> => {
    const response = await api.get("/physical-evidences", { params: filters })
    return response.data
  },

  getEvidenceById: async (
    id: string
  ): Promise<ApiResponse<PhysicalEvidence>> => {
    const response = await api.get(`/physical-evidences/${id}`)
    return response.data
  },

  createEvidence: async (
    evidenceData: CreatePhysicalEvidenceData
  ): Promise<ApiResponse<PhysicalEvidence>> => {
    const response = await api.post("/physical-evidences", evidenceData)
    return response.data
  },

  updateEvidence: async (
    id: string,
    evidenceData: UpdatePhysicalEvidenceData
  ): Promise<ApiResponse<PhysicalEvidence>> => {
    const response = await api.patch(`/physical-evidences/${id}`, evidenceData)
    return response.data
  },

  deleteEvidence: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/physical-evidences/${id}`)
    return response.data
  },
}
