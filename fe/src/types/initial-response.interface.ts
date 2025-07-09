import type { DataMedicalSupport } from "./medical-support.interface"
import type { DataPreservationMeasure, PreservationMeasure } from "./scene-preservation.interface"

export interface InitialResponse {
  initial_responses_id: string
  dispatching_time: string
  arrival_time: string | Date
  preliminary_assessment: string
  is_deleted: boolean
  created_at: string
  updated_at: string
  case_id: string
  preservation_measures: PreservationMeasure[]
  medical_supports: DataMedicalSupport[]
}

export interface InitialResponseData {
  dispatching_time: string
  arrival_time: string
  preliminary_assessment: string
  case_id: string
  preservation_measures: DataPreservationMeasure[]
  medical_supports: DataMedicalSupport[]
}
