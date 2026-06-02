import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import HomePage from '@/pages/Home'
import ApplyPage from '@/pages/Apply'
import PendingPaymentPage from '@/pages/PendingPayment'
import NotFoundPage from '@/pages/NotFound'

// 路由配置：在 children 中按需新增页面路由
export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'apply', element: <ApplyPage /> },
      { path: 'pending', element: <PendingPaymentPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], {
  // 与 Vite base 保持一致，适配 GitHub Pages 子路径
  basename: import.meta.env.BASE_URL,
})
