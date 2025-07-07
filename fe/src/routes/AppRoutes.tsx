import PermissionPage from '@/pages/admin/permission'
import ProtectedRoute from '@/pages/admin/protected-route'
import UserPage from '@/pages/admin/user'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import { createBrowserRouter } from 'react-router-dom'

const AppRoutes = createBrowserRouter([
  {
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
    ]
  },
  {
    path: '/admin',
    children: [
      {
        path: 'users',
        element: <ProtectedRoute>
          <UserPage />
        </ProtectedRoute>,
      },
      {
        path: 'permissions',
        element: <ProtectedRoute>
          <PermissionPage />
        </ProtectedRoute>,
      }
    ]
  }
])


export default AppRoutes