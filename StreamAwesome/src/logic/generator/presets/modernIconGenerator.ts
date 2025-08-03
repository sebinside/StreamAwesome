import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import chroma from 'chroma-js'

export default class ModernIconGenerator extends IconGenerator<'Modern'> {
  private readonly whiteColor = chroma('#FFFFFF')
  private readonly blackColor = chroma('#000000')

  protected getIconFillStyle(icon: CustomIcon<'Modern'>): string | CanvasGradient | CanvasPattern {
    return icon.presetSettings.inverted ? this.blackColor.hex() : this.whiteColor.hex()
  }

  protected drawBackground(icon: CustomIcon<'Modern'>): void {
    const backgroundColor = icon.presetSettings.inverted ? this.whiteColor : this.blackColor
    this.fillBackground(backgroundColor.hex())
  }
  protected generatePresetIconName(icon: CustomIcon<'Modern'>): string {
    const invertedPart = icon.presetSettings.inverted ? '-inverted' : ''
    return `modern${invertedPart}`
  }
}
