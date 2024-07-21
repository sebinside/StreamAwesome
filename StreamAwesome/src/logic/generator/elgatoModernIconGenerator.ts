/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'

export default class ElgatoModernIconGenerator extends IconGenerator<'Elgato Modern'> {
  generateIcon(icon: CustomIcon<'Elgato Modern'>): void {
    throw new Error('Method not implemented.')
  }
  generatePresetIconName(icon: CustomIcon<'Elgato Modern'>): string {
    throw new Error('Method not implemented.')
  }
  drawIcon(icon: CustomIcon<'Elgato Modern'>): void {
    throw new Error('Method not implemented.')
  }
}
