export const FRAME_COUNT = 80

export function frameUrl(index: number): string {
  const frameNumber = String(index + 1).padStart(6, '0')
  return `/frame/frame_${frameNumber}.webp`
}
