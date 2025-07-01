import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import { createBrowserRouter } from 'react-router-dom';
import ReportDetail from "@/pages/report/ReportDetail";

const AppRoutes = createBrowserRouter([{
    path: '/',
    children: [
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/register',
            element: <RegisterPage />,
        }
        ,
        {
            path: '/report-detail',
            element: <ReportDetail />,
        }
 

    ]
}])


export default AppRoutes