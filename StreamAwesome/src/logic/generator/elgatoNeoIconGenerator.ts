/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'

export default class ElgatoNeoIconGenerator extends IconGenerator<'Elgato Neo'> {
  generateIcon(icon: CustomIcon<'Elgato Neo'>): void {
    throw new Error('Method not implemented.')
  }
  generatePresetIconName(icon: CustomIcon<'Elgato Neo'>): string {
    throw new Error('Method not implemented.')
  }
  drawIcon(icon: CustomIcon<'Elgato Neo'>): void {
    throw new Error('Method not implemented.')
  }
}
