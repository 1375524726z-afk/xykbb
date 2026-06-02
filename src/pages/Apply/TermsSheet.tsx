import { useState } from 'react'
import serviceImg from '@/assets/images/service.png'

interface TermsSheetProps {
  /** 是否显示 */
  visible: boolean
  /** 关闭弹窗 */
  onClose: () => void
  /** 点击「同意并继续」 */
  onAgree: () => void
}

type TabKey = 'notice' | 'exemption'

const AGREEMENTS = [
  '投保须知',
  '责任免除',
  '费率表',
  '产品说明书',
  '保险条款',
  '授权转账声明书',
  '保证续保与重新投保服务协议',
]

// 投保须知 / 免责条款 全屏弹窗：顶部可切换 Tab，底部协议确认
export default function TermsSheet({ visible, onClose, onAgree }: TermsSheetProps) {
  const [tab, setTab] = useState<TabKey>('notice')

  return (
    <div
      className={'terms-sheet' + (visible ? ' terms-sheet--visible' : '')}
      role="dialog"
      aria-modal="true"
      aria-hidden={!visible}
    >
      <div className="terms-sheet__mask" onClick={onClose} />

      <div className="terms-sheet__panel">
        <div className="terms-sheet__header">
          <div className="terms-sheet__tabs">
            <button
              type="button"
              className={
                'terms-sheet__tab' +
                (tab === 'notice' ? ' terms-sheet__tab--active' : '')
              }
              onClick={() => setTab('notice')}
            >
              投保须知
            </button>
            <button
              type="button"
              className={
                'terms-sheet__tab' +
                (tab === 'exemption' ? ' terms-sheet__tab--active' : '')
              }
              onClick={() => setTab('exemption')}
            >
              免责条款
            </button>
          </div>
          <button
            type="button"
            className="terms-sheet__close"
            aria-label="关闭"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="terms-sheet__body">
          {tab === 'notice' ? (
            <div className="terms-sheet__content">
              <h4>投保须知</h4>
              <p>声明：</p>
              <p>
                1.
                请您根据自身已有的保障水平和经济实力等实际情况，选择适合自身需求的保险产品。多数人身保险产品期限较长，如果需要分期交纳保费，请您充分考虑是否有足够、稳定的财力长期支付保费，不按时交费可能会影响您的权益。
              </p>
              <p>
                2.
                为保障您的权益，投保之前请您仔细阅读保险条款，并特别注意等待期、责任免除、比例赔付或者给付等免除或减轻保人责任的条款。
              </p>
              <h5>一、特别提示</h5>
              <p>·犹豫期：</p>
              <p>
                自您签收本合同之日起，有15日的犹豫期。在此期间，请您认真审视本合同，如果您认为本合同与您的需求不相符，您可以在此期间提出解除本合同，我们将退还您所支付的保险费。
              </p>
              <p>
                解除合同时，您需要填写解除合同申请书，并提供您的保险合同或电子保险单号及有效身份证件。自我们收到解除合同申请书时起，本合同即被解除。
              </p>
            </div>
          ) : (
            <div className="terms-sheet__content">
              <h4>《太保互联网看病守护住院医疗保险》责任免除</h4>
              <h5>责任免除</h5>
              <p>
                1.因下列情形之一导致被保险人支出医疗费用的，我们不承担赔付保险金的责任：
              </p>
              <p>(1)投保人对被保险人的故意杀害、故意伤害；</p>
              <p>(2)被保险人故意犯罪或者抗拒依法采取的刑事强制措施；</p>
              <p>
                (3)被保险人故意自伤或自杀，但被保险人自杀时为无民事行为能力人的除外；
              </p>
              <p>(4)被保险人醉酒，斗殴，服用、吸食或注射毒品；</p>
              <p>
                (5)被保险人酒后驾驶，无合法有效驾驶证驾驶，或驾驶无合法有效行驶证的机动车；
              </p>
              <p>
                说明：被保险人驾驶任何交通工具，尤其是开车，必须保证自己有驾照（驾照有效）以及交通工具可以合法上路（行驶证有效且年检），并且确保自己的驾照和驾驶的交通工具（车辆类型）是匹配的，否则发生的意外我们不赔。
              </p>
              <p>(6)战争、军事冲突、暴乱或武装叛乱；</p>
            </div>
          )}
        </div>

        <div className="terms-sheet__footer">
          <p className="terms-sheet__agreements">
            我阅读并同意
            {AGREEMENTS.map((item) => (
              <a key={item} className="terms-sheet__agreement-link" href="#">
                《{item}》
              </a>
            ))}
          </p>
          <div className="terms-sheet__action">
            <img className="terms-sheet__service" src={serviceImg} alt="去咨询" />
            <button
              type="button"
              className="terms-sheet__agree"
              onClick={onAgree}
            >
              同意并继续
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
