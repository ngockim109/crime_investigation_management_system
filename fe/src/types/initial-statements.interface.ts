export interface InitialStatement {
  initial_statements_id: string;
  provider_name: string;
  statement_date: string; // ISO string
  contact_info: string;
  person_role: string; // PartyType as string
  statement_content: string;
  evidence_file_path?: any[]; // ResponseUploadFileDto[]
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  recorded_by?: string;
  recorded_by_user?: {
    username: string;
  };
  case_id?: string;
  case?: {
    case_id: string;
  };
}

export interface InitialStatementFilters {
  page?: number;
  limit?: number;
  provider_name?: string;
  captured_by?: string;
  case_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface InitialStatementResponse {
  data: InitialStatement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateInitialStatementData {
  provider_name: string;
  statement_date: string;
  contact_info: string;
  person_role: string;
  statement_content: string;
  evidence_file_path?: any[];
  case_id?: string;
  recorded_by?: string;
}

export interface UpdateInitialStatementData extends Partial<CreateInitialStatementData> {}