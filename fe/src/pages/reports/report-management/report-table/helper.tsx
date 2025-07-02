export const getStatusBadge = (status: string) => {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200 rounded-full",
    approved: "bg-green-100 text-green-800 border-green-200 rounded-full",
    rejected: "bg-red-100 text-red-800 border-red-200 rounded-full",
  }
  return (
    variants[status as keyof typeof variants] ||
    "bg-gray-100 text-gray-800 rounded-full"
  )
}

export const getSeverityBadge = (severity: string) => {
  const variants = {
    minor: "bg-blue-100 text-blue-800 border-blue-200 rounded-full",
    moderate: "bg-orange-100 text-orange-800 border-orange-200 rounded-full",
    serious: "bg-red-100 text-red-800 border-red-200 rounded-full",
    critical: "bg-purple-100 text-purple-800 border-purple-200 rounded-full",
  }
  return (
    variants[severity as keyof typeof variants] ||
    "bg-gray-100 text-gray-800 rounded-full"
  )
}
