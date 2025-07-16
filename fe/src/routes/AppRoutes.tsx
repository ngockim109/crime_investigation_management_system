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
import CaseListPage from "@/pages/admin/chief/case-list-sheriff"
import InitialResponseForm from "@/pages/admin/chief/initial-response-form"
import ReportPage from "@/pages/client/report/report-page"
import LoginPage from "@/pages/admin/auth/LoginPage"
import ProtectedRoute from "@/pages/admin/not-permitted/protected-route"
import RolePage from "@/pages/admin/role"
import RoleAddPage from "@/pages/admin/role/role-add"
import RoleUpdatePage from "@/pages/admin/role/role-update"

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
    path: "auth",
    children: [
      {
        index: true,
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
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ReportsManagement />
              </ProtectedRoute>
            ),
          },
          {
            path: ":id",
            element: (
              <ProtectedRoute>
                <ReportDetailPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "user",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <UserListPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute>
                <UserAddPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ":user_name",
            element: (
              <ProtectedRoute>
                <UserDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "cases",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <CaseListPage />
              </ProtectedRoute>
            ),
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
                    element: (
                      <ProtectedRoute>
                        <InitialResponseForm />
                      </ProtectedRoute>
                    ),
                  },
                ],
              },
              {
                path: "scene-information",
                children: [
                  {
                    path: "scene-management",
                    element: (
                      <ProtectedRoute>
                        <SceneInformationPage />
                      </ProtectedRoute>
                    ),
                  },
                  {
                    path: "initial-statements",
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: (
                          <ProtectedRoute>
                            <InitialStatementsManagementPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: "add",
                        element: (
                          <ProtectedRoute>
                            <InitialStatementsAddPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: ":id",
                        element: (
                          <ProtectedRoute>
                            <InitialStatementsDetailPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: "update/:id",
                        element: (
                          <ProtectedRoute>
                            <InitialStatementsUpdatePage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: "parties/:id",
                        element: (
                          <ProtectedRoute>
                            <InitialStatementsDetailPage />
                          </ProtectedRoute>
                        ),
                      },
                    ],
                  },
                  {
                    path: "scene-medias",
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: (
                          <ProtectedRoute>
                            <SceneMediasManagementPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: "add",
                        element: (
                          <ProtectedRoute>
                            <SceneMediasAddPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: ":id",
                        element: (
                          <ProtectedRoute>
                            <SceneMediasDetailPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: "update/:id",
                        element: (
                          <ProtectedRoute>
                            <SceneMediasUpdatePage />
                          </ProtectedRoute>
                        ),
                      },
                    ],
                  },
                  {
                    path: "preliminary-physical-evidence",
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: (
                          <ProtectedRoute>
                            <PhysicalEvidenceManagement />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: ":id",
                        element: (
                          <ProtectedRoute>
                            <PhysicalEvidenceDetailPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: "add",
                        element: (
                          <ProtectedRoute>
                            <PhysicalEvidenceAddPage />
                          </ProtectedRoute>
                        ),
                      },
                      {
                        path: "update/:id",
                        element: (
                          <ProtectedRoute>
                            <PhysicalEvidenceUpdatePage />
                          </ProtectedRoute>
                        ),
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "roles",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <RolePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add",
            element: (
              <ProtectedRoute>
                <RoleAddPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "update/:id",
            element: (
              <ProtectedRoute>
                <RoleUpdatePage />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
])

export default AppRoutes
