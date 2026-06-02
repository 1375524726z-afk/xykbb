import detail1 from '@/assets/images/detail-1.png'
import detail2 from '@/assets/images/detail-2.png'
import detail3 from '@/assets/images/detail-3.png'
import detail4 from '@/assets/images/detail-4.png'
import ClaimsSection from './ClaimsSection'
import AgreementSection from './AgreementSection'
import DisclosureSection from './DisclosureSection'

const detailImages = [
  { src: detail1, alt: '为什么选择看病保·免健告医疗险' },
  { src: detail2, alt: '无需健康告知 一般既往症可保可赔 / 保证续保' },
  { src: detail3, alt: '医保内外覆盖全 800万保障 / 先进药械' },
  { src: detail4, alt: '品质保障 太平洋健康承保' },
]

// 详情大图：按顺序排列的产品说明长图
export default function DetailSection() {
  return (
    <section className="detail">
      {detailImages.map((img) => (
        <img key={img.src} className="detail__img" src={img.src} alt={img.alt} />
      ))}
      <ClaimsSection />
      <AgreementSection />
      <DisclosureSection />
    </section>
  )
}
