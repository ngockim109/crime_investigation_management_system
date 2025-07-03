import LoginPage from "@/pages/admin/auth/LoginPage"
import RegisterPage from "@/pages/admin/auth/RegisterPage"
import DashboardLayout from "@/pages/admin/layout/DashboardLayout"
import ReportsManagement from "@/pages/admin/reports/report-management"
import { createBrowserRouter } from "react-router-dom"

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "/reports",
        element: <ReportsManagement />,
      },
    ],
  },
])

export default AppRoutes
