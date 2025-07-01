import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import CaseListPage from '@/pages/sheriff/CaseListPage/CaseListPage'
import { createBrowserRouter } from 'react-router-dom'

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
        },
        {
            path: '/sheriff-case',
            element: <CaseListPage />,
        },
    ]
}])


export default AppRoutes