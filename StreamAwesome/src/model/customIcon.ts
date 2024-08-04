import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'

export const FontAwesomePresetKeys = [
  'Elgato Classic',
  'Elgato Modern',
  'Elgato Neo',
  'Custom'
] as const
export type FontAwesomePreset = (typeof FontAwesomePresetKeys)[number]

export const ColorSpaceKeys = ['rgb', 'hsl', 'lab', 'lch', 'lrgb'] as const
export type ColorSpace = (typeof ColorSpaceKeys)[number]

export interface CustomIcon<T extends FontAwesomePreset> {
  fontSize: number
  fontAwesomeIcon: FontAwesomeIcon
  presetSettings: (ElgatoClassicPreset | ElgatoModernPreset | ElgatoNeoPreset | CustomPreset) & {
    preset: T
  }
}

interface Preset {
  preset: FontAwesomePreset
}

interface ElgatoClassicPreset extends Preset {
  preset: (typeof FontAwesomePresetKeys)[0]
  hue: number
}

interface ElgatoModernPreset extends Preset {
  preset: (typeof FontAwesomePresetKeys)[1]
  inverted: boolean
}

interface ElgatoNeoPreset extends Preset {
  preset: (typeof FontAwesomePresetKeys)[2]
  invertDirection: boolean
  symbolOnly: boolean
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
