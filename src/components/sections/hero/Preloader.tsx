import { useEffect, useState } from 'react'

interface PreloaderProps {
  loadProgress: number
  isReady: boolean
}

export function Preloader({ loadProgress, isReady }: PreloaderProps) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', !isReady)
    if (!isReady) return undefined

    const timer = window.setTimeout(() => setIsHidden(true), 900)
    return () => window.clearTimeout(timer)
  }, [isReady])

  if (isHidden) return null

  return (
    <div className={`preloader${isReady ? ' preloader--out' : ''}`} role="status" aria-live="polite">
      <p className="preloader__text">
        <span>Entering the garden</span>
        <span className="preloader__percent">{Math.round(loadProgress * 100)}%</span>
      </p>
      <span className="preloader__rule" aria-hidden="true">
        <span style={{ transform: `scaleX(${Math.max(0.02, loadProgress)})` }} />
      </span>
    </div>
  )
}
