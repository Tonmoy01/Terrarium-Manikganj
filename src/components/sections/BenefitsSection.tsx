import { benefits } from '../../data/siteContent'
import { useReveal } from '../../hooks/useReveal'
import { SectionIndex } from '../ui/SectionIndex'

export function BenefitsSection() {
  const sectionRef = useReveal()

  return (
    <section
      ref={sectionRef}
      className="benefits"
      data-tone="light"
      id="journal"
      aria-labelledby="benefits-title"
    >
      <div className="benefits__header">
        <SectionIndex>04 — Why terrariums</SectionIndex>
        <h2 id="benefits-title" className="benefits__title">
          Nature, at the scale<span>of a room.</span>
        </h2>
      </div>
      <dl className="benefits__list">
        {benefits.map(({ title, note }, index) => (
          <div className="benefits__item" key={title} style={{ transitionDelay: `${index * 80}ms` }}>
            <dt>{title}</dt><dd>{note}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
