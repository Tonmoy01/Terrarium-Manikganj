import { FRAME_COUNT } from './frames'

export const MAX_PIXEL_RATIO = 2
export const LOAD_CONCURRENCY = 6
export const READY_THRESHOLD = 0.35

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value))
}

export function createFrameOrdinals(): number[] {
  const isMobile = window.matchMedia('(max-width: 768px)').matches
  return Array.from({ length: FRAME_COUNT }, (_, index) => index).filter(
    (index) => !isMobile || index % 2 === 0,
  )
}

export function createLoadQueue(frameCount: number): number[] {
  const queue = [0]
  for (let index = 6; index < frameCount; index += 7) queue.push(index)
  for (let index = 1; index < frameCount; index += 1) {
    if (!queue.includes(index)) queue.push(index)
  }
  return queue
}

export function findNearestLoadedImage(
  images: Array<HTMLImageElement | undefined>,
  loaded: boolean[],
  target: number,
): HTMLImageElement | null {
  const frameIndex = clamp(Math.round(target), 0, images.length - 1)
  if (loaded[frameIndex]) return images[frameIndex] ?? null

  for (let offset = 1; offset < images.length; offset += 1) {
    if (frameIndex - offset >= 0 && loaded[frameIndex - offset]) {
      return images[frameIndex - offset] ?? null
    }
    if (frameIndex + offset < images.length && loaded[frameIndex + offset]) {
      return images[frameIndex + offset] ?? null
    }
  }

  return null
}

export function getDrawGeometry(
  canvasWidth: number,
  canvasHeight: number,
  image: HTMLImageElement,
  progress: number,
) {
  const aspectRatio = canvasWidth / canvasHeight
  const mobileFactor = clamp((1.4 - aspectRatio) / 0.9, 0, 1)
  const inwardProgress = clamp((progress - 0.32) / 0.26, 0, 1)
  const easedProgress = inwardProgress * inwardProgress * (3 - 2 * inwardProgress)
  const coverScale = Math.max(canvasWidth / image.naturalWidth, canvasHeight / image.naturalHeight)
  const containScale = Math.min(canvasWidth / image.naturalWidth, canvasHeight / image.naturalHeight)
  const startingBias = 1 - 0.5 * mobileFactor
  const scaleBias = startingBias + (1 - startingBias) * easedProgress
  const scale = containScale + (coverScale - containScale) * scaleBias
  const width = image.naturalWidth * scale
  const height = image.naturalHeight * scale
  const verticalAnchor = 0.5 - 0.3 * mobileFactor * (1 - easedProgress)

  return {
    x: (canvasWidth - width) / 2,
    y: (canvasHeight - height) * verticalAnchor,
    width,
    height,
  }
}
