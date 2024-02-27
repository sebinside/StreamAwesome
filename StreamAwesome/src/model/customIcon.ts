import type { FontFamilySuffix, FontWeight } from '@/model/fontAwesomeIcon'

export interface CustomIcon {
  backgroundColor: string
  foregroundColor: string
  unicode: string
  label: string
  fontAwesomeFontFamilySuffix: FontFamilySuffix
  fontSize: number
  fontWeight: FontWeight
}
