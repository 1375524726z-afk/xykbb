const steps = [
  {
    step: '第一步',
    title: '电话报案',
    desc: '若不幸发生保险事故，请拨打：月亮保服务热线400-686-0077',
  },
  {
    step: '第二步',
    title: '理赔申请',
    desc: '月亮保理赔顾问将协助您，提交理赔资料并发起理赔申请',
  },
  {
    step: '第三步',
    title: '完成理赔',
    desc: '符合保险责任的，保险公司将赔款支付至被保险人/受益人名下指定账户',
  },
]

// 理赔说明：三步时间轴
export default function ClaimsSection() {
  return (
    <section className="claims">
      <h2 className="claims__title">理赔说明</h2>
      <ol className="claims__list">
        {steps.map((item) => (
          <li className="claims__item" key={item.step}>
            <span className="claims__dot" aria-hidden />
            <div className="claims__body">
              <p className="claims__head">
                <span className="claims__step">{item.step}</span>
                {item.title}
              </p>
              <p className="claims__desc">{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
