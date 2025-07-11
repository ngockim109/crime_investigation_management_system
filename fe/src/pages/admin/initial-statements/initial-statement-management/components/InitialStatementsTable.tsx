import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { InitialStatement } from "@/types/initial-statements.interface"
import { formatUUID } from "@/utils/id"
import { Plus, FilePenLine, Trash2, CircleArrowRight } from "lucide-react"

interface InitialStatementsTableProps {
  data: InitialStatement[]
  isLoading: boolean
  onEdit: (item: any) => void
  onDelete: (item: any) => void
  onView: (item: any) => void
  onCreate: () => void
}

function formatDateTime(dateString: string) {
  if (!dateString) return "—"
  const date = new Date(dateString)
  return (
    date.toLocaleDateString("vi-VN") +
    " " +
    date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  )
}

const InitialStatementsTable = ({
  data,
  isLoading,
  onEdit,
  onDelete,
  onView,
  onCreate,
}: InitialStatementsTableProps) => {
  if (isLoading) {
    return (
      <Card className="rounded-md">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-blue-600">Loading media...</span>
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
            Initial Statements
          </CardTitle>
          <Button
            onClick={onCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Statements
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-blue-200 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-2 border w-10">ID</th>
                <th className="p-2 border w-30">Statement Type</th>
                <th className="p-2 border w-52">Provider</th>
                <th className="p-2 border w-25">Date</th>
                <th className="p-2 border w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No statements found
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.initial_statements_id} className="border-b hover:bg-blue-50/50">
                    <td className="p-2 border text-center w-10">{formatUUID(item.initial_statements_id)}</td>
                    <td className="p-2 border w-30">
                    { item.person_role || "—"}
                    </td>
                    <td className="p-2 border w-52">
                      { item.provider_name || "—"}
                    </td>
                    <td className="p-2 border w-25">
                      {formatDateTime(item.statement_date)}
                    </td>
                    <td className="p-2 border text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(item.initial_statements_id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <CircleArrowRight className="h-4 w-4 mr-1" />
                          View details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(item.initial_statements_id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <FilePenLine className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(item.initial_statements_id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  ) 
}

export default InitialStatementsTable
