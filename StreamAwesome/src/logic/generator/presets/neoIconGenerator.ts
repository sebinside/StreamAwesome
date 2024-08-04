import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'
import chroma from 'chroma-js'

export default class NeoIconGenerator extends IconGenerator<'Neo'> {
  protected generatePresetIconName(icon: CustomIcon<'Neo'>): string {
    const startColor = this.calculateColor(icon.presetSettings.hueStart, icon)
    const foregroundColorName = this.getHTMLColorName(startColor.hex())

    const invertedPart = icon.presetSettings.invertDirection ? '-inverted' : ''
    const symbolPart = icon.presetSettings.symbolOnly ? '-symbol' : ''

    return `neo-${foregroundColorName}${invertedPart}${symbolPart}`
  }

  protected getIconFillStyle(icon: CustomIcon<'Neo'>): string | CanvasGradient | CanvasPattern {
    if (!icon.presetSettings.symbolOnly) {
      return chroma('white').hex()
    }
    return this.calculateGradient(icon, this.calculateColors(icon))
  }

  protected getSecondaryFillStyle(
    icon: CustomIcon<'Neo'>
  ): string | CanvasGradient | CanvasPattern {
    if (!icon.presetSettings.symbolOnly) {
      return super.getSecondaryFillStyle(icon)
    }

    const colors = this.calculateColors(icon)
    return this.calculateGradient(icon, {
      start: colors.start.darken(1),
      stop: colors.stop.darken(1)
    })
  }

  protected drawBackground(icon: CustomIcon<'Neo'>): void {
    if (!icon.presetSettings.symbolOnly) {
      this.renderingContext.fillStyle = this.calculateGradient(icon, this.calculateColors(icon))
    } else {
      this.renderingContext.fillStyle = 'black'
    }
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
  private calculateGradient(
    icon: CustomIcon<'Neo'>,
    colors: { start: Color; stop: Color }
  ): CanvasGradient {
    const colorSpace = icon.presetSettings.colorSpace

    const firstInBetween = chroma.mix(
      colors.start,
      colors.stop,
      this.calculateTranslate(this.calculateTranslate(0.33, icon), icon),
      colorSpace
    )

    const secondInBetween = chroma.mix(
      colors.start,
      colors.stop,
      this.calculateTranslate(this.calculateTranslate(0.66, icon), icon),
      colorSpace
    )

    const colorStops = [colors.start, firstInBetween, secondInBetween, colors.stop]
    const gradient = icon.presetSettings.invertDirection
      ? this.generateBottomLeftGradient()
      : this.generateTopLeftGradient()

    gradient.addColorStop(0, colorStops[0].hex())
    gradient.addColorStop(this.calculateTranslate(0.33, icon), colorStops[1].hex())
    gradient.addColorStop(this.calculateTranslate(0.66, icon), colorStops[2].hex())
    gradient.addColorStop(1, colorStops[3].hex())

    return gradient
  }

  private calculateColors(icon: CustomIcon<'Neo'>): { start: Color; stop: Color } {
    const startColor = this.calculateColor(icon.presetSettings.hueStart, icon)

    const stopHue = (icon.presetSettings.hueStart + icon.presetSettings.hueShift) % 360

    const stopColor = this.calculateColor(stopHue, icon)

    return { start: startColor, stop: stopColor }
  }

  private calculateTranslate(value: number, icon: CustomIcon<'Neo'>): number {
    return Math.max(0.01, Math.min(0.99, value + icon.presetSettings.translation))
  }

  private generateTopLeftGradient(): CanvasGradient {
    const gradient = this.renderingContext.createLinearGradient(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    )
    return gradient
  }

  private generateBottomLeftGradient(): CanvasGradient {
    const gradient = this.renderingContext.createLinearGradient(
      0,
      this.canvas.width,
      this.canvas.width,
      0
    )
    return gradient
  }

  private calculateColor(hue: number, icon: CustomIcon<'Neo'>): Color {
    return chroma.hsl(hue, icon.presetSettings.saturation, icon.presetSettings.lightness)
  }
}
