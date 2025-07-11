import type { PartyType, GenderType } from "@/enum/party.enum"

export interface Party {
  parties_id: string;
  full_name: string;
  party_type: PartyType;
  gender: GenderType;
  nationality: string;
  statement: string;
  attached_file: AttachedFile[];
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  report_id?: string;
  case_id?: string;
}

export interface AttachedFile {
  original_name: string;
  file_url: string;
  public_id: string;
  resource_type: string;
}

export interface PartiesFilters {
  page?: number;
  limit?: number;
  full_name?: string;
  party_type?: PartyType;
  gender?: GenderType;
  nationality?: string;
  case_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface PartiesResponse {
  data: Party[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreatePartiesData {
  full_name: string;
  party_type: PartyType;
  gender: GenderType;
  nationality: string;
  statement: string;
  attachments_url?: AttachedFile[];
  report_id?: string;
  case_id?: string;
}
