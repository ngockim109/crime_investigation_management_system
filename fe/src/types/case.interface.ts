export interface Case {
  case_id: string
}

export interface CaseResponse {
  data: Case[]
  total: number
  page: number
  limit: number
  totalPages: number
}
