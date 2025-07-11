import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { casesApi } from "@/api/cases"
import Pagination from "@/components/pagination"
import SceneMediasTable from "./components/SceneMediasTable"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import { useNavigate, useParams } from "react-router-dom"
import SceneMediasFilter from "./components/SceneMediasFilter"
import { ROUTES, withRouteParams } from "@/utils/route"
import type { SceneMediaFilters } from "@/types/scene-medias.interface"
import { cleanFilters } from "@/utils/scene-medias"

const SceneMediasManagement = () => {
  const navigate = useNavigate()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<any>(null)
  const { caseId } = useParams()
  const queryClient = useQueryClient()

  const [filters, setFilters] = useState<SceneMediaFilters>({
    page: 1,
    limit: 10,
    case_id: caseId,
    date_from: "",
    date_to: "",
  })
   // Fetch evidence list
  const {
    data: SceneMediasData,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["scene-medias", filters],
    queryFn: () =>
      casesApi.getAllSceneMedia(
        cleanFilters(filters) as Partial<SceneMediaFilters>
      ),
  })
  
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
    const media = SceneMediasData?.data.data.find((m: any) => m.scene_media_id === id)
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
    navigate(
      withRouteParams.detail(
        ROUTES.IMAGES_VIDEOS.replace(":caseId", caseId ?? ""),
        id
      )
    )
  }
  const handleEdit = (id: string) => {
    navigate(
      withRouteParams.update(
        ROUTES.IMAGES_VIDEOS.replace(":caseId", caseId ?? ""),
        id
      )
    )
  }
  const handleCreate = () => {
    navigate(
      withRouteParams.add(
        ROUTES.IMAGES_VIDEOS.replace(":caseId", caseId ?? "")
      )
    )
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
        data={SceneMediasData?.data.data || []}
        isLoading={isLoading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
      {SceneMediasData?.data && (
        <Pagination
          page={SceneMediasData.data.page}
          totalPages={SceneMediasData.data.totalPages}
          total={SceneMediasData.data.total}
          limit={SceneMediasData.data.limit}
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

export default SceneMediasManagement
