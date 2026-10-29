import type { SecondaryCorner } from '@/model/customIcon'

export const defaultSecondaryIconFontSize = 70
export const secondaryIconGap = 8
const secondaryIconMargin = 16

export function getSecondaryIconPlacement(
  corner: SecondaryCorner,
  fontSize: number,
  canvasSize: number
) {
  const radius = fontSize / 2
  if (corner === 'center') {
    return { x: canvasSize / 2, y: canvasSize / 2, radius }
  }

  const near = radius + secondaryIconMargin
  const far = canvasSize - near

  return {
    x: corner === 'tl' || corner === 'bl' ? near : far,
    y: corner === 'tl' || corner === 'tr' ? near : far,
    radius
  }
}
