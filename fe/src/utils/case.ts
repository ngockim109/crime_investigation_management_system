import type { CaseFilters } from "@/types/case.interface"

export const cleanFilters = (filters: CaseFilters) => {
  const cleaned: Partial<CaseFilters> = {}

  // Always include page and limit
  cleaned.page = filters.page
  cleaned.limit = filters.limit

  // Only include other fields if they have non-empty values
  if (filters.case_status && filters.case_status.trim() !== "") {
    cleaned.case_status = filters.case_status
  }
  if (filters.crime_type && filters.crime_type.trim() !== "") {
    cleaned.crime_type = filters.crime_type
  }
  if (filters.severity && filters.severity.trim() !== "") {
    cleaned.severity = filters.severity
  }
  if (filters.dateFrom && filters.dateFrom.trim() !== "") {
    cleaned.dateFrom = filters.dateFrom
  }
  if (filters.dateTo && filters.dateTo.trim() !== "") {
    cleaned.dateTo = filters.dateTo
  }

  return cleaned as CaseFilters
}
