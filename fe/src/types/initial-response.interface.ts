import type { DataMedicalSupport, MedicalSupport } from "./medical-support.interface"
import type { DataPreservationMeasure } from "./scene-preservation.interface"

export interface InitialResponse {
  initial_responses_id: string
  dispatching_time: string // ISO date-time string
  arrival_time: Date     // ISO date-time string
  preliminary_assessment: string
  is_deleted: boolean
  created_at: string       // ISO date-time string
  updated_at: string       // ISO date-time string
  case_id: string
}

export interface InitialResponseData {
  initial_responses_id: string;
  dispatching_time: string;
  arrival_time: Date;
  preliminary_assessment: string;
  case_id: string;
  preservation_measures: DataPreservationMeasure[],
  medical_supports: DataMedicalSupport[]
}

