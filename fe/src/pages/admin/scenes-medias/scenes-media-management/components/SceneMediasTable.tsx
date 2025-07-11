import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, FilePenLine, Trash2, CircleArrowRight } from "lucide-react"

interface SceneMediasTableProps {
  data: any[]
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

const SceneMediasTable = ({
  data,
  isLoading,
  onEdit,
  onDelete,
  onView,
  onCreate,
}: SceneMediasTableProps) => {
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
            Images and Videos
          </CardTitle>
          <Button
            onClick={onCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Media
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-blue-200 overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-blue-50">
                <th className="p-2 border w-10">#</th>
                <th className="p-2 border w-30">Video or Image</th>
                <th className="p-2 border w-52">Description</th>
                <th className="p-2 border w-25">Date</th>
                <th className="p-2 border w-28 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No media found
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.scene_media_id} className="border-b hover:bg-blue-50/50">
                    <td className="p-2 border text-center w-10">{idx + 1}</td>
                    <td className="p-2 border w-30">
                      {Array.isArray(item.scene_media_file) &&
                      item.scene_media_file.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {item.scene_media_file.map((file: any, fileIdx: number) =>
                            file.file_url ? (
                              <a
                                key={fileIdx}
                                href={file.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block truncate overflow-hidden whitespace-nowrap max-w-[8rem] text-blue-600 underline hover:text-blue-800"
                                title={file.original_name}
                              >
                                {file.original_name}
                              </a>
                            ) : (
                              <span key={fileIdx} className="text-gray-400">
                                —
                              </span>
                            )
                          )}
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-2 border w-52">
                      {item.scene_media_description || "—"}
                    </td>
                    <td className="p-2 border w-25">
                      {formatDateTime(item.date_taken)}
                    </td>
                    <td className="p-2 border text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onView(item.scene_media_id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <CircleArrowRight className="h-4 w-4 mr-1" />
                          View details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(item.scene_media_id)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <FilePenLine className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(item.scene_media_id)}
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

export default SceneMediasTable
