/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'

export default class CustomIconGenerator extends IconGenerator<'Custom'> {
  generateIcon(icon: CustomIcon<'Custom'>): void {
    throw new Error('Method not implemented.')
  }
  generatePresetIconName(icon: CustomIcon<'Custom'>): string {
    throw new Error('Method not implemented.')
  }
  drawIcon(icon: CustomIcon<'Custom'>): void {
    throw new Error('Method not implemented.')
  }
}
