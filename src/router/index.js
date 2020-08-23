import {lazy} from 'react';
import LazySuspenseComponent from '@/components/LazySuspenseComponent';

const ContentCheck = lazy(() => import('../views/ContentCheck'));
const CheckResult = lazy(() => import('../views/CheckResult'));
const LoginPage = lazy(() => import('../views/LoginPage'));
const Ui = lazy(() => import('../views/Ui/Ui'));

export default [
  {
    path: '/',
    exact: true,
    component: LazySuspenseComponent(ContentCheck,{menuUrl:'content-check'})
  },
  {
    path: '/content-check',
    exact: true,
    component: LazySuspenseComponent(ContentCheck,{menuUrl:'content-check'})
  },
  {
    path: '/check-result',
    exact: true,
    component: LazySuspenseComponent(CheckResult,{menuUrl:'check-result'})
  },
  {
    path: '/login',
    exact: true,
    component: LazySuspenseComponent(LoginPage)
  },
  {
    path:'/ui',
    a:11111,
    component:LazySuspenseComponent(Ui,{menuUrl:'ui'})
  }

]
