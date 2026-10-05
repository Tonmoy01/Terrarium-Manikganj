import { useRef } from 'react'
import { useFrameSequence } from '../../../hooks/useFrameSequence'

interface SequenceCanvasProps {
  progress: number
  onLoadProgress: (progress: number) => void
  onReady: () => void
}

export function SequenceCanvas({ progress, onLoadProgress, onReady }: SequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useFrameSequence({ canvasRef, progress, onLoadProgress, onReady })

  return (
    <canvas
      ref={canvasRef}
      className="hero__canvas"
      role="img"
      aria-label="A handmade terrarium lit by a single pendant lamp, the camera drawing slowly closer until it passes through the glass into the moss inside."
    />
  )
}
