import type { EvidenceType } from "@/enum/evidence.enum"
import type { GenderType, PartyType } from "@/enum/party.enum"
import type {
  CrimeType,
  RelationIncidentType,
  ReportStatusType,
  SeverityType,
} from "@/enum/report.enum"
import type { Party } from "./party.interface"
import type { Evidence } from "./evidence.interface"

export interface ResponseUploadFileDto {
  public_id: string
  file_url: string
  original_name: string
  resource_type: string
}

export interface Report {
  report_id: string
  crime_type: CrimeType
  severity: SeverityType
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
  status: ReportStatusType
  relation_incident: RelationIncidentType
  time_occurrence: string
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
  parties: Party[]
  evidences: Evidence[]
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
  email?: string
}

export interface ReportData {
  reporter_fullname: string
  reporter_email: string
  reporter_phonenumber: string
  address: string
  time_occurrence: string
  description: string
  relation_incident: string
  crime_type: string
  case_location: string
  severity: string
}
// {
//     "crime_type": "theft",
//     "severity": "minor",
//     "description": "Armed robbery at convenience store with multiple witnesses",
//     "case_location": "456 Nguyen Hue Street, District 1, Ho Chi Minh City",
//     "reporter_fullname": "Le Van C",
//     "reporter_email": "le.van.c@gmail.com",
//     "reporter_phonenumber": "+84901234567",
//     "suspect_fullname": "Unknown Male",
//     "physical_description": "Male, approximately 25-30 years old, 1.7m tall, wearing black hoodie and jeans",
//     "contact_information": "Phone: +84901234567,
//      Email: le.van.c@gmail.com",
//     "means_of_transport": "Motorbike - red Honda Wave",
//     "time_occurrence": "2024-01-15 14:30:00",
//     "relation_incident": "WITNESS",
//     "address": "789 Ton Duc Thang Street, District 1, Ho Chi Minh City",
//     "parties": [
//         {
//             "full_name": "Pham Thi D",
//             "party_type": "witness",
//             "gender": "female",
//             "nationality": "Vietnamese",
//             "statement": "I was in the store when the robbery happened. The suspect had a knife and demanded money from the cashier.",
//             "attached_file": [
//                 {
//                     "original_name": "file url",
//                     "file_url": "https://example.com/witness-statement-1.pdf",
//                     "public_id": "1234",
//                     "resource_type": "enum"
//                 }
//             ]
//         }
//     ],
//     "evidences": [
//         {
//             "type_evidence": "documentary-evidence",
//             "description": "CCTV footage from store security camera",
//             "current_location": "Store security room - hard drive backup",
//             "attached_file": [
//                 {
//                     "original_name": "file url",
//                     "file_url": "https://example.com/witness-statement-1.pdf",
//                     "public_id": "1234",
//                     "resource_type": "enum"
//                 }
//             ]
//         },
//         {
//             "type_evidence": "documentary-evidence",
//             "description": "Fingerprints found on cash register",
//             "current_location": "Police forensics lab - evidence locker A123",
//             "attached_file": [
//                 {
//                     "original_name": "file url",
//                     "file_url": "https://example.com/witness-statement-1.pdf",
//                     "public_id": "1234",
//                     "resource_type": "enum"
//                 }
//             ]
//         },
//         {
//             "type_evidence": "documentary-evidence",
//             "description": "Medical report of cashier's minor injuries",
//             "current_location": "Cho Ray Hospital - medical records",
//             "attached_file": [
//                 {
//                     "original_name": "file url",
//                     "file_url": "https://example.com/witness-statement-1.pdf",
//                     "public_id": "1234",
//                     "resource_type": "enum"
//                 }
//             ]
//         }
//     ]
// }
