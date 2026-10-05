import { useReveal } from '../../hooks/useReveal'
import { frameUrl } from '../../lib/frames'
import { ArrowIcon } from '../ui/Icons'
import { SectionIndex } from '../ui/SectionIndex'

export function ClosingSection() {
  const sectionRef = useReveal({ threshold: 0.25 })

  return (
    <section
      ref={sectionRef}
      className="closing"
      data-tone="dark"
      aria-labelledby="closing-title"
    >
      <img
        className="closing__backdrop"
        src={frameUrl(71)}
        alt=""
        aria-hidden="true"
        loading="lazy"
      />
      <div className="closing__inner">
        <SectionIndex>05</SectionIndex>
        <h2 id="closing-title" className="closing__title">
          Your little world<span>is waiting.</span>
        </h2>
        <a className="button button--primary button--large" href="#collection">
          <span>Shop Terrariums</span><ArrowIcon />
        </a>
      </div>
    </section>
  )
}
