// types/scene-preservation.interface.ts

import type { FileAttachment } from "./medical-support.interface"

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

export interface DataCreatePreservationMeasure {
  responsible_officer: string
  arrival_start_time: string
  arrival_end_time: string
  protection_methods: string
  area_covered: string
  special_instructions: string
  attached_file: FileAttachment[]
  initial_responses_id: string
}

export interface DataPreservationMeasure {
  responsible_officer: string
  arrival_start_time: string
  arrival_end_time: string
  protection_methods: string
  area_covered: string
  special_instructions: string
  attached_file: FileAttachment[]
}
