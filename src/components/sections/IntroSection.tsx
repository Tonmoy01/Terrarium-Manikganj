import { useReveal } from '../../hooks/useReveal'
import { SectionIndex } from '../ui/SectionIndex'

export function IntroSection() {
  const sectionRef = useReveal()

  return (
    <section
      ref={sectionRef}
      className="intro"
      data-tone="dark"
      id="intro"
      aria-labelledby="intro-title"
    >
      <div className="intro__inner">
        <SectionIndex>01 — Introduction</SectionIndex>
        <h2 id="intro-title" className="intro__title">
          A living landscape,<span>in miniature.</span>
        </h2>
        <p className="intro__body">
          Each terrarium is carefully composed by hand in Manikganj, balancing texture, light,
          stone and living plants inside a self-contained little world.
        </p>
      </div>
    </section>
  )
}
