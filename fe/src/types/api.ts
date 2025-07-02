import type { HttpStatusCode } from "axios"

export interface ApiResponse<T> {
  data: T
  message: string
  statusCode: HttpStatusCode
}
