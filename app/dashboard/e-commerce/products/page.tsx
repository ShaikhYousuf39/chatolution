import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardProductsPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardProductsPage
