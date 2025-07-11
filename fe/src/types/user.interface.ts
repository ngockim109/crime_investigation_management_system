export interface User {
  user_name: string
}
export interface UserFormAdd {
  user_name: string
  full_name: string
  password: string
  position: string
  date_of_birth: string
  day_attended: string
  phone_number: string
  zone: string
  status: string
}
export interface UserFormEdit {
  full_name: string
  password: string
  position: string
  date_of_birth: string
  day_attended: string
  phone_number: string
  zone: string
  status: string
}
export interface UserResponse {
  user_name: string
  full_name: string
  password: string
  position: string
  date_of_birth: string
  day_attended: string
  phone_number: string
  zone: string
  status: string
  refreshToken?: string
  role: {
    role_id: string
    description: ""
    permissions: {
      permission_id: string
      description: string
      api_path: string
      method: string
      module: string
    }[]
  }
}
export interface ResponseGetAllUserApi {
  meta: {
    current: number
    pageSize: number
    pages: number
    total: number
  }
  result: UserResponse[]
}
export interface UserFilters {
  currentPage?: number
  pageSize?: number
  position?: string
}
