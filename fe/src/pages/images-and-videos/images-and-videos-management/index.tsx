import ImagesAndVideos from "@/pages/images-and-videos/images-and-videos-management/components/ImagesAndVideos"
import AddImagesAndVideos from "@/pages/images-and-videos/images-and-videos-management/components/SceneMediasForm"
import { useState } from "react"

const ImagesAndVideosManagementPage = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const [formMode, setFormMode] = useState<"add" | "view" | "edit">("view")

  const handleOpenForm = (
    data: any,
    mode: "add" | "view" | "edit" = "view"
  ) => {
    setFormData(data)
    setFormMode(mode)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setFormData(null)
  }

  return (
    <div>
      {showForm ? (
        <AddImagesAndVideos
          data={formData}
          mode={formMode}
          onBack={handleCloseForm}
          onSave={handleCloseForm}
          onEdit={() => setFormMode("edit")}
        />
      ) : (
        <ImagesAndVideos onOpenDetail={handleOpenForm} />
      )}
    </div>
  )
}

export default ImagesAndVideosManagementPage
