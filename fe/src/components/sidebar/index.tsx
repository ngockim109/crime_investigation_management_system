import { Briefcase, FileText, Home, LogOut, Menu } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  return (
    <div
      className={`min-h-screen flex flex-col bg-white shadow-lg border-r border-gray-200 ${!isSidebarCollapsed && "min-w-64"}`}
    >
      <div className="p-6 border-b border-gray-200">
        {!isSidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>KD</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-gray-600 w-fit">
              KIỂM DUYỆT
            </span>
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hover:bg-gray-100 p-1 rounded"
            >
              <Menu className="h-4 w-4 text-gray-500 cursor-pointer" />
            </button>
          </div>
        )}
        {isSidebarCollapsed && (
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hover:bg-gray-100 p-1 rounded"
          >
            <Menu className="h-4 w-4 text-gray-500 cursor-pointer" />
          </button>
        )}
      </div>

      <nav className="p-4 space-y-2">
        <Link
          to="/admin"
          className={`rounded-md flex gap-3 items-center p-1.5 w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
        >
          <Home className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />
          {!isSidebarCollapsed && "Dashboard"}
        </Link>
        <Link
          to="/admin/reports"
          className={`rounded-md flex gap-3 items-center p-1.5 w-full justify-start bg-blue-50 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold" ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
        >
          <FileText className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />
          {!isSidebarCollapsed && "Reports"}
        </Link>
        <Link
          to="/admin/cases"
          className={`rounded-md flex gap-3 items-center p-1.5 w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50  ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`}
        >
          <Briefcase className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />

          {!isSidebarCollapsed && "Cases"}
        </Link>
      </nav>

      <div className="mt-auto flex justify-center py-3 px-3">
        <Button
          variant="destructive"
          className={`flex gap-3 justify-start text-white cursor-pointer ${!isSidebarCollapsed && "w-full"}`}
        >
          <LogOut className="h-4 w-4" />
          {!isSidebarCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
