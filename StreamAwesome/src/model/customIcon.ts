import type { FontAwesomeIcon } from './fontAwesomeIcon'

export const FontAwesomePresetKeys = [
  'Elgato Classic',
  'Elgato Modern',
  'Elgato Neo',
  'Custom'
] as const
export type FontAwesomePreset = (typeof FontAwesomePresetKeys)[number]
export type ColorSpace = 'rgb' | 'hsl' | 'lab' | 'lch' | 'lrgb'

// TODO: Replace CustomIcon with NextGenCustomIcon
export interface NextGenCustomIcon {
  fontSize: number
  fontAwesomeIcon: FontAwesomeIcon
  presetSettings: ElgatoClassicPreset | ElgatoModernPreset | ElgatoNeoPreset | CustomPreset
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
  hueStop: number
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

export interface CustomIcon {
  backgroundColor: string
  foregroundColor: string
  fontSize: number
  fontAwesomeIcon: FontAwesomeIcon
}
export interface ColorValue {
  key: 'h' | 's' | 'l'
  value: number
}
