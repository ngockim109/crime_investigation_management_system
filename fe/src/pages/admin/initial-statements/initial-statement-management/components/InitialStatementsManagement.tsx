import React, { useState } from "react"
import AddInitialStatement from "../../../initial-statements/initial-statement-management/components/InitialStatementsForm"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

import { casesApi } from "@/api/cases"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal"
import InitialStatementsTable from "../../../initial-statements/initial-statement-management/components/InitialStatementsTable"
import PartiesTable from "../../../initial-statements/initial-statement-management/components/PartiesTable"

type Props = {
  onOpenDetail?: (data: any, mode?: "add" | "view" | "edit") => void
}
const caseId = "5f8c92b5-4e20-4c4b-bf3b-08badc4c92a1" // Thay bằng caseId thực tế

const InitialStatement = ({ onOpenDetail }: Props) => {
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ["scene-info", caseId],
    queryFn: () => casesApi.getSceneInfo(caseId).then((res) => res.data),
  })

  const {
    data: partiesData,
    isLoading: isLoadingParties,
    error: partiesError,
  } = useQuery({
    queryKey: ["parties", caseId],
    queryFn: () => casesApi.getPartiesByCaseId(caseId).then((res) => res.data),
  })
  console.log("partiesData", partiesData)

  /* ---------- STATE ---------- */
  const [showAdd, setShowAdd] = useState(false)
  const [selectedStatement, setSelectedStatement] = useState<any | null>(null)
  const [viewMode, setViewMode] = useState<"add" | "view" | "edit">("add")
  console.log("viewMode:", viewMode)
  const deleteStatementMutation = useMutation({
    mutationFn: (id: string) => casesApi.deleteInitialStatement(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scene-info", caseId] })
      setSelectedStatement(null)
      setViewMode("add")
      setShowAdd(false)
    },
  })
  const deletePartyMutation = useMutation({
    mutationFn: (id: string) => casesApi.deleteParty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parties", caseId] })
    },
  })
  const [deleteType, setDeleteType] = useState<"statement" | "party" | null>(
    null
  )

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setDeletingId(id)
    setDeleteType("statement")
    setShowDeleteDialog(true)
  }
  const handleDeleteParty = (id: string) => {
    setDeletingId(id)
    setDeleteType("party")
    setShowDeleteDialog(true)
  }
  const confirmDelete = () => {
    if (deletingId) {
      if (deleteType === "party") {
        deletePartyMutation.mutate(deletingId)
      } else {
        deleteStatementMutation.mutate(deletingId)
      }
    }
    setShowDeleteDialog(false)
    setDeletingId(null)
    setDeleteType(null)
  }

  /* ---------- HELPER mở form ---------- */
  //  const openStatement = (detail: any, detail_parties: any, mode: 'view' | 'edit') => {
  //   setSelectedStatement({
  //     provider_name: detail.provider_name,
  //     statement_date: detail.statement_date,
  //     contact_info: detail.contact_info,
  //     person_role: detail.person_role,
  //     statement_content: detail.statement_content,
  //     evidence_file_path: detail.evidence_file_path,
  //     case_id: detail.case_id,
  //     id: detail.initial_statements_id,

  //     full_name: detail_parties?.full_name || "",
  //     statement: detail_parties?.statement || "",
  //     type_Party: detail_parties?.type_Party || "",
  //     attachments_url: detail_parties?.attachments_url || "",
  //     created_at: detail_parties?.created_at || "",

  //   });
  //   setViewMode(mode);
  //   setShowAdd(true);
  // };
  /* ---------- XEM ---------- */
  const handleRowClickForStatements = async (item: any) => {
    try {
      const { data: detail } = await casesApi.getInitialStatementById(item.id)
      if (onOpenDetail) {
        onOpenDetail(detail, "view")
      }
    } catch (err) {
      console.error("Error fetching statement details:", err)
    }
  }
  const handleRowClickForParties = async (item: any) => {
    try {
      const { data: detail_parties } = await casesApi.getPartiesById(
        item.parties_id
      )
      if (onOpenDetail) {
        onOpenDetail(detail_parties, "view")
      }
    } catch (err) {
      console.error("Error fetching statement details:", err)
    }
  }

  /* ---------- SỬA ---------- */
  const handleRowEditForStatements = async (item: any) => {
    try {
      const { data: detail } = await casesApi.getInitialStatementById(item.id)
      if (onOpenDetail) {
        onOpenDetail(detail, "edit")
      }
    } catch (err) {
      console.error("Error fetching statement details:", err)
    }
  }
  const handleBack = () => {
    setSelectedStatement(null)
    setViewMode("add")
    setShowAdd(false)
  }
  if (showAdd) {
    return (
      <AddInitialStatement
        onBack={handleBack}
        onSave={handleBack}
        mode={viewMode}
        data={selectedStatement}
        onEdit={() => setViewMode("edit")}
      />
    )
  }
  return (
    <section className="mb-6">
      <div className="bg-white rounded-lg shadow border">
        <div className="flex justify-between items-center bg-[#e9f1fa] px-4 py-2 rounded-t-lg">
          <span className="font-semibold text-lg">INITIAL STATEMENTS</span>
          <button
            className="flex items-center gap-1 px-3 py-1 border rounded text-xs bg-white shadow"
            onClick={() => {
              if (onOpenDetail) {
                onOpenDetail(null, "add")
              }
            }}
          >
            ADD <span>+</span>
          </button>
        </div>
        <div className="p-4">
          {isLoadingParties ? (
            "Loading..."
          ) : partiesError ? (
            <div className="text-red-500">Error loading data</div>
          ) : !Array.isArray(partiesData) || partiesData.length === 0 ? (
            <div className="text-gray-500">No data available</div>
          ) : (
            <PartiesTable
              data={partiesData}
              onDelete={(item) => handleDeleteParty(item.parties_id)}
              onView={handleRowClickForParties}
            />
          )}
        </div>
        <div className="p-4">
          {isLoading ? (
            "Loading..."
          ) : (
            <InitialStatementsTable
              data={data?.data?.initial_statements ?? []}
              onEdit={handleRowEditForStatements}
              onDelete={(item) => handleDelete(item.id)}
              onView={handleRowClickForStatements}
            />
          )}
        </div>
      </div>
      {showDeleteDialog && (
        <ConfirmDeleteModal
          open={showDeleteDialog}
          title="Are You Sure You Want to Permanently Delete This Statement?"
          warningText="This action is irreversible. Deleting this piece of statement will result in the permanent loss of all associated data, including its history, handling records, and any linked materials. Please proceed only if you are absolutely certain this evidence should be removed from the system."
          confirmText="Yes, Delete Permanently"
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
        />
      )}
    </section>
  )
}

export default InitialStatement
