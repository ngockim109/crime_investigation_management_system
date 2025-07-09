import type { MedicalType } from "@/enum/medical.enum"
import type { ResponseUploadFileDto } from "./report.interface"

export interface MedicalSupport {
  medical_supports_id: string
  medical_unit_id: string
  support_type: MedicalType
  personnel_assigned: string
  location_assigned: string
  remarks?: string
  scene_sketch_file?: ResponseUploadFileDto
  is_deleted: boolean
  created_at: string
  updated_at: string
  initial_responses_id?: string
  created_by?: string
}

export interface attached_file {
  original_name: string
  file_url: string
  public_id: string
  resource_type: string
}
