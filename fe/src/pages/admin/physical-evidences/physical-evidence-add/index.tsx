import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { physicalEvidenceApi } from "@/api/physical-evidence"
import type { CreatePhysicalEvidenceData } from "@/types/physical-evidence.interface"
import PhysicalEvidenceForm from "../physical-evidence-management/components/PhysicalEvidenceForm"
import { useNavigate, useParams } from "react-router-dom"
import type { ApiError } from "@/types/api.interface"
import { ROUTES } from "@/utils/route"

const PhysicalEvidenceAddPage = () => {
  const { caseId } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Create mutation
  const createMutation = useMutation({
    mutationFn: physicalEvidenceApi.createEvidence,
    onSuccess: () => {
      toast.success("Physical evidence created successfully!")
      queryClient.invalidateQueries({ queryKey: ["physical-evidence"] })
      navigate(ROUTES.PHYSICAL_EVIDENCE.replace(":caseId", caseId ?? ""))
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to create evidence")
    },
  })

  const handleFormSubmit = (data: CreatePhysicalEvidenceData) => {
    createMutation.mutate(data)
  }

  const handleCancel = () => {
    navigate(ROUTES.PHYSICAL_EVIDENCE.replace(":caseId", caseId ?? ""))
  }

  return (
    <PhysicalEvidenceForm
      onSubmit={handleFormSubmit}
      onCancel={handleCancel}
      isLoading={createMutation.isPending}
      caseId={caseId}
    />
  )
}

export default PhysicalEvidenceAddPage
