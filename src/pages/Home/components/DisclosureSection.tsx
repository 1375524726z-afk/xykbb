import { useState } from 'react'

const DISCLOSURE_TEXT =
  '本产品由太平洋健康保险股份有限公司承保，产品名称为看病保·免健告医疗险(0免赔)。' +
  '《太保互联网看病守护住院医疗保险》（备案编号：太保健〔2026〕36号、条款编码：太平洋健康险[2025]医疗保险042号）；' +
  '《太保互联网附加特定药品费用医疗保险》（备案编号：太保健〔2023〕110号、条款编码：太平洋健康险[2023]医疗保险010号）；' +
  '《太保附加互联网看病守护外购药械费用医疗保险》（备案编号：太保健〔2025〕148号、条款编码：太平洋健康险[2025]医疗保险043号）；' +
  '《太保附加互联网看病守护重大疾病保险》（备案编号：太保健〔2025〕148号、条款编码：太平洋健康险[2025]疾病保险044号）；' +
  '《太保附加互联网看病守护意外伤害保险》（备案编号：太保健〔2025〕148号、条款编码：太平洋健康险[2025]意外伤害保险045号）；' +
  '《太保附加互联网看病守护质子重离子医疗保险》（备案编号：太保健〔2025〕149号、条款编码：太平洋健康险[2025]医疗保险046号）；' +
  '《太保附加互联网看病守护院外特定药品费用医疗保险》（备案编号：太保健〔2025〕150号、条款编码：太平洋健康险[2025]医疗保险047号）。' +
  '以上产品的保险责任、责任免除、保险期间、犹豫期、等待期、退保规定及现金价值等内容，以保险条款及投保页面提示为准。' +
  '本产品为短期健康保险，保险公司不会因被保险人健康状况变化或历史理赔情况而拒绝续保，但本产品不保证续保。' +
  '保险条款及费率以中国银保监会备案为准，最终解释权及承保权益归太平洋健康保险股份有限公司所有。' +
  '本页面所示内容仅供参考，不构成任何要约或承诺，具体保障内容、投保规则及理赔标准以正式保险合同约定为准。'

// 详情/承保说明：默认折叠（3 行渐隐），点击展开更多显示全文
export default function DisclosureSection() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section className="disclosure">
      <p
        className={`disclosure__body${expanded ? '' : ' is-collapsed'}`}
      >
        {DISCLOSURE_TEXT}
      </p>

      {!expanded && (
        <button
          className="disclosure__more"
          type="button"
          onClick={() => setExpanded(true)}
        >
          展开更多
          <svg
            className="disclosure__chevron"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden
          >
            <path
              d="M3.5 4 L8 8 L12.5 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.5 8.5 L8 12.5 L12.5 8.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      <div className="disclosure__footer">
        <p>版权所有@泰瑞保险代理有限责任公司</p>
        <p>京ICP备13041952号-4</p>
      </div>
    </section>
  )
}
