import { useState } from "react"
import InitialStatement from "./components/InitialStatementsManagement"
import AddInitialStatement from "./components/InitialStatementsForm"

const InitialStatementManagementPage = () => {
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
        <AddInitialStatement
          data={formData}
          mode={formMode}
          onBack={handleCloseForm}
          onSave={handleCloseForm}
          onEdit={() => setFormMode("edit")}
        />
      ) : (
        <InitialStatement onOpenDetail={handleOpenForm} />
      )}
    </div>
  )
}

export default InitialStatementManagementPage
