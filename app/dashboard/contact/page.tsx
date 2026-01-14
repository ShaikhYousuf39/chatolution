import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardContactPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardContactPage
