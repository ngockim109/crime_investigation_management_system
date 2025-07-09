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
import SceneInformationPage from "@/pages/admin/scene"
import { createBrowserRouter, Outlet } from "react-router-dom"
import SecondaryLayout from "@/pages/admin/layout/SecondaryLayout"
import ImagesAndVideos from "@/pages/admin/scene/components/SceneMedias"
import InitialStatement from "@/pages/admin/scene/components/InitialStatements"

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
    children: [
      {
        path: "reports",
        element: <DashboardLayout />,
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
        path: "case",
        element: <SecondaryLayout />,
        children: [
          {
            path: "scene-information",
            children: [
              {
                path: "scene-management",
                element: <SceneInformationPage />,
              },
              {
                path: "initial-statements",
                element: <InitialStatement />,
              },
              {
                path: "images-videos",
                element: <ImagesAndVideos />,
              },
              {
                path: "preliminary-physical-evidence",
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
        ],
      },
    ],
  },
])

export default AppRoutes
