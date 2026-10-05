import type { JSX } from 'react'

export function ArrowIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15m0 0-6-6m6 6-6 6" />
    </svg>
  )
}

export function BagIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8" />
    </svg>
  )
}

export function SearchIcon(): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  )
}
