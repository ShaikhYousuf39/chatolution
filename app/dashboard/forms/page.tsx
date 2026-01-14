import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardFormsPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardFormsPage
