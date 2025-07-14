import type { CaseStatusType } from "@/enum/case.enum"

export interface Reporter {
  reporter_fullname: string
}
export interface Case {
  case_id: string
  crime_type: string
  severity: string
  time_occurrence: string
  case_location: string
  case_status: CaseStatusType
  reports: Reporter[]
}


export interface CaseResponse {
  data: Case[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface CaseFilters {
  search?: string
  status?: CaseStatusType
  crime_type?: string
  severity?: string
  from_date?: string
  to_date?: string
  page?: number
  limit?: number
}
