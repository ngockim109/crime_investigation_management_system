import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { physicalEvidenceApi } from "@/api/physical-evidence"
import type {
  PhysicalEvidenceFilters,
  CreatePhysicalEvidenceData,
} from "@/types/physical-evidence.interface"
import { cleanFilters } from "@/utils/physical-evidence"
import Pagination from "@/components/pagination"
import PhysicalEvidenceFilter from "./components/PhysicalEvidenceFilter"
import PhysicalEvidenceTable from "./components/PhysicalEvidenceTable"
import PhysicalEvidenceDetail from "../physical-evidence-detail"
import PhysicalEvidenceForm from "./components/PhysicalEvidenceForm"
import DeleteConfirmationModal from "./components/DeleteConfirmationModal"

type ViewMode = "list" | "detail" | "create" | "edit"

const PhysicalEvidenceManagement = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(
    null
  )
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
    queryFn: () => physicalEvidenceApi.getAllEvidence(cleanFilters(filters)),
  })

  // Fetch single evidence for detail/edit view
  const { data: selectedEvidence, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["physical-evidence", selectedEvidenceId],
    queryFn: () => physicalEvidenceApi.getEvidenceById(selectedEvidenceId!),
    enabled:
      !!selectedEvidenceId && (viewMode === "detail" || viewMode === "edit"),
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: physicalEvidenceApi.createEvidence,
    onSuccess: () => {
      toast.success("Physical evidence created successfully!")
      queryClient.invalidateQueries({ queryKey: ["physical-evidence"] })
      setViewMode("list")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create evidence")
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string
      data: CreatePhysicalEvidenceData
    }) => physicalEvidenceApi.updateEvidence(id, data),
    onSuccess: () => {
      toast.success("Physical evidence updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["physical-evidence"] })
      setViewMode("detail")
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update evidence")
    },
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
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete evidence")
    },
  })

  // Event handlers
  const handleView = (id: string) => {
    setSelectedEvidenceId(id)
    setViewMode("detail")
  }

  const handleEdit = (id: string) => {
    setSelectedEvidenceId(id)
    setViewMode("edit")
  }

  const handleDelete = (id: string) => {
    const evidence = evidenceData?.data.data.find(
      (e) => e.physical_evidence_id === id
    )
    if (evidence) {
      setEvidenceToDelete({ id, code: evidence.identification_code })
      setDeleteModalOpen(true)
    }
  }

  const handleCreate = () => {
    setSelectedEvidenceId(null)
    setViewMode("create")
  }

  const handleFormSubmit = (data: CreatePhysicalEvidenceData) => {
    if (viewMode === "create") {
      createMutation.mutate(data)
    } else if (viewMode === "edit" && selectedEvidenceId) {
      updateMutation.mutate({ id: selectedEvidenceId, data })
    }
  }

  const handleDeleteConfirm = () => {
    if (evidenceToDelete) {
      deleteMutation.mutate(evidenceToDelete.id)
    }
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedEvidenceId(null)
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

  // Render based on view mode
  if (viewMode === "detail" && selectedEvidence?.data) {
    return (
      <PhysicalEvidenceDetail
        evidence={selectedEvidence.data}
        onBack={handleBackToList}
        onEdit={() => setViewMode("edit")}
        onDelete={() =>
          handleDelete(selectedEvidence.data.physical_evidence_id)
        }
      />
    )
  }

  if (viewMode === "create" || viewMode === "edit") {
    return (
      <PhysicalEvidenceForm
        evidence={viewMode === "edit" ? selectedEvidence?.data : undefined}
        onSubmit={handleFormSubmit}
        onCancel={handleBackToList}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    )
  }

  // Default list view
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-900">
          Physical Evidence Management
        </h1>
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
