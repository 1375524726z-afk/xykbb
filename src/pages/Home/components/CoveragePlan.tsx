import { useState } from 'react'
import { coverageItems, COLLAPSED_COUNT } from '../data'

// 保障计划：默认折叠（只显示前 N 行），可展开/收起
export default function CoveragePlan() {
  const [expanded, setExpanded] = useState(false)

  const visibleItems = expanded
    ? coverageItems
    : coverageItems.slice(0, COLLAPSED_COUNT)

  return (
    <section className="coverage">
      <div className="coverage__header">
        <h2 className="coverage__title">保障计划</h2>
        <span className="coverage__more">保障详情 ›</span>
      </div>

      <ul className="coverage__list">
        {visibleItems.map((item) => (
          <li className="coverage__row" key={item.name}>
            <span className="coverage__name">{item.name}</span>
            <span className="coverage__value">{item.value}</span>
          </li>
        ))}
      </ul>

      <button
        className="coverage__toggle"
        type="button"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? '收起保障计划' : '展开保障计划'}
        <i className={`coverage__arrow${expanded ? ' is-up' : ''}`} aria-hidden />
      </button>
    </section>
  )
}
