/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'
import chroma from 'chroma-js'

export default class ElgatoNeoIconGenerator extends IconGenerator<'Elgato Neo'> {
  private readonly colorSaturation = 0.69
  private readonly colorLightness = 0.57

  protected getPrimaryIconColor(icon: CustomIcon<'Elgato Neo'>): Color {
    return chroma('white')
  }

  protected drawBackground(icon: CustomIcon<'Elgato Neo'>): void {
    const startColor = this.calculateColor(icon.presetSettings.hueStart)
    const stopColor = this.calculateColor(icon.presetSettings.hueStop)

    let gradient = this.generateTopLeftGradient(startColor, stopColor)
    if (icon.presetSettings.invertDirection) {
      gradient = this.generateBottomLeftGradient(startColor, stopColor)
    }

    this.renderingContext.fillStyle = gradient
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  protected generatePresetIconName(icon: CustomIcon<'Elgato Neo'>): string {
    const startColor = this.calculateColor(icon.presetSettings.hueStart)
    const stopColor = this.calculateColor(icon.presetSettings.hueStop)

    const foregroundColorName = this.getHTMLColorName(startColor.hex())
    const backgroundColorName = this.getHTMLColorName(stopColor.hex())

    const invertedPart = icon.presetSettings.invertDirection ? '-inverted' : ''

    return `neo-${foregroundColorName}-${backgroundColorName}${invertedPart}`
  }

  private generateTopLeftGradient(startColor: Color, stopColor: Color): CanvasGradient {
    const gradient = this.renderingContext.createLinearGradient(0, 0, this.canvas.width, this.canvas.height)
    gradient.addColorStop(0, startColor.hex())
    gradient.addColorStop(1, stopColor.hex())

    return gradient
  }

  private generateBottomLeftGradient(startColor: Color, stopColor: Color): CanvasGradient {
    const gradient = this.renderingContext.createLinearGradient(0, this.canvas.width, this.canvas.width, 0)
    gradient.addColorStop(0, startColor.hex())
    gradient.addColorStop(1, stopColor.hex())

    return gradient
  }

  private calculateColor(hue: number): Color {
    return chroma.hsl(hue, this.colorSaturation, this.colorLightness)
  }
}
