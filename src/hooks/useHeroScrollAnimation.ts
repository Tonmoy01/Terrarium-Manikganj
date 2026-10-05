import { useLayoutEffect } from 'react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface UseHeroScrollAnimationOptions {
  sectionRef: RefObject<HTMLElement | null>
  copyRef: RefObject<HTMLDivElement | null>
  veilRef: RefObject<HTMLDivElement | null>
  indicatorRef: RefObject<HTMLDivElement | null>
  onProgress: (progress: number) => void
}

export function useHeroScrollAnimation({
  sectionRef,
  copyRef,
  veilRef,
  indicatorRef,
  onProgress,
}: UseHeroScrollAnimationOptions) {
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onProgress(0.3)
      return undefined
    }

    const section = sectionRef.current
    const copy = copyRef.current
    const veil = veilRef.current
    const indicator = indicatorRef.current
    if (!section || !copy || !veil || !indicator) return undefined

    const context = gsap.context(() => {
      const playhead = { value: 0 }

      gsap.to(playhead, {
        value: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
        onUpdate: () => onProgress(playhead.value),
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      })
        .fromTo(
          copy,
          { opacity: 1, y: 0 },
          { opacity: 1, y: -18, ease: 'none', duration: 0.1 },
        )
        .to(copy, { opacity: 0, y: -64, ease: 'power1.in', duration: 0.22 })
        .to(veil, { opacity: 0, ease: 'none', duration: 0.18 }, '<')
        .to({}, { duration: 0.7 })

      gsap.to(indicator, {
        opacity: 0,
        y: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '6% top',
          scrub: 0.35,
        },
      })
    }, section)

    return () => context.revert()
  }, [copyRef, indicatorRef, onProgress, sectionRef, veilRef])
}
