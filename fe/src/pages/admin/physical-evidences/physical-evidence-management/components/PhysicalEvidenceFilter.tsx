import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import type { PhysicalEvidenceFilters } from "@/types/physical-evidence.interface"

interface PhysicalEvidenceFilterProps {
  filters: PhysicalEvidenceFilters
  onFiltersChange: (filters: PhysicalEvidenceFilters) => void
}

const PhysicalEvidenceFilter = ({
  filters,
  onFiltersChange,
}: PhysicalEvidenceFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  const handleFilterChange = (
    key: keyof PhysicalEvidenceFilters,
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
    const resetFilters: PhysicalEvidenceFilters = {
      page: 1,
      limit: 10,
      identification_code: "",
      scene_location: "",
      collector_username: "",
      case_id: "",
      collected_from: "",
      collected_to: "",
    }
    setLocalFilters(resetFilters)
    onFiltersChange(resetFilters)
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-blue-900">
            Filter Evidence
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
              <Label htmlFor="identification_code">Evidence ID</Label>
              <Input
                id="identification_code"
                placeholder="e.g., PE-01"
                value={localFilters.identification_code || ""}
                onChange={(e) =>
                  handleFilterChange("identification_code", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scene_location">Scene Location</Label>
              <Input
                id="scene_location"
                placeholder="e.g., Kitchen, Living Room"
                value={localFilters.scene_location || ""}
                onChange={(e) =>
                  handleFilterChange("scene_location", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collector_username">Collector</Label>
              <Input
                id="collector_username"
                placeholder="Collector username"
                value={localFilters.collector_username || ""}
                onChange={(e) =>
                  handleFilterChange("collector_username", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="case_id">Case ID</Label>
              <Input
                id="case_id"
                placeholder="Case ID"
                value={localFilters.case_id || ""}
                onChange={(e) => handleFilterChange("case_id", e.target.value)}
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collected_from">Collected From</Label>
              <Input
                id="collected_from"
                type="date"
                value={localFilters.collected_from || ""}
                onChange={(e) =>
                  handleFilterChange("collected_from", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="collected_to">Collected To</Label>
              <Input
                id="collected_to"
                type="date"
                value={localFilters.collected_to || ""}
                onChange={(e) =>
                  handleFilterChange("collected_to", e.target.value)
                }
                className="border-blue-200 focus:border-blue-500"
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

export default PhysicalEvidenceFilter
