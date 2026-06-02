import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TermsSheet from './TermsSheet'
import PaymentLoading from './PaymentLoading'
import UnderwriteFailed from './UnderwriteFailed'
import serviceImg from '@/assets/images/service.png'

interface ApplyCardProps {
  /** 投保人（本人）手机号 */
  phone?: string
  /** 投保人（本人）姓名 */
  name?: string
  /** 投保人（本人）身份证号 */
  idNo?: string
  /** 保费（元/月） */
  premium?: string
  /** 打开投保流程弹窗的信号（数值变化时触发） */
  openNoticeSignal?: number
}

const RELATIONS = ['本人', '配偶', '父母', '子女'] as const
const SOCIAL_OPTIONS = ['有(含新农合)', '无'] as const

// 投保信息填写卡片：选择被保险人关系、社保情况与缴费方式
export default function ApplyCard({
  phone = '',
  name = '',
  idNo = '',
  premium = '168.08',
  openNoticeSignal = 0,
}: ApplyCardProps) {
  const navigate = useNavigate()
  const [relation, setRelation] = useState<(typeof RELATIONS)[number]>('本人')
  const [social, setSocial] = useState<(typeof SOCIAL_OPTIONS)[number]>('有(含新农合)')
  // 主投保按钮引用 + 吸底栏显隐
  const ctaRef = useRef<HTMLButtonElement>(null)
  const [showSticky, setShowSticky] = useState(false)
  // 投保流程须知半屏弹窗显隐
  const [showNotice, setShowNotice] = useState(false)
  // 投保须知 / 免责条款 全屏弹窗显隐
  const [showTerms, setShowTerms] = useState(false)
  // 支付 loading 弹窗显隐
  const [showPayment, setShowPayment] = useState(false)
  // 核保失败弹窗显隐
  const [showUwFail, setShowUwFail] = useState(false)

  // 当主投保按钮滚出视口上方时，显示底部常驻吸底栏
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0)
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // 外部信号变化时（如点击头图进入箭头），直接打开投保流程弹窗
  useEffect(() => {
    if (openNoticeSignal) setShowNotice(true)
  }, [openNoticeSignal])
  // 投保人（本人）信息
  const [holderName, setHolderName] = useState(name)
  const [holderId, setHolderId] = useState(idNo)
  const [holderPhone, setHolderPhone] = useState(phone)
  // 被保险人信息（代他人投保时填写）
  const [insuredName, setInsuredName] = useState('')
  const [insuredId, setInsuredId] = useState('')

  // 是否为本人投保（本人时被保险人即投保人，无需单独「本人信息」区块）
  const isSelf = relation === '本人'

  // 被保人/投保人信息是否填写完整（用于吸底栏展示价格或提示）
  const isComplete = isSelf
    ? Boolean(holderName.trim()) &&
      /^\d{17}[\dXx]$/.test(holderId.trim()) &&
      /^\d{11}$/.test(holderPhone.trim())
    : Boolean(insuredName.trim()) && /^\d{17}[\dXx]$/.test(insuredId.trim())

  // 按钮文案：本人时用投保人姓名，其余用被保人姓名/关系
  const insuredLabel = isSelf
    ? holderName.trim() || '本人'
    : insuredName.trim() || relation

  // 校验投保信息；通过返回 true，否则弹出提示并返回 false
  const validate = () => {
    if (isSelf) {
      if (!holderName.trim()) return alert('请输入姓名'), false
      if (!/^\d{17}[\dXx]$/.test(holderId.trim()))
        return alert('请输入正确的身份证号'), false
      if (!/^\d{11}$/.test(holderPhone.trim()))
        return alert('请输入正确的手机号'), false
      return true
    }
    if (!insuredName.trim()) return alert('请输入被保人姓名'), false
    if (!/^\d{17}[\dXx]$/.test(insuredId.trim()))
      return alert('请输入正确的被保人身份证号'), false
    if (!holderName.trim()) return alert('请输入投保人姓名'), false
    if (!/^\d{17}[\dXx]$/.test(holderId.trim()))
      return alert('请输入正确的投保人身份证号'), false
    if (!/^\d{11}$/.test(holderPhone.trim()))
      return alert('请输入正确的投保人手机号'), false
    return true
  }

  // 点击投保：校验通过后弹出「投保流程须知」半屏弹窗
  const handleApply = () => {
    if (validate()) setShowNotice(true)
  }

  // 用户在须知弹窗确认后，进入「投保须知/免责条款」全屏弹窗
  const handleConfirmNotice = () => {
    setShowNotice(false)
    setShowTerms(true)
  }

  // 用户在「投保须知/免责条款」弹窗点击「同意并继续」，调起支付 loading
  const handleAgreeTerms = () => {
    setShowTerms(false)
    setShowPayment(true)
    // TODO: 接入投保下单流程
    console.log('提交投保：', {
      relation,
      insuredName: isSelf ? holderName : insuredName,
      insuredId: isSelf ? holderId : insuredId,
      holderName,
      holderId,
      holderPhone,
      social,
    })
  }

  // 投保人（本人）信息表单字段（在「本人」与「本人信息」区块复用）
  const holderFields = (
    <>
      <div className="apply-card__field">
        <span className="apply-card__label">姓名</span>
        <input
          className="apply-card__input"
          type="text"
          placeholder="请输入姓名"
          value={holderName}
          onChange={(e) => setHolderName(e.target.value)}
        />
        <span className="apply-card__contact" aria-hidden="true" />
      </div>
      <div className="apply-card__field">
        <span className="apply-card__label">身份证号</span>
        <input
          className="apply-card__input"
          type="text"
          maxLength={18}
          placeholder="请输入身份证号"
          value={holderId}
          onChange={(e) => setHolderId(e.target.value)}
        />
      </div>
      <div className="apply-card__field">
        <span className="apply-card__label">手机号</span>
        <input
          className="apply-card__input"
          type="tel"
          inputMode="numeric"
          maxLength={11}
          placeholder="请输入手机号"
          value={holderPhone}
          onChange={(e) => setHolderPhone(e.target.value.replace(/\D/g, ''))}
        />
      </div>
    </>
  )

  return (
    <>
      <button
        ref={ctaRef}
        className="apply-cta"
        type="button"
        onClick={handleApply}
      >
        为{insuredLabel}投保
      </button>

      <section className="apply-card">
        <h2 className="apply-card__title">
          为谁投保 <span className="apply-card__title-sub">(被保险人)</span>
        </h2>

        <div className="apply-card__tabs">
          {RELATIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={
                'apply-card__tab' +
                (relation === item ? ' apply-card__tab--active' : '')
              }
              onClick={() => setRelation(item)}
            >
              {item}
              {relation === item && (
                <span className="apply-card__tab-check" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>

        {isSelf ? (
          holderFields
        ) : (
          <>
            <div className="apply-card__field">
              <span className="apply-card__label">姓名</span>
              <input
                className="apply-card__input"
                type="text"
                placeholder="请输入被保人姓名"
                value={insuredName}
                onChange={(e) => setInsuredName(e.target.value)}
              />
              <span className="apply-card__contact" aria-hidden="true" />
            </div>
            <div className="apply-card__field">
              <span className="apply-card__label">身份证号</span>
              <input
                className="apply-card__input"
                type="text"
                maxLength={18}
                placeholder="请输入被保人身份证号"
                value={insuredId}
                onChange={(e) => setInsuredId(e.target.value)}
              />
            </div>
          </>
        )}

        <div className="apply-card__field apply-card__field--block">
          <span className="apply-card__label apply-card__label--block">有无社保</span>
          <div className="apply-card__options">
            {SOCIAL_OPTIONS.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  'apply-card__option' +
                  (social === item ? ' apply-card__option--active' : '')
                }
                onClick={() => setSocial(item)}
              >
                {item}
                {social === item && (
                  <span className="apply-card__option-check" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>
        </div>

        {!isSelf && (
          <>
            <h2 className="apply-card__title">
              本人信息 <span className="apply-card__title-sub">(投保人)</span>
            </h2>
            {holderFields}
          </>
        )}

        <h2 className="apply-card__title">缴费方式</h2>
        <div className="apply-card__options">
          <button
            type="button"
            className="apply-card__option apply-card__option--active apply-card__option--pay"
          >
            按月交费 (共12期)
            <span className="apply-card__option-check" aria-hidden="true" />
          </button>
        </div>
      </section>

      <div
        className={'apply-sticky' + (showSticky ? ' apply-sticky--visible' : '')}
      >
        <div className="apply-sticky__price">
          <img className="apply-sticky__service" src={serviceImg} alt="去咨询" />
          {isComplete ? (
            <span className="apply-sticky__amount">
              {premium}
              <span className="apply-sticky__unit">元/月</span>
            </span>
          ) : (
            <span className="apply-sticky__tip">请填写被保人信息</span>
          )}
        </div>
        <button
          className="apply-sticky__btn"
          type="button"
          onClick={handleApply}
        >
          立即投保
        </button>
      </div>

      {/* 投保流程须知半屏弹窗 */}
      <div
        className={
          'notice-sheet' + (showNotice ? ' notice-sheet--visible' : '')
        }
        role="dialog"
        aria-modal="true"
        aria-hidden={!showNotice}
      >
        <div
          className="notice-sheet__mask"
          onClick={() => setShowNotice(false)}
        />
        <div className="notice-sheet__panel">
          <div className="notice-sheet__brands">
            <span className="notice-sheet__brand-moon">月亮保</span>
            <span className="notice-sheet__brand-x">×</span>
            <span className="notice-sheet__brand-cpic">太平洋保险</span>
          </div>

          <h3 className="notice-sheet__title">用户权益保障承诺</h3>

          <ul className="notice-sheet__badges">
            <li className="notice-sheet__badge">信息保护</li>
            <li className="notice-sheet__badge">操作可回溯</li>
            <li className="notice-sheet__badge">1V1客服</li>
            <li className="notice-sheet__badge">理赔无忧</li>
          </ul>

          <p className="notice-sheet__desc">
            您已进入投保流程，本产品由太平洋健康保险股份有限公司承保，由泰瑞保险代理有限责任公司提供保险中介服务。请仔细阅读保险条款、
            <span className="notice-sheet__nowrap">
              投保须知、
              <a className="notice-sheet__link" href="#">《客户告知书》</a>
            </span>
            等内容。为保障您的权益，我们将会安全记录您的操作并可能会同步承保公司。
          </p>

          <button
            className="notice-sheet__btn"
            type="button"
            onClick={handleConfirmNotice}
          >
            好的，知道了
          </button>
        </div>
      </div>

      <TermsSheet
        visible={showTerms}
        onClose={() => setShowTerms(false)}
        onAgree={handleAgreeTerms}
      />

      <PaymentLoading
        visible={showPayment}
        onComplete={() => {
          setShowPayment(false)
          // TODO: 跳转支付收银台
          console.log('跳转支付')
        }}
        onResult={(result) => {
          setShowPayment(false)
          if (result === '核保失败') {
            setShowUwFail(true)
            return
          }
          if (result === '提单中断') {
            navigate('/pending')
            return
          }
          // TODO: 按支付结果跳转对应页面（支付成功）
          console.log('支付结果：', result)
        }}
      />

      <UnderwriteFailed
        visible={showUwFail}
        onGo={() => {
          setShowUwFail(false)
          // TODO: 跳转更优方案页面
          console.log('跳转更优方案')
        }}
      />
    </>
  )
}
