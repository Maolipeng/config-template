import { lazy } from 'react'
import LazySuspenseComponent from '@/components/LazySuspenseComponent'

const Home = lazy(() => import('../views/Home'))

export default [
  {
    path: '/',
    exact: true,
    component: LazySuspenseComponent(Home),
  },
]
