import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { reportsApi } from "@/api/reports"
import type { ReportFilters } from "@/types/report"

import { cleanFilters } from "@/utils/report"
import Pagination from "@/components/pagination"
import Sidebar from "@/components/sidebar"
import TableFilter from "@/pages/reports/report-management/report-filter"
import ReportTable from "./report-table"

const ReportsManagement = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    page: 1,
    limit: 10,
    status: "",
    crime_type: "",
    severity: "",
    created_from: "",
    created_to: "",
  })

  const {
    data: reportsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reports", filters],
    queryFn: () => reportsApi.getAllReports(cleanFilters(filters)),
  })

  const handleFilterChange = (key: keyof ReportFilters, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))

    setTimeout(() => refetch(), 100)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="px-4 py-8 bg-blue-900 min-h-screen space-y-6 w-full flex flex-col">
        {/* Filters */}
        <TableFilter
          filters={filters}
          setFilters={setFilters}
          handleFilterChange={handleFilterChange}
          refetch={refetch}
        />
        {/* Reports Table */}
        <div className="overflow-x-auto">
          <ReportTable isLoading={isLoading} reportsData={reportsData} />
        </div>
        <div className="mt-auto">
          {/* Pagination */}
          {reportsData && reportsData?.data.totalPages > 1 && (
            <Pagination
              handleFilterChange={handleFilterChange}
              limit={reportsData?.data?.limit}
              page={reportsData?.data?.page}
              total={reportsData?.data?.total}
              totalPages={reportsData?.data?.totalPages}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportsManagement
