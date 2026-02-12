import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardOrdersPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardOrdersPage
