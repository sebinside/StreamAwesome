import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import namer from 'color-namer'
import chroma, { type Color } from 'chroma-js'

export default class ElgatoClassicIconGenerator extends IconGenerator<'Elgato Classic'> {
  private readonly colorSaturation = 0.69
  private readonly colorLightness = 0.57

  protected generatePresetIconName(icon: CustomIcon<'Elgato Classic'>): string {
    const foregroundColor = this.calculateForegroundColor(icon).hex()
    const colorName = namer(foregroundColor, { pick: ['html'] }).html[0].name
    return `elgato-classic-${colorName}`
  }

  protected getPrimaryIconColor(icon: CustomIcon<'Elgato Classic'>): Color {
    return this.calculateForegroundColor(icon)
  }

  protected drawBackground(icon: CustomIcon<'Elgato Classic'>): void {
    const backgroundColor = this.calculateBackgroundColor(icon)
    this.renderingContext.fillStyle = backgroundColor.hex()
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private calculateForegroundColor(icon: CustomIcon<'Elgato Classic'>): Color {
    return chroma.hsl(icon.presetSettings.hue, this.colorSaturation, this.colorLightness)
  }

  private calculateBackgroundColor(icon: CustomIcon<'Elgato Classic'>): Color {
    return this.calculateForegroundColor(icon).darken(4.15)
  }
}
