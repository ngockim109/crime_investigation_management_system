import type { EvidenceType } from "@/enum/evidence.enum"

export interface Evidence {
  type_evidence: EvidenceType
  description: string
  attached_file: attached_file[]
  current_location: string
}

export interface attached_file {
  original_name: string
  file_url: string
  public_id: string
  resource_type: string
}
