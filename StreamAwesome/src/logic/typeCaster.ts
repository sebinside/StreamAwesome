import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import type { FontFamily } from '@/model/icon'

export default class TypeCaster {
  public static fontFamilyFromIcon(icon: FontAwesomeIcon): FontFamily {
    let fontFamily = 'Pro'
    if (icon.isBrand()) fontFamily = 'Brands'
    else if (icon.isFree()) fontFamily = 'Free'
    return fontFamily as FontFamily
  }
}
