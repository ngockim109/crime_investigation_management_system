import { CircleArrowRight, FilePenLine, Trash2 } from "lucide-react"

interface SceneMediasTableProps {
  data: any[]
  onEdit: (item: any) => void
  onDelete: (item: any) => void
  onView: (item: any) => void
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
  onEdit,
  onDelete,
  onView,
}: SceneMediasTableProps) => (
  <table className="w-full text-sm border border-gray-200">
    <thead>
      <tr className="bg-gray-100">
        <th className="p-2 border w-10">#</th>
        <th className="p-2 border w-30">Video or Image</th>
        <th className="p-2 border w-52">Description</th>
        <th className="p-2 border w-25">Date</th>
        <th className="p-2 border w-28"></th>
      </tr>
    </thead>
    <tbody>
      {(data ?? []).map((item, idx) => (
        <tr key={item.id} className="border-b">
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
            {item.description || item.scene_media_description || "—"}
          </td>
          <td className="p-2 border w-25">
            {formatDateTime(item.date || item.date_taken)}
          </td>
          <td className="p-2 border flex gap-2 justify-center">
            <button
              className="cursor-pointer group rounded-full border border-gray-300 p-2 bg-white hover:bg-blue-100 transition-colors duration-150 flex items-center justify-center"
              title="Edit"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(item)
              }}
            >
              <FilePenLine
                size={16}
                className="text-gray-500 group-hover:text-blue-600 transition-colors duration-150"
              />
            </button>
            <button
              className="cursor-pointer group rounded-full border border-gray-300 p-2 bg-white hover:bg-red-100 transition-colors duration-150 flex items-center justify-center"
              title="Delete"
              onClick={(e) => {
                e.stopPropagation()
                onDelete(item)
              }}
            >
              <Trash2
                size={16}
                className="text-gray-500 group-hover:text-red-600 transition-colors duration-150"
              />
            </button>
            <button
              className="cursor-pointer group rounded-full border border-gray-300 p-2 bg-white hover:bg-green-100 transition-colors duration-150 flex items-center justify-center"
              title="View Detail"
              onClick={(e) => {
                e.stopPropagation()
                onView(item)
              }}
            >
              <CircleArrowRight
                size={16}
                className="text-gray-500 group-hover:text-green-600 transition-colors duration-150"
              />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

export default SceneMediasTable
