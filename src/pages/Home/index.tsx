import { useNavigate } from 'react-router-dom'
import HeroBanner from './components/HeroBanner'
import LoginCard from './components/LoginCard'
import CoveragePlan from './components/CoveragePlan'
import DetailSection from './components/DetailSection'
import './index.css'

// 首页（未登录落地页）
export default function HomePage() {
  const navigate = useNavigate()

  const handleSubmit = (payload: { phone: string; code: string }) => {
    // 登录校验通过后跳转至投保页，携带手机号
    navigate('/apply', { state: { phone: payload.phone } })
  }

  return (
    <div className="page page-home">
      <HeroBanner />
      <LoginCard onSubmit={handleSubmit} />
      <CoveragePlan />
      <DetailSection />
    </div>
  )
}
