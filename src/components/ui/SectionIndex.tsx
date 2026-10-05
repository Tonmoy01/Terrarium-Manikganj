import type { ReactNode } from 'react'

interface SectionIndexProps {
  children: ReactNode
}

export function SectionIndex({ children }: SectionIndexProps) {
  return <p className="section-index">{children}</p>
}
