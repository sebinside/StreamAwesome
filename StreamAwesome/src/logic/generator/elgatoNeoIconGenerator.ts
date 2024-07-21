/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import type { Color } from 'chroma-js'

export default class ElgatoNeoIconGenerator extends IconGenerator<'Elgato Neo'> {
  protected getPrimaryIconColor(icon: CustomIcon<'Elgato Neo'>): Color {
    throw new Error('Method not implemented.')
  }
  protected drawBackground(icon: CustomIcon<'Elgato Neo'>): void {
    throw new Error('Method not implemented.')
  }
  protected generatePresetIconName(icon: CustomIcon<'Elgato Neo'>): string {
    throw new Error('Method not implemented.')
  }
}
