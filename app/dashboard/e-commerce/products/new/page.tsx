import { Suspense } from 'react'
import DashboardPage from '../../_components/DashboardPage'

const DashboardNewProductPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardNewProductPage
