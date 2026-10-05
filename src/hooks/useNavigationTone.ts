import { useEffect, useState } from 'react'

export function useNavigationTone(): 'dark' | 'light' {
  const [tone, setTone] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-tone]')]
    const visibleSections = new Map<Element, boolean>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => visibleSections.set(entry.target, entry.isIntersecting))
        const currentSection = sections.filter((section) => visibleSections.get(section)).at(-1)
        if (currentSection) {
          setTone(currentSection.dataset.tone === 'light' ? 'light' : 'dark')
        }
      },
      { rootMargin: '-28px 0px -100% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return tone
}
