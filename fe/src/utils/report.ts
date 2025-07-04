import type { ReportFilters } from "@/types/report.interface"

export const cleanFilters = (filters: ReportFilters) => {
  const cleaned: Partial<ReportFilters> = {}

  // Always include page and limit
  cleaned.page = filters.page
  cleaned.limit = filters.limit

  // Only include other fields if they have non-empty values
  if (filters.status && filters.status.trim() !== "") {
    cleaned.status = filters.status
  }
  if (filters.crime_type && filters.crime_type.trim() !== "") {
    cleaned.crime_type = filters.crime_type
  }
  if (filters.severity && filters.severity.trim() !== "") {
    cleaned.severity = filters.severity
  }
  if (filters.created_from && filters.created_from.trim() !== "") {
    cleaned.created_from = filters.created_from
  }
  if (filters.created_to && filters.created_to.trim() !== "") {
    cleaned.created_to = filters.created_to
  }

  return cleaned as ReportFilters
}
