import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardContentPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardContentPage
