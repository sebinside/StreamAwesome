import type { FontAwesomeIcon } from './fontAwesomeIcon'

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
