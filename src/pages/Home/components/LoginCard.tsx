import { useEffect, useRef, useState } from 'react'

interface LoginCardProps {
  /** 点击「同意协议并登录」且校验通过后触发 */
  onSubmit?: (payload: { phone: string; code: string }) => void
}

const PHONE_REG = /^1[3-9]\d{9}$/
const COUNTDOWN = 60

// 登录卡片：手机号 -> 展开验证码 -> 同意协议并登录
export default function LoginCard({ onSubmit }: LoginCardProps) {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<number | undefined>(undefined)
  // 卡片内按钮滑出视口时，展示吸底按钮
  const submitRef = useRef<HTMLButtonElement | null>(null)
  const [showSticky, setShowSticky] = useState(false)

  const phoneValid = PHONE_REG.test(phone)
  // 手机号输入数字后展开验证码输入框
  const showCode = phone.length > 0
  const counting = seconds > 0

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [])

  // 监听卡片内登录按钮：滑出视口（即滚动到卡片底部以下）时显示吸底按钮
  useEffect(() => {
    const el = submitRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleSendCode = () => {
    if (counting) return
    if (!phoneValid) {
      alert('请输入正确的手机号')
      return
    }
    // TODO: 调用发送验证码接口
    setSeconds(COUNTDOWN)
    timerRef.current = window.setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          window.clearInterval(timerRef.current)
          return 0
        }
        return s - 1
      })
    }, 1000)
  }

  const handleSubmit = () => {
    if (!phoneValid) {
      alert('请输入正确的手机号')
      return
    }
    if (!code) {
      alert('请输入验证码')
      return
    }
    onSubmit?.({ phone, code })
  }

  return (
    <section className="login-card">
      <h2 className="login-card__title">输入手机号 立即获取保障</h2>

      <div className="login-card__field">
        <span className="login-card__label">手机号</span>
        <input
          className="login-card__input"
          type="tel"
          inputMode="numeric"
          maxLength={11}
          placeholder="请输入手机号"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
        />
      </div>

      <div className={`login-card__collapse${showCode ? ' is-open' : ''}`}>
        <div className="login-card__field login-card__field--code">
          <span className="login-card__label">验证码</span>
          <input
            className="login-card__input"
            type="tel"
            inputMode="numeric"
            maxLength={6}
            placeholder="请输入验证码"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          />
          <button
            type="button"
            className="login-card__code-btn"
            disabled={counting}
            onClick={handleSendCode}
          >
            {counting ? `${seconds}秒` : '获取验证码'}
          </button>
        </div>
      </div>

      <button
        ref={submitRef}
        className="login-card__submit"
        type="button"
        onClick={handleSubmit}
      >
        同意协议并登录
      </button>

      <p className="login-card__agreement">
        我已阅读并同意
        <a href="#user">《用户协议》</a>
        <a href="#privacy">《隐私政策》</a>
        <a href="#notice">《客户告知书》</a>
        <a href="#auth">《个人信息授权书》</a>
      </p>

      <div className={`sticky-submit${showSticky ? ' is-show' : ''}`}>
        <button
          className="sticky-submit__btn"
          type="button"
          onClick={handleSubmit}
        >
          立即投保
        </button>
      </div>
    </section>
  )
}
