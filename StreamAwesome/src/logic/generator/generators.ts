import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import CustomIconGenerator from '@/logic/generator/customIconGenerator'
import ElgatoClassicIconGenerator from '@/logic/generator/elgatoClassicGenerator'
import ElgatoModernIconGenerator from '@/logic/generator/elgatoModernIconGenerator'
import ElgatoNeoIconGenerator from '@/logic/generator/elgatoNeoIconGenerator'
import type IconGenerator from '@/logic/generator/iconGenerator'

export function getMatchingGenerator<T extends FontAwesomePreset>(
  icon: CustomIcon<T>,
  canvas?: HTMLCanvasElement
): IconGenerator<T> {
  switch (icon.presetSettings.preset) {
    case 'Custom':
      return new CustomIconGenerator(canvas) as IconGenerator<T>
    case 'Elgato Classic':
      return new ElgatoClassicIconGenerator(canvas) as IconGenerator<T>
    case 'Elgato Modern':
      return new ElgatoModernIconGenerator(canvas) as IconGenerator<T>
    case 'Elgato Neo':
      return new ElgatoNeoIconGenerator(canvas) as IconGenerator<T>
    default:
      throw new Error('Preset not supported')
  }
}
