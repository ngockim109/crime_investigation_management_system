//import LoginPage from "@/pages/admin/auth/LoginPage"
import RegisterPage from "@/pages/admin/auth/RegisterPage"
import DashboardLayout from "@/pages/admin/layout/DashboardLayout"
import PhysicalEvidenceAddPage from "@/pages/admin/physical-evidences/physical-evidence-add"
import PhysicalEvidenceDetailPage from "@/pages/admin/physical-evidences/physical-evidence-detail"
import PhysicalEvidenceManagement from "@/pages/admin/physical-evidences/physical-evidence-management"
import PhysicalEvidenceUpdatePage from "@/pages/admin/physical-evidences/physical-evidence-update"
import ReportDetailPage from "@/pages/admin/reports/report-detail"
import ReportsManagement from "@/pages/admin/reports/report-management"
import UserAddPage from "@/pages/admin/user/user-add"
import UserDetail from "@/pages/admin/user/user-detail"
import UserListPage from "@/pages/admin/user/user-list-page"
import HomePage from "@/pages/client/home"
import Layout from "@/pages/client/Layout"
import SceneInformationPage from "@/pages/admin/scene"
import { createBrowserRouter, Outlet } from "react-router-dom"
import SecondaryLayout from "@/pages/admin/layout/SecondaryLayout"
import SceneMediasManagementPage from "@/pages/admin/scenes-medias/scenes-media-management"
import SceneMediasAddPage from "@/pages/admin/scenes-medias/scenes-media-add"
import SceneMediasDetailPage from "@/pages/admin/scenes-medias/scenes-media-detail"
import SceneMediasUpdatePage from "@/pages/admin/scenes-medias/scenes-media-update"

import InitialStatementsManagementPage from "@/pages/admin/initial-statements/initial-statement-management"
import InitialStatementsAddPage from "@/pages/admin/initial-statements/initial-statement-add"
import InitialStatementsDetailPage from "@/pages/admin/initial-statements/initial-statement-detail"
import InitialStatementsUpdatePage from "@/pages/admin/initial-statements/initial-statement-update"
import CaseListPage from '@/pages/admin/chief/case-list-sheriff'
import InitialResponseForm from "@/pages/admin/chief/initial-response-form"
import ReportPage from "@/pages/client/report/report-page"

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
        element: <></>
        // element: <LoginPage />,
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
        children: [
          {
            index: true,
            element: <ReportsManagement />,
          },
          {
            path: ":id",
            element: <ReportDetailPage />,
          },

        ]
      },
      {
        path: "user",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <UserListPage />,
          },
          {
            path: "add",
            element: <UserAddPage />
          }, {
            path: ":user_name",
            element: <UserDetail />
          }
        ],
      },


      {
        path: "cases",
        children: [
          {
            index: true,
            element: <CaseListPage />,
          },
          {
            path: ":caseId",
            element: <SecondaryLayout />,
            children: [
              {
                path: "response-information",
                children: [
                  {
                    path: "response-management",
                    element: <InitialResponseForm />,
                  },
                ],
              },
              {
                path: "scene-information",
                children: [
                  {
                    path: "scene-management",
                    element: <SceneInformationPage />,
                  },
                  {
                    path: "initial-statements",
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <InitialStatementsManagementPage />,
                      },
                      {
                        path: "add",
                        element: <InitialStatementsAddPage />,
                      },
                      {
                        path: ":id",
                        element: <InitialStatementsDetailPage />,
                      },
                      {
                        path: "update/:id",
                        element: <InitialStatementsUpdatePage />,
                      },
                      {
                        path: "parties/:id",
                        element: <InitialStatementsDetailPage />,
                      },
                    ],
                  },
                  {
                    path: "scene-medias",
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <SceneMediasManagementPage />,
                      },
                      {
                        path: "add",
                        element: <SceneMediasAddPage />,
                      },
                      {
                        path: ":id",
                        element: <SceneMediasDetailPage />,
                      },
                      {
                        path: "update/:id",
                        element: <SceneMediasUpdatePage />,
                      },
                    ],
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
        ]
      },


    ],
  },
])

export default AppRoutes
