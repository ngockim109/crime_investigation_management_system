import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { MedicalSupport, DataCreateMedicalSupport } from "@/types/medical-support.interface"

export const medicalSupportApi = {
  updateMedicalSupport: async (
    id: string,
    data: MedicalSupport
  ): Promise<ApiResponse<MedicalSupport>> => {
    const response = await api.patch<ApiResponse<MedicalSupport>>(
      `/medical-supports/${id}`,
      data
    )
    return response.data
  },

  createMedicalSupport: async (
    data: DataCreateMedicalSupport
  ): Promise<ApiResponse<MedicalSupport>> => {
    const response = await api.post<ApiResponse<MedicalSupport>>(
      `/medical-supports`,
      data
    )
    return response.data
  },

  deleteMedicalSupport: async (
    id: string
  ): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
      `/medical-supports/${id}`
    )
    return response.data
  }
}
