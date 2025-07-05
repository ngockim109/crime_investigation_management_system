import type {
  ReportStatus,
  Severity,
  CrimeType,
  RelationIncident,
} from "@/enum/report.enum"
import type { PartyType, Gender } from "@/enum/party.enum"
import type { EvidenceType } from "@/enum/evidence.enum"

export interface Party {
  parties_id: string
  full_name: string
  type_Party: PartyType
  gender: Gender
  nationality: string
  statement: string
  attachments_url?: ResponseUploadFileDto[]
  created_at: string
  is_deleted: boolean
  report_id: string
}

export interface Evidence {
  evidence_id: string
  report_id: string
  type_evidence: EvidenceType
  description?: string
  current_location?: string
  attached_file?: ResponseUploadFileDto[]
  is_deleted: boolean
  createdAt: string
  updatedAt: string
}

export interface ResponseUploadFileDto {
  public_id: string
  file_url: string
  original_name: string
  resource_type: string
}

export interface Report {
  report_id: string
  crime_type: CrimeType
  severity: Severity
  time_occurrence?: string
  relation_incident: RelationIncident
  address: string
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
  status: ReportStatus
  created_at: string
  is_deleted: boolean
  officer_approve_id?: string
  case_id?: string
  officer?: {
    id: string
    fullname: string
    email: string
  }
  case?: {
    case_id: number
    case_number: string
    type: string
    status: string
  }
  parties?: Party[]
  evidences?: Evidence[]
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

export interface ReportData {
  reporter_fullname: string
  reporter_email: string
  reporter_phonenumber: string
  address: string
  typeReport: string
  time_occurrence: string
  description_incident: string
  relationshipIncident: string
  crimeType: string
  case_location: string
  severity: string
}
