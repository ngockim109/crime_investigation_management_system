import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { reportsApi } from "@/api/reports"
import type { ReportFilters } from "@/types/report.interface"

import { cleanFilters } from "@/utils/report"
import Pagination from "@/components/pagination"
import TableFilter from "./components/ReportFilter"
import ReportTable from "./components/ReportTable"

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
    <>
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
    </>
  )
}

export default ReportsManagement
