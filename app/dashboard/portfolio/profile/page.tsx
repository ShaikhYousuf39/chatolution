import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardProfilePage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardProfilePage
