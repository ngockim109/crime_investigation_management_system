import LoginPage from "@/pages/admin/auth/LoginPage"
import RegisterPage from "@/pages/admin/auth/RegisterPage"
import DashboardLayout from "@/pages/admin/layout/DashboardLayout"
import ReportDetailPage from "@/pages/admin/reports/report-detail"
import ReportsManagement from "@/pages/admin/reports/report-management"
import HomePage from "@/pages/client/home"
import Layout from "@/pages/client/Layout"
import ReportPage from "@/pages/client/report/report-page"
import { createBrowserRouter, Outlet } from "react-router-dom"

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "reports",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ReportPage />
          }
        ]
      },
    ]
  },
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "reports",
        element: <ReportsManagement />,
      },
      {
        path: "reports/:id",
        element: <ReportDetailPage />,
      },
    ],
  },



])

export default AppRoutes
