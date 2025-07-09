import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AddImagesAndVideos from './SceneMediasForm';
import { casesApi } from "@/api/cases";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal";
import SceneMediasTable from './SceneMediasTable';

const caseId = '5f8c92b5-4e20-4c4b-bf3b-08badc4c92a1'; // Thay bằng caseId thực tế
interface Props {
  onOpenDetail?: (data: any, mode?: 'add' | 'view' | 'edit') => void;
}

const ImagesAndVideos = ({ onOpenDetail }: Props) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['scene-info', caseId],
    queryFn: () => casesApi.getSceneInfo(caseId).then(res => res.data),
  });
  console.log("data", data)

  // State for add/view/edit
  const [showAdd, setShowAdd] = useState(false);
  const [editingMedia, setEditingMedia] = useState<any | null>(null);
  const [viewMode, setViewMode] = useState<'add' | 'view' | 'edit'>('add');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState<string|null>(null);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => casesApi.deleteSceneMedia(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scene-info', caseId] });
      setEditingMedia(null);
      setViewMode('add');
      setShowAdd(false);
    },
  });
  const handleDelete = (id: string) => {
    setDeletingId(id);
    setShowDeleteDialog(true);
  };
  const confirmDelete = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId);
    }
    setShowDeleteDialog(false);
    setDeletingId(null);
  };
  // View handler
  const handleRowClick = async (item: any) => {
    const { data: detail } = await casesApi.getSceneMediaById(item.id);
    if (onOpenDetail) {
      onOpenDetail(detail, 'view');
    }
  };

  // Edit handler
  const handleRowEdit = async (item: any) => {
    const { data: detail } = await casesApi.getSceneMediaById(item.id);
    if (onOpenDetail) {
      onOpenDetail(detail, 'edit');
    }
  };

  const handleBack = () => {
    setEditingMedia(null);
    setViewMode('add');
    setShowAdd(false);
  };

  if (showAdd) {
    return (
      <AddImagesAndVideos
        onBack={handleBack}
        onSave={handleBack}
        mode={viewMode}
        data={editingMedia}
        onEdit={() => setViewMode('edit')}
      />
    );
  }

  return (
    <section className="mb-6">
      <div className="bg-white rounded-lg shadow border">
        <div className="flex justify-between items-center bg-[#e9f1fa] px-4 py-2 rounded-t-lg">
          <span className="font-semibold text-lg">IMAGES AND VIDEO</span>
          <button
            className="flex items-center gap-1 px-3 py-1 border rounded text-xs bg-white shadow"
            onClick={() => {
              if (onOpenDetail) {
                onOpenDetail(null, 'add');
              }
            }}
          >
            ADD <span>+</span>
          </button>
        </div>
        <div className="p-4">
          {isLoading ? 'Loading...' : (
            <SceneMediasTable
              data={data?.data?.scene_medias ?? []}
              onEdit={handleRowEdit}
              onDelete={handleDelete}
              onView={handleRowClick}
            />
          )}
        </div>
      </div>
      {showDeleteDialog && (
        <ConfirmDeleteModal
          open={showDeleteDialog}
          title="Are You Sure You Want to Permanently Delete This Media?"
          warningText="This action is irreversible. Deleting this piece of media will result in the permanent loss of all associated data, including its history, handling records, and any linked materials. Please proceed only if you are absolutely certain this evidence should be removed from the system."
          confirmText="Yes, Delete Permanently"
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
        />
      )}
    </section>
  );
}

export default ImagesAndVideos
