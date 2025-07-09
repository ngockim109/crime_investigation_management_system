import LoginPage from "@/pages/admin/auth/LoginPage"
import RegisterPage from "@/pages/admin/auth/RegisterPage"
import DashboardLayout from "@/pages/admin/layout/DashboardLayout"
import PhysicalEvidenceAddPage from "@/pages/admin/physical-evidences/physical-evidence-add"
import PhysicalEvidenceDetailPage from "@/pages/admin/physical-evidences/physical-evidence-detail"
import PhysicalEvidenceManagement from "@/pages/admin/physical-evidences/physical-evidence-management"
import PhysicalEvidenceUpdatePage from "@/pages/admin/physical-evidences/physical-evidence-update"
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
        element: <HomePage />,
      },
      {
        path: "reports",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ReportPage />,
          },
        ],
      },
    ],
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
    path: "admin",
    element: <DashboardLayout />,
    children: [
      {
        path: "reports",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ReportsManagement />,
          },
          {
            path: ":id",
            element: <ReportDetailPage />,
          },
        ],
      },
      {
        path: "physical-evidences",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PhysicalEvidenceManagement />,
          },
          {
            path: ":id",
            element: <PhysicalEvidenceDetailPage />,
          },
          {
            path: "add",
            element: <PhysicalEvidenceAddPage />,
          },
          {
            path: "update/:id",
            element: <PhysicalEvidenceUpdatePage />,
          },
        ],
      },
    ],
  },
])

export default AppRoutes
