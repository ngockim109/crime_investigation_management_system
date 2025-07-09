import type { MedicalType } from "@/enum/medical.enum"
import type { ResponseUploadFileDto } from "./report.interface"

export interface MedicalSupport {
  medical_unit_id: string
  support_type: string
  personnel_assigned: string
  time_of_arrival: string
  location_assigned: string
  remarks: string
  created_by: string
  scene_sketch_file: FileAttachment[]
}

export interface FileAttachment {
  file_url: string
  original_name: string
  public_id: string
  resource_type: string
}
