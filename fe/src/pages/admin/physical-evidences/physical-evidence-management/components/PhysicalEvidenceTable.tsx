import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Trash2, Plus } from "lucide-react"
import type { PhysicalEvidence } from "@/types/physical-evidence.interface"
import { formatDateTime } from "@/utils/physical-evidence"

interface PhysicalEvidenceTableProps {
  evidence: PhysicalEvidence[]
  isLoading: boolean
  onView: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onCreate: () => void
}

const PhysicalEvidenceTable = ({
  evidence,
  isLoading,
  onView,
  onEdit,
  onDelete,
  onCreate,
}: PhysicalEvidenceTableProps) => {
  if (isLoading) {
    return (
      <Card className="rounded-md">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-blue-600">Loading evidence...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-blue-900">
            Preliminary Physical Evidence Information
          </CardTitle>
          <Button
            onClick={onCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Evidence
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-blue-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50">
                <TableHead className="font-semibold text-blue-900">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-blue-900">
                  Location
                </TableHead>
                <TableHead className="font-semibold text-blue-900">
                  Collector
                </TableHead>
                <TableHead className="font-semibold text-blue-900">
                  Time
                </TableHead>
                <TableHead className="font-semibold text-blue-900">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-blue-900 text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evidence.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-gray-500"
                  >
                    No physical evidence found
                  </TableCell>
                </TableRow>
              ) : (
                evidence.map((item) => (
                  <TableRow
                    key={item.physical_evidence_id}
                    className="hover:bg-blue-50/50"
                  >
                    <TableCell className="font-medium text-blue-700">
                      {item.identification_code}
                    </TableCell>
                    <TableCell>{item.scene_location}</TableCell>
                    <TableCell>{item.collector_username || "N/A"}</TableCell>
                    <TableCell>{formatDateTime(item.collected_time)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.is_deleted ? "destructive" : "default"}
                        className={
                          item.is_deleted
                            ? ""
                            : "bg-green-100 text-green-800 hover:bg-green-200"
                        }
                      >
                        {item.is_deleted ? "Deleted" : "Active"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(item.physical_evidence_id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(item.physical_evidence_id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(item.physical_evidence_id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default PhysicalEvidenceTable
