
import HomePage from '@/pages/client/home'
import Layout from '@/pages/client/Layout'
import ReportPage from '@/pages/client/Report/ReportPage'

import { createBrowserRouter } from 'react-router-dom'


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
                element: <ReportPage />
            }
        ]
    }])

export default AppRoutes
