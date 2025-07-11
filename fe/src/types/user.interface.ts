export interface User {
  user_name: string
}

export interface UserResponse {
  data: User[]
  total: number
  page: number
  limit: number
  totalPages: number
}
