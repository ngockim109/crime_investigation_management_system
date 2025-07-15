import { Outlet } from "react-router-dom"
import Sidebar from "@/components/sidebar"


const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="px-4 py-8 min-h-screen space-y-6 w-full flex flex-col">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
