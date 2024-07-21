/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'

export default class CustomIconGenerator extends IconGenerator<'Custom'> {
  protected getPrimaryIconColor(icon: CustomIcon<'Custom'>): Color {
    throw new Error('Method not implemented.')
  }
  protected drawBackground(icon: CustomIcon<'Custom'>): void {
    throw new Error('Method not implemented.')
  }
  protected generatePresetIconName(icon: CustomIcon<'Custom'>): string {
    throw new Error('Method not implemented.')
  }
}
