import { useEffect, useRef } from 'react'

interface RevealOptions {
  threshold?: number
  rootMargin?: string
}

export function useReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.18,
  rootMargin = '0px 0px -8% 0px',
}: RevealOptions = {}) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.setAttribute('data-revealed', '')
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.setAttribute('data-revealed', '')
        observer.disconnect()
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return ref
}
