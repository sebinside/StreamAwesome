import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'
import chroma from 'chroma-js'

export default class ElgatoNeoIconGenerator extends IconGenerator<'Elgato Neo'> {
  protected generatePresetIconName(icon: CustomIcon<'Elgato Neo'>): string {
    const startColor = this.calculateColor(icon.presetSettings.hueStart, icon)
    const foregroundColorName = this.getHTMLColorName(startColor.hex())

    const invertedPart = icon.presetSettings.invertDirection ? '-inverted' : ''
    const symbolPart = icon.presetSettings.symbolOnly ? '-symbol' : ''

    return `neo-${foregroundColorName}${invertedPart}${symbolPart}`
  }

  protected getIconFillStyle(
    icon: CustomIcon<'Elgato Neo'>
  ): string | CanvasGradient | CanvasPattern {
    if (!icon.presetSettings.symbolOnly) {
      return chroma('white').hex()
    }
    return this.calculateGradient(icon, 0)
  }

  protected getSecondaryFillStyle(
    icon: CustomIcon<'Elgato Neo'>
  ): string | CanvasGradient | CanvasPattern {
    if (!icon.presetSettings.symbolOnly) {
      return super.getSecondaryFillStyle(icon)
    }

    return this.calculateGradient(icon, 1)
  }

  protected drawBackground(icon: CustomIcon<'Elgato Neo'>): void {
    if (!icon.presetSettings.symbolOnly) {
      this.renderingContext.fillStyle = this.calculateGradient(icon, 0)
    } else {
      this.renderingContext.fillStyle = 'black'
    }
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  // FIXME: Find better way to darken the gradient
  private calculateGradient(icon: CustomIcon<'Elgato Neo'>, darken: number): CanvasGradient {
    const startColor = this.calculateColor(icon.presetSettings.hueStart, icon).darken(darken)

    // FIXME: Find a better way to do this
    const stopHue =
      (parseInt(icon.presetSettings.hueStart as unknown as string) +
        parseInt(icon.presetSettings.hueShift as unknown as string)) %
      360

    const stopColor = this.calculateColor(stopHue, icon).darken(darken)
    const colorSpace = icon.presetSettings.colorSpace

    const firstInBetween = chroma.mix(
      startColor,
      stopColor,
      this.calculateTranslate(0.33, icon),
      colorSpace
    )
    const secondInBetween = chroma.mix(
      startColor,
      stopColor,
      this.calculateTranslate(0.66, icon),
      colorSpace
    )

    const colorStops = [startColor, firstInBetween, secondInBetween, stopColor]
    const gradient = icon.presetSettings.invertDirection
      ? this.generateBottomLeftGradient()
      : this.generateTopLeftGradient()

    gradient.addColorStop(0, colorStops[0].hex())
    gradient.addColorStop(this.calculateTranslate(0.33, icon), colorStops[1].hex())
    gradient.addColorStop(this.calculateTranslate(0.66, icon), colorStops[2].hex())
    gradient.addColorStop(1, colorStops[3].hex())

    return gradient
  }

  private calculateTranslate(value: number, icon: CustomIcon<'Elgato Neo'>): number {
    // FIXME: Find a better way to do this
    return Math.max(
      0.01,
      Math.min(0.99, value + parseFloat(icon.presetSettings.translation as unknown as string))
    )
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

  private calculateColor(hue: number, icon: CustomIcon<'Elgato Neo'>): Color {
    return chroma.hsl(hue, icon.presetSettings.saturation, icon.presetSettings.lightness)
  }
}
