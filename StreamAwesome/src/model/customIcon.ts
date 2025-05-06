import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'

export const FontAwesomePresetKeys = ['Classic', 'Modern', 'Neo', 'Custom'] as const
export type FontAwesomePreset = (typeof FontAwesomePresetKeys)[number]

export const ColorSpaceKeys = ['rgb', 'hsl', 'lab', 'lch', 'lrgb'] as const
export type ColorSpace = (typeof ColorSpaceKeys)[number]

export interface CustomIcon<T extends FontAwesomePreset> {
  fontSize: number
  fontAwesomeIcon: FontAwesomeIcon
  presetSettings: (ClassicPreset | ModernPreset | NeoPreset | CustomPreset) & {
    preset: T
  }
}

interface Preset {
  preset: FontAwesomePreset
}

interface ClassicPreset extends Preset {
  preset: (typeof FontAwesomePresetKeys)[0]
  hue: number
}

interface ModernPreset extends Preset {
  preset: (typeof FontAwesomePresetKeys)[1]
  inverted: boolean
}

export const NeoStyleKeys = [
  'White Icon',
  'Black Icon',
  'Black Background',
  'Dark Background'
] as const
export type NeoStyle = (typeof NeoStyleKeys)[number]

interface NeoPreset extends Preset {
  preset: (typeof FontAwesomePresetKeys)[2]
  invertDirection: boolean
  neoStyle: NeoStyle
  hueStart: number
  hueShift: number
  saturation: number
  translation: number
  lightness: number
  colorSpace: ColorSpace
}

interface CustomPreset extends Preset {
  preset: (typeof FontAwesomePresetKeys)[3]
  backgroundColor: string
  foregroundColor: string
}
