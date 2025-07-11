import React, { useState, useEffect, use } from "react"
import { uploadFileApi } from "@/api/upload"
import { casesApi } from "@/api/cases"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import { CloudUpload, Loader2 } from "lucide-react"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usersApi } from "@/api/user"
import type { User } from "@/types/user.interface"
import { useParams } from "react-router-dom"

type Props = {
  onBack: () => void
  onSave: () => void
  data?: any
  mode: "add" | "view" | "edit"
  onEdit?: () => void
}

type SceneMediaFile = {
  original_name: string
  file_url: string
  resource_type: string
  public_id?: string
}

const SceneMediasForm = ({ onBack, onSave, data, mode, onEdit }: Props) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [capturedBy, setCapturedBy] = useState("")
  const [sceneSketchFiles, setSceneSketchFiles] = useState<SceneMediaFile[]>(
    data?.scene_media_file
      ? Array.isArray(data.scene_media_file)
        ? data.scene_media_file
        : [data.scene_media_file]
      : []
  )
  const [sceneMediaDescription, setSceneMediaDescription] = useState(
    data?.scene_media_description || ""
  )
  const [uploading, setUploading] = useState(false)
  const [errors, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const {caseId} = useParams<{ caseId: string }>()
  const queryClient = useQueryClient()

  // Fetch users on component mount
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoadingUsers(true)
  //       const usersResponse = await usersApi.getAllUsers()
  //       setUsers(usersResponse.data)
  //     } catch (error) {
  //       console.error("Error fetching users:", error)
  //     } finally {
  //       setLoadingUsers(false)
  //     }

  //   }

  //   fetchData()
  // }, [])
  
  useEffect(() => {
    if (mode === "add") {
      setDate(undefined)
      setCapturedBy("")
      setSceneMediaDescription("")
      setSceneSketchFiles([])
    } else if (data) {
      setDate(
        data.date_taken ? new Date(data.date_taken) :
        undefined
      );
      setSceneMediaDescription(data.scene_media_description || "")
      setCapturedBy(data.captured_by || "")
      setSceneSketchFiles(
        data.scene_media_file
          ? Array.isArray(data.scene_media_file)
            ? data.scene_media_file
            : [data.scene_media_file]
          : []
      )
    }
  }, [data, mode])

  const isView = mode === "view"
  const isEdit = mode === "edit"
  const isAdd = mode === "add"

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files) return
    setUploading(true)
    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append("files", file))
    formData.append("folder", "evidence")
    try {
      const res = await uploadFileApi.uploadFileCloudMulti(formData)
      setSceneSketchFiles((prev) => [
        ...prev,
        ...Array.from(files).map((file, index) => ({
          original_name: file.name,
          file_url: res.data[index]?.file_url || "",
          public_id: String(res.data[index]?.public_id || ""),
          resource_type: res.data[index]?.resource_type || "",
        })),
      ])
    } catch (err) {
      setError("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setUploading(true)
    try {
      const payload = {
        date_taken: date ? date.toISOString() : undefined,
        scene_media_description: sceneMediaDescription,
        scene_media_file: sceneSketchFiles || undefined,
        case_id: caseId,
        captured_by: capturedBy,
      }
      if (isAdd) {
        await casesApi.createSceneMedia(payload)
        toast.success("Created successfully!")
      } else if (isEdit && data?.scene_media_id) {
        await casesApi.updateSceneMedia(data.scene_media_id, payload)
        toast.success("Updated successfully!")
      }
      await queryClient.invalidateQueries({ queryKey: ["scene-info", caseId] })
      onSave()
    } catch (err: any) {
      setError(err.message || "Save failed")
      toast.error("Có lỗi xảy ra!")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!data?.id && !data?.scene_media_id) return
    try {
      await casesApi.deleteSceneMedia(data.id || data.scene_media_id)
      toast.success("Xóa thành công!")
      await queryClient.invalidateQueries({ queryKey: ["scene-info", caseId] })
      setShowDeleteDialog(false)
      onBack()
    } catch (err) {
      toast.error("Xóa thất bại!")
      setShowDeleteDialog(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow border max-w-3xl mx-auto mt-8 mb-8">
      <div className="bg-[#e9f1fa] px-6 py-4 rounded-t-xl flex justify-between items-center">
        <h2 className="text-center text-xl font-bold text-[#1A2C47] flex-1">
          {isAdd
            ? "ADD IMAGES AND VIDEO"
            : isEdit
              ? "EDIT IMAGES AND VIDEO"
              : "VIEW IMAGES AND VIDEO"}
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {/* DATE TAKEN */}
        <div className="flex items-center w-full mb-2">
          <label className="block text-sm font-semibold mr-4 flex-1">
            DATE TAKEN
          </label>
          <DateTimePicker
            value={date}
            onChange={setDate}
            placeholder="Select collection date and time"
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* SCENE SKETCH */}
        <div className="bg-gray-50 rounded-lg p-4 border mb-2">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-semibold">SCENE SKETCH</label>
            {!isView && (
              <label className="px-4 py-1 rounded bg-gray-200 border cursor-pointer flex items-center gap-2">
                <span>UPLOAD</span>
                <CloudUpload />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUploadFiles(e.target.files)}
                  disabled={uploading}
                />
              </label>
            )}
          </div>
          <div className="flex gap-4 flex-wrap">
            {sceneSketchFiles.map((file, idx) => (
              <div
                key={idx}
                className="relative border-2 border-dashed rounded-lg p-4 w-48 h-40 flex flex-col items-center justify-center bg-[#fafbfc]"
              >
                {/* Nút xóa */}
                {!isView && (
                  <button
                    className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500"
                    onClick={() =>
                      setSceneSketchFiles((files) =>
                        files.filter((_, i) => i !== idx)
                      )
                    }
                  >
                    ×
                  </button>
                )}
                {/* Icon cloud */}
                <div className="text-4xl text-blue-400 mb-2">
                  <CloudUpload />
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  Drag & drop files or{" "}
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline cursor-pointer"
                  >
                    Browse
                  </a>
                </div>
                <div className="text-xs text-gray-700 break-all text-center">
                  {file.original_name}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="mb-2">
          <label className="block text-sm font-semibold mb-1">
            DESCRIPTION
          </label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-50 focus:bg-white focus:border-blue-400 transition"
            value={sceneMediaDescription}
            onChange={(e) => setSceneMediaDescription(e.target.value)}
            disabled={isView}
          />
        </div>
        {/* CAPTURED BY */}
        <div className="mb-2">
          <label className="block text-sm font-semibold mb-1">
            CAPTURED BY
          </label>
          <input
            className="w-full border rounded px-3 py-2 bg-gray-50 focus:bg-white focus:border-blue-400 transition"
            value={capturedBy}
            onChange={(e) => setCapturedBy(e.target.value)}
            disabled={isView}
          />
          {/* <Select
            value={capturedBy}
            onValueChange={setCapturedBy}
          >
            <SelectTrigger
              className={`w-full border-blue-200 focus-visible:border-blue-500 focus-visible:ring-blue-100 focus:border-blue-500 }`}
            >
              <SelectValue
                placeholder={
                  loadingUsers ? "Loading users..." : "Select a collector"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {loadingUsers ? (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Loading users...</span>
                </div>
              ) : (
                <>
                  <SelectItem value="none">
                    No collector selected
                  </SelectItem>
                  {users?.map((user) => (
                    <SelectItem
                      key={user.user_name}
                      value={user.user_name}
                    >
                      {user.user_name}
                    </SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select> */}
        </div>
        {/* Bottom Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            className="px-6 py-2 rounded bg-gray-300 text-black cursor-pointer"
            onClick={onBack}
          >
            Back
          </button>
          {(isEdit || isAdd) && (
            <button
              className={`px-6 py-2 rounded bg-blue-600 text-white ${
                uploading ? "" : "cursor-pointer"
              }`}
              onClick={handleSave}
              disabled={uploading}
            >
              {uploading ? "Saving..." : "Save"}
            </button>
          )}
          {isView && onEdit && data?.initial_statements_id &&(
            <button
              className="px-6 py-2 rounded bg-blue-600 text-white cursor-pointer"
              onClick={onEdit}
            >
              Edit
            </button>
          )}
          {isView && (
            <button
              className="px-6 py-2 rounded bg-red-600 text-white cursor-pointer"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <ConfirmDeleteModal
        open={showDeleteDialog}
        title="Are You Sure You Want to Permanently Delete This Media?"
        warningText="This action is irreversible. Deleting this piece of media will result in the permanent loss of all associated data, including its history, handling records, and any linked materials. Please proceed only if you are absolutely certain this evidence should be removed from the system."
        confirmText="Yes, Delete Permanently"
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default SceneMediasForm
