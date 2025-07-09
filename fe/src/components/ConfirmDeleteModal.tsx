import React from "react";

type Props = {
  open: boolean;
  title?: string;
  warningText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal = ({
  open,
  title = "Are You Sure You Want to Permanently Delete?",
  warningText = "This action is irreversible. Deleting this item will result in the permanent loss of all associated data, including its history, handling records, and any linked materials. Please proceed only if you are absolutely certain this evidence should be removed from the system.",
  confirmText = "Yes, Delete Permanently",
  onCancel,
  onConfirm,
}: Props) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] bg-black/20 z-50">
      <div className="bg-white rounded-md shadow-lg px-6 py-8 w-[600px] border border-gray-300">
        <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
        <p className="text-sm text-gray-700 mb-6 text-center leading-relaxed">
          <span className="font-semibold text-red-600">Warning:</span> {warningText}
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-5 py-2 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-100 font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-medium"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal; 