const BENEFITS = [
  '不用担心忘记缴费导致保障中断',
  '免等待期免重新健康告知申请续保',
  '可随时取消，无额外费用',
]

// 续保说明卡片：保证续保产品的权益说明与续保协议
export default function RenewalCard() {
  return (
    <section className="renewal-card">
      <div className="renewal-card__inner">
        <h2 className="renewal-card__title">
          本产品为保证续保产品，保证续保期间内每年将自动延续保障
        </h2>

        <ul className="renewal-card__list">
          {BENEFITS.map((item) => (
            <li key={item} className="renewal-card__item">
              <span className="renewal-card__icon" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <p className="renewal-card__agreement">
          *按照<a href="#rate">《费率表》</a>为您申请续保请阅读并同意
          <a href="#renewal">《延续保障服务协议》</a>
        </p>
      </div>
    </section>
  )
}
