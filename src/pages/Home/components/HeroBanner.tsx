import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import heroImg from '@/assets/images/hero.png'

interface HeroBannerProps {
  /** 是否显示左上角导航箭头 */
  showNav?: boolean
  /** 点击进入箭头的回调；提供时替代默认的页面跳转 */
  onEnter?: () => void
}

// 头图：品牌联名 + 主背景图 + 保障亮点卡
export default function HeroBanner({ showNav = false, onEnter }: HeroBannerProps) {
  const navigate = useNavigate()
  // 进入登录页箭头：初始隐藏，点击头图后显示
  const [showEnter, setShowEnter] = useState(false)

  return (
    <section className="hero">
      {showNav && showEnter && (
        <div className="hero__nav">
          <button
            type="button"
            className="hero__nav-btn"
            aria-label="返回初始页面"
            onClick={() => navigate('/')}
          >
            ←
          </button>
        </div>
      )}
      <img
        className="hero__img"
        src={heroImg}
        alt="看病保·免健告医疗险 最高1000万医疗保障"
        onClick={() => setShowEnter(true)}
      />
      {showEnter && (
        <button
          className="hero__enter"
          type="button"
          aria-label="进入登录页"
          onClick={() => (onEnter ? onEnter() : navigate('/apply'))}
        >
          →
        </button>
      )}
    </section>
  )
}
