/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'
import chroma from 'chroma-js'

export default class CustomIconGenerator extends IconGenerator<'Custom'> {
  protected getPrimaryIconColor(icon: CustomIcon<'Custom'>): Color {
    return chroma(icon.presetSettings.foregroundColor)
  }

  protected drawBackground(icon: CustomIcon<'Custom'>): void {
    this.fillBackground(icon.presetSettings.backgroundColor)
  }

  protected generatePresetIconName(icon: CustomIcon<'Custom'>): string {
    const foregroundColorName = this.getHTMLColorName(icon.presetSettings.foregroundColor)
    const backgroundColorName = this.getHTMLColorName(icon.presetSettings.backgroundColor)
    return `custom-${foregroundColorName}-${backgroundColorName}`
  }
}
