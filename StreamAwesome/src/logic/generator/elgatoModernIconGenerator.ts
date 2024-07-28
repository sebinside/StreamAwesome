/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'
import chroma from 'chroma-js'

export default class ElgatoModernIconGenerator extends IconGenerator<'Elgato Modern'> {
  private readonly whiteColor = chroma('#FFFFFF')
  private readonly blackColor = chroma('#000000')

  protected getPrimaryIconColor(icon: CustomIcon<'Elgato Modern'>): Color {
    return icon.presetSettings.inverted ? this.blackColor : this.whiteColor
  }
  protected drawBackground(icon: CustomIcon<'Elgato Modern'>): void {
    const backgroundColor = icon.presetSettings.inverted ? this.whiteColor : this.blackColor
    this.renderingContext.fillStyle = backgroundColor.hex()
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }
  protected generatePresetIconName(icon: CustomIcon<'Elgato Modern'>): string {
    const invertedPart = icon.presetSettings.inverted ? '-inverted' : ''
    return `elgato-modern${invertedPart}`
  }
}
