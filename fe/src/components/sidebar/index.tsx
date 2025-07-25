import { Briefcase, FileText, Home, LogOut, Menu, User, PersonStanding, ShieldAlert } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

const Sidebar = () => {
  const navigate = useNavigate()
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const pending = `rounded-md flex gap-3 items-center p-1.5 w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50 ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`
  const acive = `rounded-md flex gap-3 items-center p-1.5 w-full justify-start bg-blue-50 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold" ${isSidebarCollapsed ? "justify-center px-2" : "justify-start"}`

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("persist:root");
    navigate("/auth")
  }
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
              Moderator
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
        <NavLink
          end
          to="/admin"
          className={({ isActive, isPending }) =>
            isPending ? `${pending}` : isActive ? `${acive}` : `${pending}`
          }>
          <Home className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />
          {!isSidebarCollapsed && "Dashboard"}
        </NavLink>
        <NavLink
          to="/admin/reports"
          className={({ isActive, isPending }) =>
            isPending ? `${pending}` : isActive ? `${acive}` : `${pending}`
          }>
          <FileText className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />
          {!isSidebarCollapsed && "Reports"}
        </NavLink>
        <NavLink
          to="/admin/user"
          className={({ isActive, isPending }) =>
            isPending ? `${pending}` : isActive ? `${acive}` : `${pending}`
          }>
          <User className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />
          {!isSidebarCollapsed && "User"}
        </NavLink>
        <NavLink
          to="/admin/cases"
          className={({ isActive, isPending }) =>
            isPending ? `${pending}` : isActive ? `${acive}` : `${pending}`
          }>
          <Briefcase className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />

          {!isSidebarCollapsed && "Cases"}
        </NavLink>
        <NavLink
          to="/admin/roles"
          className={({ isActive, isPending }) =>
            isPending ? `${pending}` : isActive ? `${acive}` : `${pending}`
          }>
          <PersonStanding className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />

          {!isSidebarCollapsed && "Roles"}
        </NavLink>
        <NavLink
          to="/admin/permissions"
          className={({ isActive, isPending }) =>
            isPending ? `${pending}` : isActive ? `${acive}` : `${pending}`
          }>
          <ShieldAlert className={`h-4 w-4 ${isSidebarCollapsed && "mx-auto"}`} />

          {!isSidebarCollapsed && "Permissions"}
        </NavLink>
      </nav>

      <div className="mt-auto flex justify-center py-3 px-3">
        <Button
          onClick={handleLogout}
          variant="destructive"
          className={`flex gap-3 justify-start text-white cursor-pointer ${!isSidebarCollapsed && "w-full"}`}
        >
          <LogOut className="h-4 w-4"
       />
          {!isSidebarCollapsed && "Logout"}
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
