import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeroBanner from '@/pages/Home/components/HeroBanner'
import CoveragePlan from '@/pages/Home/components/CoveragePlan'
import DetailSection from '@/pages/Home/components/DetailSection'
import ApplyCard from './ApplyCard'
import RenewalCard from './RenewalCard'
import '@/pages/Home/index.css'
import './index.css'

// 投保页（已登录）：内容同首页，登录卡片替换为投保信息填写卡片
export default function ApplyPage() {
  const location = useLocation()
  const phone = (location.state as { phone?: string } | null)?.phone
  // 点击头图进入箭头时，递增信号以打开投保流程弹窗
  const [noticeSignal, setNoticeSignal] = useState(0)

  return (
    <div className="page page-apply">
      <HeroBanner showNav onEnter={() => setNoticeSignal((s) => s + 1)} />
      <ApplyCard phone={phone} openNoticeSignal={noticeSignal} />
      <RenewalCard />
      <CoveragePlan />
      <DetailSection />
    </div>
  )
}
