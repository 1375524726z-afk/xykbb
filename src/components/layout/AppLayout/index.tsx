import { Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// 全局布局：页头 + 内容区(Outlet) + 页脚
export default function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
