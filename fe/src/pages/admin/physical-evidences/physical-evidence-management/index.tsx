import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { physicalEvidenceApi } from "@/api/physical-evidence"
import type { PhysicalEvidenceFilters } from "@/types/physical-evidence.interface"
import { cleanFilters } from "@/utils/physical-evidence"
import Pagination from "@/components/pagination"
import PhysicalEvidenceFilter from "./components/PhysicalEvidenceFilter"
import PhysicalEvidenceTable from "./components/PhysicalEvidenceTable"
import DeleteConfirmationModal from "./components/DeleteConfirmationModal"
import type { ApiError } from "@/types/api.interface"
import { useNavigate } from "react-router-dom"
import { ROUTES, withRouteParams } from "@/utils/route"

type ViewMode = "list" | "detail" | "create" | "edit"

const PhysicalEvidenceManagement = () => {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [evidenceToDelete, setEvidenceToDelete] = useState<{
    id: string
    code: string
  } | null>(null)

  const [filters, setFilters] = useState<PhysicalEvidenceFilters>({
    page: 1,
    limit: 10,
    identification_code: "",
    scene_location: "",
    collector_username: "",
    case_id: "",
    collected_from: "",
    collected_to: "",
  })

  const queryClient = useQueryClient()

  // Fetch evidence list
  const {
    data: evidenceData,
    isLoading: isLoadingList,
    refetch,
  } = useQuery({
    queryKey: ["physical-evidence", filters],
    queryFn: () =>
      physicalEvidenceApi.getAllEvidence(
        cleanFilters(filters) as Partial<PhysicalEvidenceFilters>
      ),
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: physicalEvidenceApi.deleteEvidence,
    onSuccess: () => {
      toast.success("Physical evidence deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["physical-evidence"] })
      setDeleteModalOpen(false)
      setEvidenceToDelete(null)
      if (viewMode === "detail") {
        setViewMode("list")
      }
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to delete evidence")
    },
  })

  const handleDelete = (id: string) => {
    const evidence = evidenceData?.data.data.find(
      (e) => e.physical_evidence_id === id
    )
    if (evidence) {
      setEvidenceToDelete({ id, code: evidence.identification_code })
      setDeleteModalOpen(true)
    }
  }

  const handleDeleteConfirm = () => {
    if (evidenceToDelete) {
      deleteMutation.mutate(evidenceToDelete.id)
    }
  }

  const handleFilterChange = (
    key: keyof PhysicalEvidenceFilters,
    value: unknown
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))

    setTimeout(() => refetch(), 100)
  }

  const handleView = (id: string) => {
    navigate(withRouteParams.detail(ROUTES.PHYSICAL_EVIDENCE, id))
  }

  const handleEdit = (id: string) => {
    navigate(withRouteParams.update(ROUTES.PHYSICAL_EVIDENCE, id))
  }
  const handleCreate = () => {
    navigate(withRouteParams.add(ROUTES.PHYSICAL_EVIDENCE))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-blue-900 uppercase">
          Preliminary Physical Evidence Management
        </h2>
      </div>

      <PhysicalEvidenceFilter filters={filters} onFiltersChange={setFilters} />

      <PhysicalEvidenceTable
        evidence={evidenceData?.data.data || []}
        isLoading={isLoadingList}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />

      {evidenceData?.data && (
        <Pagination
          page={evidenceData.data.page}
          totalPages={evidenceData.data.totalPages}
          total={evidenceData.data.total}
          limit={evidenceData.data.limit}
          handleFilterChange={handleFilterChange}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setEvidenceToDelete(null)
        }}
        onConfirm={handleDeleteConfirm}
        evidenceCode={evidenceToDelete?.code || ""}
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}

export default PhysicalEvidenceManagement
