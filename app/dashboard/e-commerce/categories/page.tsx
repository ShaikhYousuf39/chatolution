import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardCategoriesPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardCategoriesPage
