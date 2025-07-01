import LoginPage from "@/pages/auth/LoginPage"
import RegisterPage from "@/pages/auth/RegisterPage"
import ReportDetailPage from "@/pages/auth/ReportDetailPage"
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
      {
        path: "/reportdetail",
        element: <ReportDetailPage />,
      },
    ],
  },
])

export default AppRoutes
