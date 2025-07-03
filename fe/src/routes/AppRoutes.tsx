
import HomePage from '@/pages/client/home'
import Layout from '@/pages/client/layout'
import ReportPage from '@/pages/client/report/ReportPage'

import { createBrowserRouter } from 'react-router-dom'

import ReportDetailPage from "@/pages/admin/report/ReportDetailPage"
import LoginPage from '@/pages/admin/auth/LoginPage'
import RegisterPage from '@/pages/admin/auth/RegisterPage'

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>
      },
      {
        path: "report",
        element: <ReportPage />,
      },
    ]
  },
  {
    path: "reportdetail",
    element: <ReportDetailPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  }])

export default AppRoutes
