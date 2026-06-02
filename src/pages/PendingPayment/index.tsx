import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

// 倒计时总秒数（2分59秒）
const TOTAL_SECONDS = 179

const GIVE_UP = ['后续保费或将上浮', '人身保障出现空白', '突发风险无处申诉']
const BENEFITS = ['抢先锁定低价', '填补保障空缺', '电子保单便捷申领', '理赔高效省心']

interface BenefitRow {
  name: string
  value: string
}

const COVERAGES: BenefitRow[] = [
  { name: '恶性肿瘤及原位癌医疗保险金(保证续保终身)', value: '400万元' },
  { name: '恶性肿瘤—重度质子重离子医疗保险金', value: '400万元' },
  { name: '特定药品费用医疗保险金', value: '400万元' },
  { name: '一般医疗保险金(保证续保20年)', value: '400万元' },
  { name: '外购药品及外购器械费用医疗保险金', value: '100万' },
  { name: '特需医疗保险金', value: '100万元' },
  { name: '重大疾病关爱金', value: '1万元' },
  { name: '恶性肿瘤住院津贴医疗保险金', value: '100元/天' },
  { name: '住院费用医疗保险金', value: '5000元' },
  { name: '重大疾病保险金', value: '最高20万元' },
]

const COVERAGE_PRICE = '36.54元/月'

const COMPANY_STATS = [
  { label: '成立时间', value: '2009.07' },
  { label: '注册资本', value: '5000万' },
  { label: '经营区域', value: '全国范围', sub: '(港澳台除外)' },
]

// 倒计时数字盒：将 mm/ss 拆成单字符方块展示
function DigitBoxes({ value }: { value: string }) {
  return (
    <>
      {value.split('').map((ch, i) => (
        <span key={i} className="pending-countdown__box">
          {ch}
        </span>
      ))}
    </>
  )
}

// 待支付页面：展示待支付详情，关闭时弹出挽留弹窗
export default function PendingPaymentPage() {
  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(TOTAL_SECONDS)
  const [showPopup, setShowPopup] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  const upsellRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((s) => (s <= 1 ? 0 : s - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 滑过推荐模块底部后，吸底按钮出现（与模块内按钮互斥）
  useEffect(() => {
    const el = upsellRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const scrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.top < 0
        setShowSticky(scrolledPast)
      },
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div className="page page-pending">
      <header className="pending-header">
        <button
          type="button"
          className="pending-header__close"
          aria-label="关闭"
          onClick={() => setShowPopup(true)}
        >
          ×
        </button>
        <h1 className="pending-header__title">提醒！你还未完成支付</h1>
        <div className="pending-header__count">
          支付剩余
          <DigitBoxes value={mm} />分
          <DigitBoxes value={ss} />秒
        </div>
      </header>

      <div className="pending-banner">
        <span className="pending-banner__trophy" aria-hidden="true">
          🏆
        </span>
        <span className="pending-banner__strong">金牌保障</span>
        <span className="pending-banner__text">减轻家庭负担，一次性赔付到账</span>
      </div>

      <section className="pending-card">
        <h2 className="pending-card__title">看病保·免健告医疗险（0免赔）</h2>
        <div className="pending-card__row">
          <span className="pending-card__label">被保人</span>
          <span className="pending-card__value">刘丝雨</span>
        </div>
        <div className="pending-card__row">
          <span className="pending-card__label">保障期限</span>
          <span className="pending-card__value">2024.8.19-2025.8.19</span>
        </div>
      </section>

      <section className="pending-upsell" ref={upsellRef}>
        <div className="pending-upsell__cols">
          <div className="pending-upsell__giveup">
            <span className="pending-upsell__giveup-title">放弃投保</span>
            <ul>
              {GIVE_UP.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="pending-upsell__benefit">
            <span className="pending-upsell__tag">推荐 ★★★★★</span>
            <p className="pending-upsell__benefit-title">现在投保立享</p>
            <p className="pending-upsell__benefit-sub">
              <span aria-hidden="true">🛡️</span>专属服务 全面守护
            </p>
            <ul>
              {BENEFITS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span className="pending-upsell__trophy" aria-hidden="true">
              🏆
            </span>
          </div>
          <span className="pending-upsell__arrow" aria-hidden="true" />
        </div>
        <button
          type="button"
          className="pending-upsell__btn"
          onClick={() => setShowPopup(true)}
        >
          立即完善
        </button>
      </section>

      <section className="pending-detail">
        <h2 className="pending-detail__title">保障详情</h2>
        <div className="benefit-tier">
          {COVERAGES.map((row) => (
            <div key={row.name} className="benefit-tier__row">
              <span className="benefit-tier__name">{row.name}</span>
              <span className="benefit-tier__value">{row.value}</span>
            </div>
          ))}
          <div className="benefit-tier__row benefit-tier__row--price">
            <span className="benefit-tier__name">价格</span>
            <span className="benefit-tier__price">{COVERAGE_PRICE}</span>
          </div>
        </div>
      </section>

      <section className="pending-company">
        <h3 className="pending-company__name">月亮保</h3>
        <p className="pending-company__desc">由泰瑞保险代理有限公司运营</p>
        <div className="pending-company__stats">
          {COMPANY_STATS.map((s) => (
            <div key={s.label} className="pending-company__stat">
              <span className="pending-company__value">
                {s.value}
                {s.sub && <em className="pending-company__sub">{s.sub}</em>}
              </span>
              <span className="pending-company__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div
        className={
          'pending-footer' + (showSticky ? ' pending-footer--visible' : '')
        }
      >
        <button
          type="button"
          className="pending-footer__btn"
          onClick={() => navigate('/apply')}
        >
          继续支付
        </button>
        <button
          type="button"
          className="pending-footer__done"
          onClick={() => navigate('/apply')}
        >
          已完成支付
        </button>
      </div>

      {/* 挽留弹窗：还差一步即可生效 */}
      <div
        className={
          'retain-popup' + (showPopup ? ' retain-popup--visible' : '')
        }
        role="dialog"
        aria-modal="true"
        aria-hidden={!showPopup}
      >
        <div
          className="retain-popup__mask"
          onClick={() => setShowPopup(false)}
        />
        <div className="retain-popup__panel">
          <span className="retain-popup__shield" aria-hidden="true">
            🛡️
          </span>
          <p className="retain-popup__headline">还差一步即可生效</p>

          <div className="retain-popup__card">
            <span className="retain-popup__ribbon">别错过</span>
            <p className="retain-popup__hi">xxx，你的保障</p>
            <p className="retain-popup__count">
              支付剩余：
              <strong>
                {mm}分{ss}秒
              </strong>
            </p>
            <div className="retain-popup__price">
              每天仅需<strong>1.52</strong>元
            </div>
          </div>

          <button
            type="button"
            className="retain-popup__btn"
            onClick={() => setShowPopup(false)}
          >
            继续领取
          </button>
          <button
            type="button"
            className="retain-popup__done"
            onClick={() => navigate('/apply')}
          >
            我已完成支付
          </button>
        </div>
      </div>
    </div>
  )
}
