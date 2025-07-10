import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import type { InitialStatementFilters } from "@/types/initial-statements.interface"


interface InitialStatementsFilterProps {
  filters: InitialStatementFilters
  onFiltersChange: (filters: InitialStatementFilters) => void
}

const InitialStatementsFilter = ({
  filters,
  onFiltersChange,
}: InitialStatementsFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (
    key: keyof InitialStatementFilters,
    value: string | number
  ) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const applyFilters = () => {
    onFiltersChange(localFilters)
  }

  const resetFilters = () => {
    const resetFilters: InitialStatementFilters = {
      page: 1,
      limit: 10,
      case_id: "",
      captured_by: "",
      date_from: "",
      date_to: "",
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <Card className="mb-6 rounded-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-blue-900">
            Filter Media
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Filter className="h-4 w-4 mr-2" />
            {isExpanded ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="captured_by">Captured By</Label>
              <Input
                id="captured_by"
                placeholder="Captured by"
                value={localFilters.captured_by || ""}
                onChange={(e) =>
                  handleFilterChange("captured_by", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_from">Date From</Label>
              <Input
                id="date_from"
                type="date"
                value={localFilters.date_from || ""}
                onChange={(e) =>
                  handleFilterChange("date_from", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_to">Date To</Label>
              <Input
                id="date_to"
                type="date"
                value={localFilters.date_to || ""}
                onChange={(e) =>
                  handleFilterChange("date_to", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="case_id">Case ID</Label>
              <Input
                id="case_id"
                placeholder="Case ID"
                value={localFilters.case_id || ""}
                onChange={(e) => handleFilterChange("case_id", e.target.value)}
                className="border-blue-200 focus:border-blue-500"
                disabled
              />
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button
              onClick={applyFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button
              variant="outline"
              onClick={resetFilters}
              className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default InitialStatementsFilter 