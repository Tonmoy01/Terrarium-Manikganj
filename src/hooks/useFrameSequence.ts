import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import {
  createFrameOrdinals,
  createLoadQueue,
  findNearestLoadedImage,
  getDrawGeometry,
  LOAD_CONCURRENCY,
  MAX_PIXEL_RATIO,
  READY_THRESHOLD,
} from '../lib/canvasSequence'
import { frameUrl } from '../lib/frames'

interface UseFrameSequenceOptions {
  canvasRef: RefObject<HTMLCanvasElement | null>
  progress: number
  onLoadProgress: (progress: number) => void
  onReady: () => void
}

export function useFrameSequence({
  canvasRef,
  progress,
  onLoadProgress,
  onReady,
}: UseFrameSequenceOptions) {
  const progressRef = useRef(progress)
  const drawRef = useRef<() => void>(() => {})

  useEffect(() => {
    progressRef.current = progress
    drawRef.current()
  }, [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: false })
    if (!canvas || !context) return undefined

    const ordinals = createFrameOrdinals()
    const images: Array<HTMLImageElement | undefined> = new Array(ordinals.length)
    const loaded: boolean[] = new Array(ordinals.length).fill(false)
    const queue = createLoadQueue(ordinals.length)
    let animationFrame = 0
    let destroyed = false
    let loadedCount = 0
    let inFlightCount = 0
    let readyAnnounced = false

    const draw = (): void => {
      cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const bounds = canvas.getBoundingClientRect()
        const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
        const width = Math.max(1, Math.round(bounds.width * pixelRatio))
        const height = Math.max(1, Math.round(bounds.height * pixelRatio))

        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width
          canvas.height = height
        }

        const targetFrame = progressRef.current * (images.length - 1)
        const image = findNearestLoadedImage(images, loaded, targetFrame)
        if (!image) return

        const geometry = getDrawGeometry(width, height, image, progressRef.current)
        context.fillStyle = '#050505'
        context.fillRect(0, 0, width, height)
        context.drawImage(image, geometry.x, geometry.y, geometry.width, geometry.height)
      })
    }
    drawRef.current = draw

    const pumpQueue = (): void => {
      while (!destroyed && inFlightCount < LOAD_CONCURRENCY && queue.length > 0) {
        const slot = queue.shift()
        if (slot === undefined) continue
        const image = new Image()
        image.decoding = 'async'
        images[slot] = image
        inFlightCount += 1

        const finishLoad = (successful: boolean): void => {
          inFlightCount -= 1
          if (destroyed) return
          if (successful) {
            loaded[slot] = true
            loadedCount += 1
            onLoadProgress(loadedCount / ordinals.length)
            draw()
            if (!readyAnnounced && loadedCount >= ordinals.length * READY_THRESHOLD) {
              readyAnnounced = true
              onReady()
            }
          }
          pumpQueue()
        }

        image.onload = () => {
          if (typeof image.decode === 'function') {
            image.decode().then(() => finishLoad(true), () => finishLoad(true))
          } else {
            finishLoad(true)
          }
        }
        image.onerror = () => finishLoad(false)
        image.src = frameUrl(ordinals[slot])
      }
    }

    const resizeObserver = new ResizeObserver(draw)
    resizeObserver.observe(canvas)
    pumpQueue()

    return () => {
      destroyed = true
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      images.forEach((image, index) => {
        if (image && !loaded[index]) image.src = ''
      })
    }
  }, [canvasRef, onLoadProgress, onReady])
}
