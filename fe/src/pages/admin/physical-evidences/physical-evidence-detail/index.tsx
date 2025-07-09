import { toast } from "react-toastify"
import DeleteConfirmationModal from "../physical-evidence-management/components/DeleteConfirmationModal"
import PhysicalEvidenceDetail from "./components/PhysicalEvidenceDetail"
import { physicalEvidenceApi } from "@/api/physical-evidence"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import type { ApiError } from "@/types/api.interface"
import { ROUTES, withRouteParams } from "@/utils/route"

const PhysicalEvidenceDetailPage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const queryClient = useQueryClient()
  const evidenceId = params.id as string

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  // Fetch single evidence
  const { data: selectedEvidence, isLoading } = useQuery({
    queryKey: ["physical-evidence", evidenceId],
    queryFn: () => physicalEvidenceApi.getEvidenceById(evidenceId),
    enabled: !!evidenceId,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: physicalEvidenceApi.deleteEvidence,
    onSuccess: () => {
      toast.success("Physical evidence deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["physical-evidence"] })
      navigate(ROUTES.PHYSICAL_EVIDENCE)
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to delete evidence")
    },
  })

  const handleBack = () => {
    navigate(ROUTES.PHYSICAL_EVIDENCE)
  }

  const handleEdit = () => {
    navigate(withRouteParams.update(ROUTES.PHYSICAL_EVIDENCE, evidenceId))
  }

  const handleDelete = () => {
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(evidenceId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-blue-600">Loading evidence details...</span>
      </div>
    )
  }

  if (!selectedEvidence?.data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Evidence Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested evidence could not be found.
          </p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to List
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <PhysicalEvidenceDetail
        evidence={selectedEvidence.data}
        onBack={handleBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        evidenceCode={selectedEvidence.data.identification_code}
        isLoading={deleteMutation.isPending}
      />
    </>
  )
}

export default PhysicalEvidenceDetailPage
