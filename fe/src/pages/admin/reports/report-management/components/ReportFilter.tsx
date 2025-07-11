import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Filter, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { useState, type Dispatch, type SetStateAction } from "react"
import type { ReportFilters, ReportsResponse } from "@/types/report.interface"
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import type { ApiResponse } from "@/types/api.interface"
import { format } from "date-fns"

interface TableFilterProps {
  filters: ReportFilters
  setFilters: Dispatch<SetStateAction<ReportFilters>>
  handleFilterChange: (key: keyof ReportFilters, value: unknown) => void
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ApiResponse<ReportsResponse>, Error>>
}
const TableFilter = ({
  setFilters,
  filters,
  handleFilterChange,
  refetch,
}: TableFilterProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const handleDateRangeChange = () => {
    if (dateRange.from && dateRange.to) {
      // Validate that from and to dates are different
      if (dateRange.from.toDateString() === dateRange.to.toDateString()) {
        // Optionally show a toast/alert here
        console.warn("Start and end dates cannot be the same")
        return
      }

      // Ensure from date is before to date
      if (dateRange.from > dateRange.to) {
        // Swap the dates if from is after to
        setFilters((prev) => ({
          ...prev,
          created_from: dateRange.to?.toISOString(),
          created_to: dateRange.from?.toISOString(),
          page: 1,
        }))
      } else {
        setFilters((prev) => ({
          ...prev,
          created_from: dateRange.from?.toISOString(),
          created_to: dateRange.to?.toISOString(),
          page: 1,
        }))
      }
      setTimeout(() => refetch(), 100)
    }
    setCalendarOpen(false)
  }
  const handleDateRangeCancel = () => {
    // Reset date range to the current filter values or empty
    if (filters.created_from && filters.created_to) {
      setDateRange({
        from: new Date(filters.created_from),
        to: new Date(filters.created_to),
      })
    } else {
      setDateRange({})
    }
    setCalendarOpen(false)
  }

  const clearFilters = () => {
    setFilters({
      page: 1,
      limit: 10,
      status: "",
      crime_type: "",
      severity: "",
      created_from: "",
      created_to: "",
    })
    setDateRange({})
    setTimeout(() => refetch(), 100)
  }
  return (
    <div className="flex sm:flex-row flex-col gap-8 lg:items-center items-start">
      <div className="flex items-center gap-2">
        <span className="text-white font-semibold">Filter</span>
        <Filter className="h-4 w-4 text-white" />
      </div>

      <div className="flex lg:items-center gap-3 justify-between w-full lg:flex-row flex-col items-start">
        <div className="flex items-center gap-4 flex-wrap">
          {/* All/Clear Filters Button */}
          <Button
            onClick={clearFilters}
            variant="outline"
            className={cn(
              "rounded-full flex items-center gap-1 font-medium transition-colors cursor-pointer",
              // Check if any filters are active
              filters.status ||
                filters.crime_type ||
                filters.severity ||
                filters.created_from ||
                filters.created_to
                ? "bg-transparent text-blue-800 border-blue-800 hover:bg-blue-800/10 hover:text-blue-800"
                : "bg-blue-800 text-white border-gray-200 hover:bg-gray-50"
            )}
          >
            <span>All</span>
            <ChevronDown className="text-muted-foreground" />
          </Button>

          {/* Status Filter */}
          <Select
            onValueChange={(value) => handleFilterChange("status", value)}
            value={filters.status || ""}
          >
            <SelectTrigger
              className={cn(
                "rounded-full font-medium transition-colors cursor-pointer",
                filters.status
                  ? "bg-blue-800 text-white border-gray-200 [&>span]:text-white [&>svg]:text-white"
                  : "bg-transparent border text-blue-800 border-blue-800 [&>span]:text-blue-800 [&>svg]:text-blue-800 hover:bg-blue-800/10"
              )}
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Crime Type Filter */}
          <Select
            onValueChange={(value) => handleFilterChange("crime_type", value)}
            value={filters.crime_type || ""}
          >
            <SelectTrigger
              className={cn(
                "rounded-full font-medium transition-colors cursor-pointer",
                filters.crime_type
                  ? "bg-blue-800 text-white border-gray-200 [&>span]:text-white [&>svg]:text-white"
                  : "bg-transparent border text-blue-800 border-blue-800 [&>span]:text-blue-800 [&>svg]:text-blue-800 hover:bg-blue-800/10"
              )}
            >
              <SelectValue placeholder="Crime Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="fraud">Fraud</SelectItem>
                <SelectItem value="vandalism">Vandalism</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="white-collar">
                  White-Collar Crimes
                </SelectItem>
                <SelectItem value="cyber-crime">Cyber Crimes</SelectItem>
                <SelectItem value="drug-related">
                  Drug-related Crimes
                </SelectItem>
                <SelectItem value="public-order">
                  Public Order Crimes
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Severity Filter */}
          <Select
            onValueChange={(value) => handleFilterChange("severity", value)}
            value={filters.severity || ""}
          >
            <SelectTrigger
              className={cn(
                "rounded-full font-medium transition-colors cursor-pointer",
                filters.severity && filters.severity !== ""
                  ? "bg-blue-800 text-white border-gray-200 [&>span]:text-white [&>svg]:text-white"
                  : "bg-transparent text-blue-800 border-blue-800 [&>span]:text-blue-800 [&>svg]:text-blue-800 hover:bg-blue-800/10"
              )}
            >
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="minor">Minor</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="serious">Serious</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Date Range Filter */}
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left rounded-full font-medium transition-colors cursor-pointer",
                  dateRange.from || filters.created_from
                    ? "bg-blue-800 text-white border-gray-200 hover:bg-gray-50"
                    : "bg-transparent text-blue-800 border-blue-800 hover:bg-blue-800/10 hover:text-blue-800"
                )}
              >
                {dateRange.from &&
                dateRange.to &&
                dateRange.from.toDateString() ===
                  dateRange.to.toDateString() ? (
                  <span>Created at</span>
                ) : dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Created at</span>
                )}
                <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                defaultMonth={dateRange.from}
                selected={dateRange as DateRange}
                onSelect={(range) => setDateRange(range || {})}
                numberOfMonths={2}
                showOutsideDays={false}
              />
              <div className="p-3 border-t">
                {/* Show validation error if same date selected */}
                {dateRange.from &&
                  dateRange.to &&
                  dateRange.from.toDateString() ===
                    dateRange.to.toDateString() && (
                    <div className="text-sm text-red-600 mb-3 px-2">
                      Please select different start and end dates
                    </div>
                  )}
                <div className="flex gap-2">
                  <Button
                    onClick={handleDateRangeCancel}
                    variant="outline"
                    className="flex-1 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDateRangeChange}
                    className="flex-1 cursor-pointer"
                    disabled={
                      !dateRange.from ||
                      !dateRange.to ||
                      dateRange.from.toDateString() ===
                        dateRange.to.toDateString()
                    }
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default TableFilter
