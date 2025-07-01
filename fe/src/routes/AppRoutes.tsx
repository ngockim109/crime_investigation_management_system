import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/client/home/HomePage'
import LoginPage from '@/pages/admin/auth/LoginPage'
import RegisterPage from '@/pages/admin/auth/RegisterPage'

const AppRoutes = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/admin',
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
])

export default AppRoutes
