import type { FontAwesomeFamily, FontAwesomeStyle } from './fontAwesomeConstants'

export interface FontAwesomeIcon {
  id: string
  label: string
  unicode: string
  isBrandsIcon: boolean /* Only storing the brands information in the icon's style voids other styling information */
  style: FontAwesomeStyle
  family: FontAwesomeFamily
}
