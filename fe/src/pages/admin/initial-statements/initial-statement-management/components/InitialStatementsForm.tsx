import React, { useState, useEffect } from "react"
import { uploadFileApi } from "@/api/upload"
import { casesApi } from "@/api/cases"
import { toast } from "react-toastify"
import { useQueryClient } from "@tanstack/react-query"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import { X } from "lucide-react"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { useParams } from "react-router-dom"

type Props = {
  onBack: () => void
  onSave: () => void
  mode: "add" | "view" | "edit"
  data?: any
}
type EvidenceFile = {
  original_name: string
  file_url: string
  resource_type: string
  public_id?: string
}
const AddInitialStatement = ({ onBack, onSave, mode, data }: Props) => {
  const [initialName, setInitialName] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [contact, setContact] = useState("")
  const [role, setRole] = useState("Witness")
  const [statement, setStatement] = useState("")
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  useEffect(() => {
    if (mode === "add") {
      setInitialName("")
      setDate(undefined)
      setContact("")
      setRole("Witness")
      setStatement("")
      setEvidenceFiles([])
    } else if (data) {
      console.log("data 12", data)
      setInitialName(data.provider_name || data.full_name || "")
      setDate(
        data.statement_date ? new Date(data.statement_date) :
        data.created_at ? new Date(data.created_at) :
        undefined
      );
      setContact(data.contact_info || "")
      setRole(
        data.person_role
        ? data.person_role.charAt(0).toUpperCase() + data.person_role.slice(1)
        : data.party_type
        ? data.party_type.charAt(0).toUpperCase() + data.party_type.slice(1)
        : "Witness"
      )
      setStatement(data.statement_content || data.statement || "")
      setEvidenceFiles([
        ...(Array.isArray(data?.evidence_file_path)
          ? data.evidence_file_path
          : data?.evidence_file_path
            ? [data.evidence_file_path]
            : []),
        ...(Array.isArray(data?.attachments_url)
          ? data.attachments_url
          : data?.attachments_url
            ? [data.attachments_url]
            : []),
      ])
    }
  }, [data, mode])

  const isView = mode === "view"
  const isEdit = mode === "edit"
  const isAdd = mode === "add"

  const handleRemoveFile = (public_id: string) => {
    setEvidenceFiles((files) => files.filter((f) => f.public_id !== public_id))
  }

  const handleUploadFiles = async (files: FileList | null) => {
    if (!files) return
    setUploading(true)
    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append("files", file))
    formData.append("folder", "evidence")
    try {
      const res = await uploadFileApi.uploadFileCloudMulti(formData)
      setEvidenceFiles((prev) => [
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

  const { caseId } = useParams<{ caseId: string }>()
  const queryClient = useQueryClient()

  const handleSave = async () => {
    setLoading(true)
    setError(null)
    try {
      const payload = {
        provider_name: initialName,
        statement_date: date ? date.toISOString() : undefined,
        contact_info: contact,
        person_role: role.toLowerCase(),
        statement_content: statement,
        evidence_file_path:
          evidenceFiles.length > 0 ? evidenceFiles : undefined,
        case_id: caseId, 
        recorded_by: "testuser",
      }
      if (isAdd) {
        await casesApi.create(payload)
        toast.success("Created successfully!")
      } else if (isEdit && data?.initial_statements_id) {
        await casesApi.updateInitialStatement(data.initial_statements_id, payload)
        toast.success("Updated successfully!")
      }
      await queryClient.invalidateQueries({ queryKey: ["scene-info", caseId] })
      onSave()
    } catch (err: any) {
      setError(err.message || "Save failed")
      toast.error("An error occurred!")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!(data?.initial_statements_id || data?.parties_id)) return
    try {
      await casesApi.deleteInitialStatement(data.initial_statements_id)
      await casesApi.deleteParty(data.parties_id)
      toast.success("Deleted successfully!")
      await queryClient.invalidateQueries({ queryKey: ["scene-info", caseId] })
      setShowDeleteDialog(false)
      onBack()
    } catch (err) {
      toast.error("Delete failed!")
      setShowDeleteDialog(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow border max-w-3xl mx-auto mt-8 mb-8">
      <div className="bg-[#e9f1fa] px-6 py-4 rounded-t-xl flex justify-between items-center">
        <h2 className="text-center text-xl font-bold text-[#1A2C47] flex-1">
          {isAdd
            ? "ADD INITIAL STATEMENT"
            : isEdit
              ? "EDIT INITIAL STATEMENT"
              : "VIEW INITIAL STATEMENT"}
        </h2>
      </div>
      <div className="p-6">
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {/* Initial information */}
        <div className="mb-6">
          <h3 className="font-semibold mb-4">Initial information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Initial name</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Ms.Merry"
                value={initialName}
                onChange={(e) => setInitialName(e.target.value)}
                disabled={isView}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Date</label>
               <DateTimePicker
                  value={date}
                  onChange={setDate}
                  placeholder="Select collection date and time"
                  className="w-full border rounded px-3 py-2"
                  required
                />
            </div>
            <div>
              <label className="block text-sm mb-1">Contact information</label>
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="+xxxxxxxxxx"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={isView}
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Role</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isView}
              >
                <option>Witness</option>
                <option>Victim</option>
                <option>Suspect</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
        {/* Detailed statement */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Detailed statement</h3>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[80px]"
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            disabled={isView}
          />
        </div>
        {/* Evidence Link */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Evidence Link</h3>
            {!isView && (
              <label className="px-4 py-1 rounded bg-gray-200 border cursor-pointer">
                Upload file
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
            {evidenceFiles.map((file, idx) => (
              <div
                key={file.public_id || idx}
                className="bg-[#f6f7f8] border rounded p-4 w-48 flex flex-col items-center relative"
              >
                <a
                  href={file.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 font-bold mb-1"
                >
                  {file.original_name}
                </a>
                <div className="text-xs text-gray-500 mb-1">
                  {file.resource_type}
                </div>
                {!isView && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file.public_id || "")}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                    title="Xóa file"
                  >
                    <X className="w-2 h-2" />
                  </button>
                )}
              </div>
            ))}
          </div>
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
        title="Are You Sure You Want to Permanently Delete This Statement?"
        warningText="This action is irreversible. Deleting this piece of statement will result in the permanent loss of all associated data, including its history, handling records, and any linked materials. Please proceed only if you are absolutely certain this evidence should be removed from the system."
        confirmText="Yes, Delete Permanently"
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
      />
    </div>
  )
}

export default AddInitialStatement
