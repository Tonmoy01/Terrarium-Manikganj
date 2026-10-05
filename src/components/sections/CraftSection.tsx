import { materials } from '../../data/siteContent'
import { useReveal } from '../../hooks/useReveal'
import { frameUrl } from '../../lib/frames'
import { SectionIndex } from '../ui/SectionIndex'

export function CraftSection() {
  const introRef = useReveal<HTMLDivElement>()
  const imageRef = useReveal<HTMLDivElement>({ threshold: 0.1 })
  const materialsRef = useReveal<HTMLDivElement>()

  return (
    <section className="craft" data-tone="dark" id="craft" aria-labelledby="craft-title">
      <div className="craft__layout">
        <div ref={introRef} className="craft__intro">
          <SectionIndex>03 — The craft</SectionIndex>
          <h2 id="craft-title" className="craft__title">
            Built by hand.<span>Grown over time.</span>
          </h2>
          <p className="craft__body">
            A terrarium is planted once and then left alone. That single chance shapes everything
            — the depth of the drainage, where the light will fall in a year, which moss will hold
            its colour in the shade of a fern. We plant slowly, and then we wait.
          </p>
        </div>

        <div ref={imageRef} className="craft__plate craft__plate--tall">
          <img
            src={frameUrl(47)}
            alt="Condensation beading on terrarium glass, moss and stone beyond"
            loading="lazy"
            width="1920"
            height="1080"
          />
          <p className="craft__caption">Water cycles inside the glass, day after day.</p>
        </div>

        <div ref={materialsRef} className="craft__materials">
          <ol>
            {materials.map(({ name, note }, index) => (
              <li key={name} style={{ transitionDelay: `${index * 70}ms` }}>
                <h3>{name}</h3><p>{note}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="craft__plate craft__plate--wide">
          <img
            src={frameUrl(79)}
            alt="Close view inside a planted terrarium with club moss, pebbles and a hanging droplet"
            loading="lazy"
            width="1920"
            height="1080"
          />
        </div>
      </div>
    </section>
  )
}
