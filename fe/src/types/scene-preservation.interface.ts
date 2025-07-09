import type { ResponseUploadFileDto } from "./report.interface"

export interface PreservationMeasure {
  preservation_measures_id: string
  responsible_officer: string
  arrival_start_time: string
  arrival_end_time: string
  protection_methods: string
  area_covered: string
  special_instructions: string
  attached_file: FileAttachment[]
}

export interface FileAttachment {
  file_url: string
  original_name: string
  public_id: string
  resource_type: string
}
