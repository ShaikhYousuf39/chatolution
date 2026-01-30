import { Suspense } from 'react'
import DashboardPage from '../_components/DashboardPage'

const DashboardTestimonialsPage = () => (
  <Suspense fallback={null}>
    <DashboardPage />
  </Suspense>
)

export default DashboardTestimonialsPage
