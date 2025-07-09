import PhysicalEvidenceForm from "../physical-evidence-management/components/PhysicalEvidenceForm"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { physicalEvidenceApi } from "@/api/physical-evidence"
import type { CreatePhysicalEvidenceData } from "@/types/physical-evidence.interface"
import { toast } from "react-toastify"
import type { ApiError } from "@/types/api.interface"

const PhysicalEvidenceUpdatePage = () => {
  const navigate = useNavigate()
  const params = useParams()
  const queryClient = useQueryClient()
  const evidenceId = params.id as string

  // Fetch single evidence for editing
  const { data: selectedEvidence, isLoading } = useQuery({
    queryKey: ["physical-evidence", evidenceId],
    queryFn: () => physicalEvidenceApi.getEvidenceById(evidenceId),
    enabled: !!evidenceId,
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
      navigate(`/admin/physical-evidences`)
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to update evidence")
    },
  })

  const handleFormSubmit = (data: CreatePhysicalEvidenceData) => {
    updateMutation.mutate({ id: evidenceId, data })
  }

  const handleCancel = () => {
    navigate(`/admin/physical-evidences`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-blue-600">
          Loading evidence for editing...
        </span>
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
            onClick={() => navigate("/admin/physical-evidences")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to List
          </button>
        </div>
      </div>
    )
  }

  return (
    <PhysicalEvidenceForm
      evidence={selectedEvidence.data}
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      isLoading={updateMutation.isPending}
    />
  )
}

export default PhysicalEvidenceUpdatePage
