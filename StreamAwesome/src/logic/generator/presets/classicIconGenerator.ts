import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import chroma, { type Color } from 'chroma-js'

export default class ClassicIconGenerator extends IconGenerator<'Classic'> {
  private readonly colorSaturation = 0.69
  private readonly colorLightness = 0.57

  protected getIconFillStyle(icon: CustomIcon<'Classic'>): string | CanvasGradient | CanvasPattern {
    return this.calculateForegroundColor(icon).hex()
  }

  protected generatePresetIconName(icon: CustomIcon<'Classic'>): string {
    const foregroundColor = this.calculateForegroundColor(icon).hex()
    const colorName = this.getHTMLColorName(foregroundColor)
    return `classic-${colorName}`
  }

  protected drawBackground(icon: CustomIcon<'Classic'>): void {
    const backgroundColor = this.calculateBackgroundColor(icon)
    this.fillBackground(backgroundColor.hex())
  }

  private calculateForegroundColor(icon: CustomIcon<'Classic'>): Color {
    return chroma.hsl(icon.presetSettings.hue, this.colorSaturation, this.colorLightness)
  }

  private calculateBackgroundColor(icon: CustomIcon<'Classic'>): Color {
    return this.calculateForegroundColor(icon).darken(4.15)
  }
}
