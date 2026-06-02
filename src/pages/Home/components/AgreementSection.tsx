const agreements = [
  '投保须知',
  '责任免除',
  '费率表',
  '产品说明书',
  '保险条款',
  '授权转账声明书',
  '保证续保与重新投保服务协议',
  '高危职业表',
  '声明与授权',
  '客户服务指南',
  '特定药品清单',
  '健康管理服务手册',
  '严重既往症疾病清单',
  '特定疾病',
  '服务协议',
  '客户告知书',
  '隐私政策',
  '转账授权书',
]

// 保障协议：投保即视为同意的协议清单
export default function AgreementSection() {
  return (
    <section className="agreement">
      <h2 className="agreement__title">保障协议</h2>
      <p className="agreement__text">
        点击“立即投保”按钮即代表您已阅读并同意&nbsp;
        {agreements.map((name) => (
          <a className="agreement__link" href={`#${name}`} key={name}>
            《{name}》
          </a>
        ))}
      </p>
    </section>
  )
}
