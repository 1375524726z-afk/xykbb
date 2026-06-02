import { useEffect, useState } from 'react'

type PayResult = '支付成功' | '提单中断' | '核保失败'

interface PaymentLoadingProps {
  /** 是否显示 */
  visible: boolean
  /** 全部步骤完成后回调（跳转支付） */
  onComplete: () => void
  /** 点击下方透明 tab 选择支付结果（用于结果分支） */
  onResult?: (result: PayResult) => void
}

const STEPS = ['正在为您确定订单', '正在确认支付环境', '确认完成，即将跳转支付']
const RESULTS: PayResult[] = ['支付成功', '提单中断', '核保失败']

// 支付前的 loading 弹窗：金色盾牌 + 分步推进
export default function PaymentLoading({
  visible,
  onComplete,
  onResult,
}: PaymentLoadingProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!visible) {
      setStep(0)
      return
    }
    const timers = [
      setTimeout(() => setStep(1), 5000),
      setTimeout(() => setStep(2), 10000),
      setTimeout(() => onComplete(), 15000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [visible, onComplete])

  return (
    <div
      className={'pay-loading' + (visible ? ' pay-loading--visible' : '')}
      role="dialog"
      aria-modal="true"
      aria-hidden={!visible}
    >
      <div className="pay-loading__mask" />

      <div className="pay-loading__card">
        <svg className="pay-loading__shield" viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <linearGradient id="payShield" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffe7a8" />
              <stop offset="0.5" stopColor="#f6c25a" />
              <stop offset="1" stopColor="#e69a32" />
            </linearGradient>
            <linearGradient id="payRibbon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f7c45c" />
              <stop offset="1" stopColor="#e08f2c" />
            </linearGradient>
          </defs>
          <path
            d="M60 12c12 7 24 10 33 10v34c0 24-16 39-33 46-17-7-33-22-33-46V22c9 0 21-3 33-10z"
            fill="url(#payShield)"
            stroke="#e2962f"
            strokeWidth="1.5"
          />
          <path
            d="M46 60l10 10 20-22"
            fill="none"
            stroke="#fff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 50c14 14 62 14 84-2"
            fill="none"
            stroke="url(#payRibbon)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>

        <h3 className="pay-loading__title">15天内随时可退</h3>

        <ul className="pay-loading__steps">
          {STEPS.map((text, index) => (
            <li
              key={text}
              className={
                'pay-loading__step' +
                (index <= step ? ' pay-loading__step--active' : '')
              }
            >
              <span className="pay-loading__marker">
                {index === step ? (
                  <span className="pay-loading__spinner" />
                ) : (
                  <span className="pay-loading__dot" />
                )}
              </span>
              <span className="pay-loading__step-text">{text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pay-loading__tabs">
        {RESULTS.map((result) => (
          <button
            key={result}
            type="button"
            className="pay-loading__tab"
            onClick={() => onResult?.(result)}
          >
            {result}
          </button>
        ))}
      </div>
    </div>
  )
}
