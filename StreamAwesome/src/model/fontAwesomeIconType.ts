import { fontAwesomeVersionInfo } from './versions'

export const FontAwesomeFamilyKeys = ['classic', 'sharp', 'duotone']
export const FontAwesomeStyleKeys = ['solid', 'regular', 'light', 'thin', 'brands']
export const FontFamilySuffixKeys = ['Free', 'Pro', 'Duotone', 'Sharp', 'Brands']
const brandsKeyword = 'brands'

export type FontAwesomeFamily = (typeof FontAwesomeFamilyKeys)[number]
export type FontAwesomeStyle = (typeof FontAwesomeStyleKeys)[number]
export type FontFamilySuffix = (typeof FontFamilySuffixKeys)[number]
export type FontWeight = 100 | 300 | 400 | 900

export class FontAwesomeIconType {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly unicode: string,
    public readonly styles: {
      readonly free: { readonly family: FontAwesomeFamily; readonly style: FontAwesomeStyle }[]
      readonly pro: { readonly family: FontAwesomeFamily; readonly style: FontAwesomeStyle }[]
    }
  ) {}

  public isFree(): boolean {
    return this.styles.free.length > 0
  }

  public isPro(): boolean {
    return this.styles.pro.length > 0
  }

  public isBrand(): boolean {
    return (
      this.styles.free.some((entry) => entry.style === brandsKeyword) ||
      this.styles.pro.some((entry) => entry.style === brandsKeyword)
    )
  }

  static isBrandIcon(style: FontAwesomeStyle): boolean {
    return style === brandsKeyword
  }

  static getFontFamilySuffix(family: FontAwesomeFamily, style: FontAwesomeStyle): FontFamilySuffix {
    if (style === brandsKeyword) {
      return 'Brands'
    }

    switch (family) {
      case 'classic':
        return fontAwesomeVersionInfo.fontLicense
      case 'duotone':
        return 'Duotone'
      case 'sharp':
        return 'Sharp'
      default:
        return fontAwesomeVersionInfo.fontLicense
    }
  }

  static getFontWeightOfStyle(style: FontAwesomeStyle): FontWeight {
    switch (style) {
      case 'solid':
        return 900
      case 'regular':
        return 400
      case 'light':
        return 300
      case 'thin':
        return 100
      case 'brands':
        return 400
      default:
        return 900
    }
  }
}
