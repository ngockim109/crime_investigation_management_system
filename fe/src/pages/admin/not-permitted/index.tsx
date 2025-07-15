// src/pages/AccessDenied.tsx

import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const AccessDenied = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700 text-lg mb-6">
        You do not have permission to view this page.
      </p>
      <Button onClick={() => navigate("/")} className="text-sm">
        Go Back Home
      </Button>
    </div>
  )
}

export default AccessDenied
