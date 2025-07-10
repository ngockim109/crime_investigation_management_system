import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { DataCreatePreservationMeasure, PreservationMeasure } from "@/types/scene-preservation.interface"

export const preservationMeasureApi = {
  updatePreservationMeasure: async (
    id: string,
    data: PreservationMeasure
  ): Promise<ApiResponse<PreservationMeasure>> => {
    const response = await api.patch<ApiResponse<PreservationMeasure>>(
      `/preservation-measures/${id}`,
      data
    )
    return response.data
  },

  createPreservationMeasure: async (
    data: DataCreatePreservationMeasure
  ): Promise<ApiResponse<PreservationMeasure>> => {
    const response = await api.post<ApiResponse<PreservationMeasure>>(
      `/preservation-measures`,
      data
    )
    return response.data
  },

  deletePreservationMeasure: async (
    id: string
  ): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(
      `/preservation-measures/${id}`
    )
    return response.data
  }
}
