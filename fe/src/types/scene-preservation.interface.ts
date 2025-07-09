import type { ResponseUploadFileDto } from "./report.interface"

export interface PreservationMeasure {
  preservation_measures_id: string
  arrival_start_time: string
  arrival_end_time: string
  protection_methods: string
  area_covered: string
  special_instructions: string
  attached_file?: ResponseUploadFileDto[]
  is_deleted: boolean
  created_at: string
  updated_at: string
  responsible_officer?: string
  initial_responses_id?: string
}

export interface attached_file {
  original_name: string
  file_url: string
  public_id: string
  resource_type: string
}
export interface PreservationMeasureData {
  preservation_measures_id: string
  arrival_start_time: string
  arrival_end_time: string
  protection_methods: string
  area_covered: string
  special_instructions: string
  attached_file?: attached_file[]
  is_deleted: boolean
  created_at: string
  updated_at: string
  responsible_officer?: string
  initial_responses_id?: string
}