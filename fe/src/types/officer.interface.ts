import type { PresentStatusType } from "@/enum/case_user.enum"
import type { UserAccountStatusType, UserPositionType } from "@/enum/user.enum"

export interface OfficerData {
  user_name: string
  position: UserPositionType
  date_of_birth: string
  day_attended: string
  account_status: UserAccountStatusType
  present_status: PresentStatusType
  role_in_case: string
  phone_number: string
  zone: string
}

export interface OfficersResponse {
  data: OfficerData[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface OfficerFilters {
  position?: UserPositionType
  present_status?: PresentStatusType
  account_status?: UserAccountStatusType
  zone?: string
  phone_number?: string
  user_name?: string
  page?: number
  limit?: number
}
