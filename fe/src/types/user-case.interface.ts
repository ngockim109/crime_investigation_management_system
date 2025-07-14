export interface CaseUsersResponse {
  user_name: string
  phone_number: string
  full_name: string
  description: string
}

export interface ICaseOnlyDto {
  case_id: string;
  crime_type: string;
  severity: string;
  time_occurrence: string;
  case_location: string;
  case_status: string;
}
