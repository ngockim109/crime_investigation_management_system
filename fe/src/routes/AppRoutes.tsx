import HomePage from '@/pages/client/home'
import Layout from '@/pages/client/layout'
import ReportPage from '@/pages/client/report/ReportPage'
import { createBrowserRouter, Outlet } from 'react-router-dom'
import ReportDetail from "@/pages/client/report/ReportDeilPage/ReportDetail";

import ReportDetailPage from "@/pages/admin/report/ReportDetailPage"


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
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <ReportPage />
          }
          ,
          {
            path: 'report-detail',
            element: <ReportDetail />,
          }
        ]
      },
    ]
  },
  {
    path: "reportdetail",
    element: <ReportDetailPage />,
  },
])

export default AppRoutes
