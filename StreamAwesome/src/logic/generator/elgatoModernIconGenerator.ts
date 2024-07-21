/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'

export default class ElgatoModernIconGenerator extends IconGenerator<'Elgato Modern'> {
  protected getPrimaryIconColor(icon: CustomIcon<'Elgato Modern'>): Color {
    throw new Error('Method not implemented.')
  }
  protected drawBackground(icon: CustomIcon<'Elgato Modern'>): void {
    throw new Error('Method not implemented.')
  }
  protected generatePresetIconName(icon: CustomIcon<'Elgato Modern'>): string {
    throw new Error('Method not implemented.')
  }
}
