import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { casesApi } from "@/api/cases"
import Pagination from "@/components/pagination"
import SceneMediasTable from "./components/SceneMediasTable"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import { useNavigate } from "react-router-dom"
import SceneMediasFilter from "./components/SceneMediasFilter"

const caseId = '5f8c92b5-4e20-4c4b-bf3b-08badc4c92a1'; // Thay bằng caseId thực tế

const defaultFilters = {
  page: 1,
  limit: 10,
  date_from: "",
  date_to: "",
}

const SceneMediasManagement = () => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState(defaultFilters)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<any>(null)
  const queryClient = useQueryClient()

  const { 
    data: SceneMediasData,
    isLoading,
     refetch } = useQuery({
    queryKey: ["scene-medias", filters],
    queryFn: () => casesApi.getSceneMediaByCaseId({ ...filters, case_id: caseId }),
  })
  
  console.log("medias", SceneMediasData)
  const deleteMutation = useMutation({
    mutationFn: (id: string) => casesApi.deleteSceneMedia(id),
    onSuccess: () => {
      toast.success("Media deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["scene-medias"] })
      setDeleteModalOpen(false)
      setMediaToDelete(null)
    },
    onError: () => {
      toast.error("Failed to delete media!")
    },
  })

  const handleDelete = (id: string) => {
    const media = SceneMediasData?.data.find((m: any) => m.scene_media_id === id)
    if (media) {
      setMediaToDelete(media)
      setDeleteModalOpen(true)
    }
  }

  const handleDeleteConfirm = () => {
    if (mediaToDelete) {
      deleteMutation.mutate(mediaToDelete.scene_media_id)
    }
  }

  const handleFilterChange = (key: string | number, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key as string]: value,
    }))
    setTimeout(() => refetch(), 100)
  }

  const handleView = (id: string) => {
    navigate(`/admin/case/scene-information/scene-medias/${id}`)
  }
  const handleEdit = (id: string) => {
    navigate(`/admin/case/scene-information/scene-medias/update/${id}`)
  }
  const handleCreate = () => {
    navigate(`/admin/case/scene-information/scene-medias/add`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-blue-900 uppercase">
          Images and Videos Management
        </h2>
      </div>
      <SceneMediasFilter filters={filters} onFiltersChange={setFilters} />
      <SceneMediasTable
        data={SceneMediasData?.data || []}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
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

export default SceneMediasManagement
