/* eslint-disable @typescript-eslint/no-unused-vars */
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

  protected getPrimaryIconColor(icon: CustomIcon<'Elgato Neo'>): Color {
    // TODO: Add icon only support (replace primary color by primary fill style)
    return chroma('white')
  }

  protected drawBackground(icon: CustomIcon<'Elgato Neo'>): void {
    const startColor = this.calculateColor(icon.presetSettings.hueStart, icon)
    const stopHue = (icon.presetSettings.hueStart + icon.presetSettings.hueShift) % 360
    const stopColor = this.calculateColor(stopHue, icon)
    const colorSpace = icon.presetSettings.colorSpace

    // TODO: Add translate support
    const firstInBetween = chroma.mix(startColor, stopColor, 0.33, colorSpace)
    const secondInBetween = chroma.mix(startColor, stopColor, 0.66, colorSpace)

    const colorStops = [startColor, firstInBetween, secondInBetween, stopColor]
    const gradient = icon.presetSettings.invertDirection
      ? this.generateTopLeftGradient()
      : this.generateBottomLeftGradient()

    gradient.addColorStop(0, colorStops[0].hex())
    gradient.addColorStop(0.33, colorStops[1].hex())
    gradient.addColorStop(0.66, colorStops[2].hex())
    gradient.addColorStop(1, colorStops[3].hex())

    this.renderingContext.fillStyle = gradient
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
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
