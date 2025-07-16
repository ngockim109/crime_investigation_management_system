import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface PaginationProps<T> {
  handleFilterChange: (key: keyof T, value: unknown) => void
  page: number
  limit: number
  total: number
  totalPages: number
}
const Pagination = <T,>({
  handleFilterChange,
  page,
  limit,
  total,
  totalPages,
}: PaginationProps<T>) => {
  return (
    <div className="flex flex-col items-center justify-between px-6 pt-4 gap-3">
      <div className="text-sm text-gray-300">
        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of{" "}
        {total} results
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            handleFilterChange("page" as keyof T, Math.max(1, page - 1))
          }
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = i + 1
            return (
              <Button
                key={pageNum}
                variant={pageNum === page ? "default" : "secondary"}
                size="sm"
                onClick={() => handleFilterChange("page" as keyof T, pageNum)}
                className="w-8 h-8 p-0 cursor-pointer"
              >
                {pageNum}
              </Button>
            )
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer"
          onClick={() =>
            handleFilterChange(
              "page" as keyof T,
              Math.min(totalPages, page + 1)
            )
          }
          disabled={page === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
