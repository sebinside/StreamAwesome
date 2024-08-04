/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'
import chroma from 'chroma-js'

export default class ElgatoModernIconGenerator extends IconGenerator<'Elgato Modern'> {
  private readonly whiteColor = chroma('#FFFFFF')
  private readonly blackColor = chroma('#000000')

  protected getIconFillStyle(
    icon: CustomIcon<'Elgato Modern'>
  ): string | CanvasGradient | CanvasPattern {
    return icon.presetSettings.inverted ? this.blackColor.hex() : this.whiteColor.hex()
  }

  protected drawBackground(icon: CustomIcon<'Elgato Modern'>): void {
    const backgroundColor = icon.presetSettings.inverted ? this.whiteColor : this.blackColor
    this.fillBackground(backgroundColor.hex())
  }
  protected generatePresetIconName(icon: CustomIcon<'Elgato Modern'>): string {
    const invertedPart = icon.presetSettings.inverted ? '-inverted' : ''
    return `modern${invertedPart}`
  }
}
