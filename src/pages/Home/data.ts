export interface CoverageItem {
  /** 保障项目名称 */
  name: string
  /** 保障额度/说明 */
  value: string
}

/** 保障计划明细 */
export const coverageItems: CoverageItem[] = [
  { name: '住院医疗保险金(含医保外费用)', value: '400万' },
  { name: '质子重离子医疗保险金', value: '200万' },
  { name: '外购药品及外购器械费用保险金', value: '200万' },
  { name: '重大疾病关爱保险金', value: '10万元' },
  { name: '特药费用医疗保险金', value: '200万' },
  { name: '年度总保额', value: '800万' },
  { name: '保证续保期间内保额', value: '1000万' },
]

/** 默认折叠时展示的行数 */
export const COLLAPSED_COUNT = 3
