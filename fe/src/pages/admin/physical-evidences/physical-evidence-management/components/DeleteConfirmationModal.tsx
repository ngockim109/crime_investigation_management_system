import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  evidenceCode: string
  isLoading: boolean
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  evidenceCode,
  isLoading,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Are You Sure You Want to Permanently Delete This Evidence?
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription className="text-sm text-gray-600 space-y-2">
          <p>
            <strong>Warning:</strong> This action is irreversible. Deleting this
            piece of evidence will result in the permanent loss of all
            associated data, including its history, reporting records, and any
            linked materials.
          </p>
          <p>
            Please proceed only if you are absolutely certain this evidence
            should be removed from the system.
          </p>
          <p className="font-medium text-gray-800">
            Evidence to be deleted:{" "}
            <span className="font-mono text-blue-600">{evidenceCode}</span>
          </p>
        </DialogDescription>

        <DialogFooter className="flex gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-600 border-gray-200 hover:bg-gray-50 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : null}
            Yes, Delete Permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteConfirmationModal
