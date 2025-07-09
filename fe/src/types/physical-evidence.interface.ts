export interface PhysicalEvidence {
  physical_evidence_id: string
  identification_code: string
  scene_location: string
  collected_time: string
  scene_description: string
  initial_condition: string
  preservation_measures: string
  is_deleted: boolean
  created_at: string
  updated_at: string
  case_id?: string
  collector_username?: string
  collector?: {
    username: string
  }
  case?: {
    case_id: string
  }
}

export interface PhysicalEvidenceFilters {
  page?: number
  limit?: number
  identification_code?: string
  scene_location?: string
  collector_username?: string
  case_id?: string
  collected_from?: string
  collected_to?: string
}

export interface PhysicalEvidenceResponse {
  data: PhysicalEvidence[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CreatePhysicalEvidenceData {
  identification_code: string
  scene_location: string
  collected_time: string
  scene_description: string
  initial_condition: string
  preservation_measures: string
  case_id?: string
  collector_username?: string
}

export interface UpdatePhysicalEvidenceData
  extends Partial<CreatePhysicalEvidenceData> {}
