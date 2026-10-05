import { useCallback, useEffect, useRef, useState } from 'react'
import { useHeroScrollAnimation } from '../../../hooks/useHeroScrollAnimation'
import { ArrowIcon } from '../../ui/Icons'
import { Preloader } from './Preloader'
import { SequenceCanvas } from './SequenceCanvas'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const handleReady = useCallback(() => setIsReady(true), [])

  useHeroScrollAnimation({
    sectionRef,
    copyRef,
    veilRef,
    indicatorRef,
    onProgress: setScrollProgress,
  })

  useEffect(() => {
    const fallbackTimer = window.setTimeout(handleReady, 6000)
    return () => window.clearTimeout(fallbackTimer)
  }, [handleReady])

  return (
    <>
      <Preloader loadProgress={loadProgress} isReady={isReady} />
      <section
        ref={sectionRef}
        className="hero"
        data-tone="dark"
        id="top"
        aria-label="Introducing Terrarium Manikganj"
      >
        <div className="hero__stage">
          <SequenceCanvas
            progress={scrollProgress}
            onLoadProgress={setLoadProgress}
            onReady={handleReady}
          />
          <div ref={veilRef} className="hero__veil" aria-hidden="true" />
          <div className="hero__content">
            <div ref={copyRef} className="hero__copy">
              <p className="hero__eyebrow">A little world, alive</p>
              <h1 className="hero__headline">Bring Nature<span>Closer.</span></h1>
              <p className="hero__support">
                Handcrafted terrariums designed to bring a living world into your everyday space.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#collection">
                  <span>Explore Terrariums</span><ArrowIcon />
                </a>
                <a className="button button--quiet" href="#craft">Discover the Craft</a>
              </div>
            </div>
          </div>
          <div ref={indicatorRef} className="scroll-indicator" aria-hidden="true">
            <span className="scroll-indicator__label">Scroll to explore</span>
            <span className="scroll-indicator__line" />
          </div>
        </div>
      </section>
    </>
  )
}
