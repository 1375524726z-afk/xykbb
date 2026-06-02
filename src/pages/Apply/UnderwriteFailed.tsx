import { useEffect, useState } from 'react'

interface UnderwriteFailedProps {
  /** 是否显示 */
  visible: boolean
  /** 点击「去看看」或倒计时结束后跳转更优方案 */
  onGo: () => void
}

const COUNTDOWN = 60

// 核保失败弹窗：本产品暂不可投，推荐更优方案，5s 后自动跳转
export default function UnderwriteFailed({ visible, onGo }: UnderwriteFailedProps) {
  const [seconds, setSeconds] = useState(COUNTDOWN)

  useEffect(() => {
    if (!visible) {
      setSeconds(COUNTDOWN)
      return
    }
    const timer = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(timer)
          onGo()
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [visible, onGo])

  return (
    <div
      className={'uw-fail' + (visible ? ' uw-fail--visible' : '')}
      role="dialog"
      aria-modal="true"
      aria-hidden={!visible}
    >
      <div className="uw-fail__mask" />

      <div className="uw-fail__card">
        <span className="uw-fail__badge" aria-hidden="true">
          !
        </span>

        <h3 className="uw-fail__title">本产品暂不可投</h3>
        <p className="uw-fail__subtitle">已为您匹配到更划算的方案</p>

        <p className="uw-fail__tag">
          <span className="uw-fail__check" aria-hidden="true" />
          带病可投，最高可保至105岁！
        </p>

        <div className="uw-fail__compare">
          <div className="uw-fail__current">
            <span className="uw-fail__current-label">当前方案</span>
            <span className="uw-fail__current-price">30元/月</span>
          </div>
          <div className="uw-fail__better">
            <span className="uw-fail__better-tag">更优方案 ★★★★★</span>
            <span className="uw-fail__better-price">
              20<small>元/月</small>
            </span>
            <span className="uw-fail__trophy" aria-hidden="true">
              🏆
            </span>
          </div>
        </div>

        <p className="uw-fail__save">
          预计可省<em>35%</em>
        </p>

        <button type="button" className="uw-fail__btn" onClick={onGo}>
          去看看
        </button>

        <p className="uw-fail__count">{seconds}s后自动跳转</p>
      </div>
    </div>
  )
}
