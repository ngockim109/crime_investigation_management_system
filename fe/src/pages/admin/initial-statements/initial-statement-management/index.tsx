
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { casesApi } from "@/api/cases"
import Pagination from "@/components/pagination"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import { useNavigate } from "react-router-dom"
import InitialStatementsTable from "./components/InitialStatementsTable"
import InitialStatementsFilter from "./components/InitialStatementsFilter"
import PartiesTable from "./components/PartiesTable"

const caseId = '5f8c92b5-4e20-4c4b-bf3b-08badc4c92a1'; // Thay bằng caseId thực tế

const defaultFilters = {
  page: 1,
  limit: 10,
  captured_by: "",
  date_from: "",
  date_to: "",
}

const InitialStatementManagement = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(defaultFilters)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<any>(null)
  const queryClient = useQueryClient()
  const [deleteType, setDeleteType] = useState<"initial" | "party" | null>(null);
  const {
    data: initialStatementsData,
    isLoading,
     refetch } = useQuery({
    queryKey: ["initial_statements", filters],
    queryFn: () => casesApi.getInitialStatementByCaseId({ ...filters, case_id: caseId }),
  })
  console.log("initial", initialStatementsData)

  const {
    data: partiesData,
    isLoading: isLoadingParties
  } = useQuery({
    queryKey: ["parties", filters],
    queryFn: () => casesApi.getPartiesByCaseId({ ...filters, case_id: caseId }),
  })
  console.log("data party", partiesData)

  const deleteMutation = useMutation({
    mutationFn: (id: string) => casesApi.deleteInitialStatement(id),
    onSuccess: () => {
      toast.success("Media deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["initial_statements"] })
      setDeleteModalOpen(false)
      setMediaToDelete(null)
    },
    onError: () => {
      toast.error("Failed to delete media!")
    },
  })
  const deletePartyMutation = useMutation({
    mutationFn: (id: string) => casesApi.deleteParty(id),
    onSuccess: () => {
      toast.success("Parties deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["parties"] })
      setDeleteModalOpen(false)
      setMediaToDelete(null)
    },
    onError: () => {
      toast.error("Failed to delete media!")
    },
  })

  const handleDeleteInitialStatement = (id: string) => {
   
    const media = initialStatementsData?.data.find((m: any) => m.initial_statements_id === id)
    if (media) {
      setMediaToDelete(media)
      setDeleteType("initial");
      setDeleteModalOpen(true)
    }
  }
  
  const handleDeleteParty = (id: string) => {
    const party = partiesData?.data.find((p: any) => p.parties_id === id)
    if (party) {
      setMediaToDelete(party)
      setDeleteType("party");
      setDeleteModalOpen(true)
    }
  }

  const handleDeleteConfirm = () => {
    if (mediaToDelete && deleteType) {
      if (deleteType === "initial") {
        deleteMutation.mutate(mediaToDelete.initial_statements_id);
      } else if (deleteType === "party") {
        deletePartyMutation.mutate(mediaToDelete.parties_id);
      }
    }
  };

  const handleFilterChange = (key: string | number, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key as string]: value,
    }))
    setTimeout(() => refetch(), 100)
  }

  const handleView = (id: string) => {
    navigate(`/admin/case/scene-information/initial-statements/${id}`)
  }
  const handleEdit = (id: string) => {
    navigate(`/admin/case/scene-information/initial-statements/update/${id}`)
  }
  const handleCreate = () => {
    navigate(`/admin/case/scene-information/initial-statements/add`)
  }
  const handleViewParties = (id: string) => {
    navigate(`/admin/case/scene-information/initial-statements/parties/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-blue-900 uppercase">
          initial statements Management
        </h2>
      </div>
      <InitialStatementsFilter filters={filters} onFiltersChange={setFilters} />
      
      <InitialStatementsTable
        data={initialStatementsData?.data || []}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteInitialStatement}
        onCreate={handleCreate}
      />
      <PartiesTable   
        data={partiesData?.data || []}
        isLoading={isLoadingParties}
        onView={handleViewParties}
        onDelete={handleDeleteParty}
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        title="Are You Sure You Want to Permanently Delete This Media?"
        warningText="This action is irreversible. Deleting this piece of media will result in the permanent loss of all associated data, including its history, handling records, and any linked materials. Please proceed only if you are absolutely certain this evidence should be removed from the system."
        confirmText="Yes, Delete Permanently"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
export default InitialStatementManagement;
