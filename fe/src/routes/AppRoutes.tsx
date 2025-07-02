
import Layout from '@/pages/client/Layout'
import ReportPage from '@/pages/client/Report/ReportPage'

import { createBrowserRouter } from 'react-router-dom'

const AppRoutes = createBrowserRouter([
    {
        path: "home",
        element: <Layout></Layout>,
        children: [
            {
                path: "report",
                element: <ReportPage />
            }
        ]
    }])

export default AppRoutes