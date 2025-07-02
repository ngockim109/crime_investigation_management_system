export interface Report {
  report_id: string
  crime_type: string
  severity: "minor" | "moderate" | "serious" | "critical"
  description: string
  case_location: string
  reported_at: string
  reporter_fullname: string
  reporter_email: string
  reporter_phonenumber?: string
  suspect_fullname?: string
  physical_description?: string
  contact_information?: string
  means_of_transport?: string
  status: "pending" | "approved" | "rejected"
  officer_approve_id?: number
  case_id?: number
  created_at: string
  officer?: {
    id: number
    fullname: string
    email: string
  }
  case?: {
    case_id: number
    case_number: string
    type: string
    status: string
  }
}

export interface ReportsResponse {
  data: Report[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ReportFilters {
  status?: string
  crime_type?: string
  severity?: string
  created_from?: string
  created_to?: string
  page?: number
  limit?: number
}
