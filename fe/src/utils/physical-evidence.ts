import type { PhysicalEvidenceFilters } from "@/types/physical-evidence.interface"

export const cleanFilters = (filters: PhysicalEvidenceFilters) => {
  const cleaned: Record<string, unknown> = {}

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      cleaned[key] = value
    }
  })

  return cleaned
}

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
}
