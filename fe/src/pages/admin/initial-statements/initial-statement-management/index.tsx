
import { useState, useMemo, useEffect, useRef } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { casesApi } from "@/api/cases"
import Pagination from "@/components/pagination"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import { useNavigate, useParams } from "react-router-dom"
import InitialStatementsTable from "./components/InitialStatementsTable"
import InitialStatementsFilter from "./components/InitialStatementsFilter"
import PartiesTable from "./components/PartiesTable"
import { ROUTES, withRouteParams } from "@/utils/route"
import type { InitialStatementFilters } from "@/types/initial-statements.interface"
import { cleanFiltersParties, cleanFiltersStatements } from "@/utils/initial-statements"
import type { PartiesFilters } from "@/types/party.interface"


const InitialStatementManagement = () => {
  const navigate = useNavigate()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<any>(null)
  const queryClient = useQueryClient()
  const {caseId} = useParams()
  
  const [deleteType, setDeleteType] = useState<"initial" | "party" | null>(null);

  const [filters, setFilters] = useState<InitialStatementFilters>({
    page: 1,
    limit: 10,
    case_id: caseId,
    provider_name: "",
    date_from: "",
    date_to: "",
  })
   // Fetch evidence list
  const {
    data: initialStatementsData,
    isLoading,
    refetch: refetchInitialStatements
  } = useQuery({
    queryKey: ["initial-statements", filters],
    queryFn: () =>
      casesApi.getAllInitialStatements(
        cleanFiltersStatements(filters) as Partial<InitialStatementFilters>
      ),
  })

  // Fetch parties list
  const {
    data: partiesData,
    isLoading : isLoadingParties,
    refetch: refetchParties
  } = useQuery({
    queryKey: ["parties", filters],
    queryFn: () =>
      casesApi.getAllPaties(
        cleanFiltersParties(filters) as Partial<PartiesFilters>
      ),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => casesApi.deleteInitialStatement(id),
    onSuccess: () => {
      toast.success("Media deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["initial-statements"] })
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
    const media = initialStatementsData?.data.data.find((m: any) => m.initial_statements_id === id)
    if (media) {
      setMediaToDelete(media)
      setDeleteType("initial");
      setDeleteModalOpen(true)
    }
  }
  
  const handleDeleteParty = (id: string) => {
    const party = partiesData?.data.data.find((p: any) => p.parties_id === id)
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
    setTimeout(() => refetchInitialStatements(), 100)
    setTimeout(() => refetchParties(), 100)
  }

  const handleView = (id: string) => {
    navigate(
      withRouteParams.detail(
        ROUTES.INITIAL_STATEMENTS.replace(":caseId", caseId ?? ""),
        id
      )
    )
  }
  const handleEdit = (id: string) => {
    navigate(
      withRouteParams.update(
        ROUTES.INITIAL_STATEMENTS.replace(":caseId", caseId ?? ""),
        id
      )
    )
  }
  const handleCreate = () => {
    navigate(
      withRouteParams.add(
        ROUTES.INITIAL_STATEMENTS.replace(":caseId", caseId ?? "")
      )
    )
  }
  const handleViewParties = (id: string) => {
    navigate(
      withRouteParams.detail(
        ROUTES.INITIAL_STATEMENTS_PARITES.replace(":caseId", caseId ?? ""),
        id
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-blue-900 uppercase">
          initial statements Management
        </h2>
      </div>
      <InitialStatementsFilter 
        filters={filters} 
        onFiltersChange={setFilters} 
        caseId={caseId}
      />
      
      <InitialStatementsTable
        data={initialStatementsData?.data.data || []}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDeleteInitialStatement}
        onCreate={handleCreate}
      />
      {initialStatementsData?.data && (
        <Pagination
          page={initialStatementsData.data.page}
          totalPages={initialStatementsData.data.totalPages}
          total={initialStatementsData.data.total}
          limit={initialStatementsData.data.limit}
          handleFilterChange={handleFilterChange}
        />
      )}
      <PartiesTable   
        data={partiesData?.data.data || []}
        isLoading={isLoadingParties}
        onView={handleViewParties}
        onDelete={handleDeleteParty}
      />
      {partiesData?.data && (
        <Pagination
          page={partiesData.data.page}
          totalPages={partiesData.data.totalPages}
          total={partiesData.data.total}
          limit={partiesData.data.limit}
          handleFilterChange={handleFilterChange}
        />
      )}
      
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
