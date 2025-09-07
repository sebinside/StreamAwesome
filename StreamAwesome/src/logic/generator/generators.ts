import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import CustomIconGenerator from '@/logic/generator/presets/customIconGenerator'
import ClassicIconGenerator from '@/logic/generator/presets/classicIconGenerator'
import ModernIconGenerator from '@/logic/generator/presets/modernIconGenerator'
import NeoIconGenerator from '@/logic/generator/presets/neoIconGenerator'
import type IconGenerator from '@/logic/generator/iconGenerator'

export function getMatchingGenerator<T extends FontAwesomePreset>(
  icon: CustomIcon<T>,
  canvas?: HTMLCanvasElement
): IconGenerator<T> {
  switch (icon.presetSettings.preset) {
    case 'Custom':
      return new CustomIconGenerator(canvas) as IconGenerator<T>
    case 'Classic':
      return new ClassicIconGenerator(canvas) as IconGenerator<T>
    case 'Modern':
      return new ModernIconGenerator(canvas) as IconGenerator<T>
    case 'Neo':
      return new NeoIconGenerator(canvas) as IconGenerator<T>
    default:
      throw new Error('Preset not supported')
  }
}

export function triggerGenerator(icon: CustomIcon<FontAwesomePreset>, canvas: HTMLCanvasElement) {
  const iconGenerator = getMatchingGenerator(icon, canvas)
  iconGenerator.generateIcon(icon)
}
