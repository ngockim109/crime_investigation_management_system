import type { ApiResponse } from "@/types/api.interface"
import { api } from "."
import type { attached_file } from "@/types/party.interface"

export const uploadFileApi = {
  uploadFileCloudMulti: async (
    dataFiles: FormData
  ): Promise<ApiResponse<attached_file[]>> => {
    const response = await api.post("/upload/cloud-multi", dataFiles)
    return response.data
  },
}
