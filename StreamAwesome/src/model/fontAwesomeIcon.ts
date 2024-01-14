export class FontAwesomeIcon {
  static readonly fontVersionInfo: {
    fontFamilyBase: string
    fontVersion: string
    fontLicense: 'Free' | 'Pro'
  } = {
    fontFamilyBase: 'Font Awesome 6',
    fontVersion: '6.4.2',
    fontLicense: 'Pro'
  }

  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly unicode: string,
    public readonly styles: {
      readonly free: FontAwesomeFamilyStyle[]
      readonly pro: FontAwesomeFamilyStyle[]
    }
  ) {}

  public isFree(): boolean {
    return this.styles.free.length > 0
  }

  public isPro(): boolean {
    return this.styles.pro.length > 0
  }

  public isBrand(): boolean {
    const brandKeyword = 'brands'

    return (
      this.styles.free.some((entry) => entry.style === brandKeyword) ||
      this.styles.pro.some((entry) => entry.style === brandKeyword)
    )
  }

  static getFontFamilySuffix(familyStyle: FontAwesomeFamilyStyle): FontFamilySuffix {
    switch (familyStyle.family) {
      case 'classic':
        if (familyStyle.style === 'brands') {
          return 'Brands'
        } else {
          return this.fontVersionInfo.fontLicense
        }
      case 'duotone':
        return 'Duotone'
      case 'sharp':
        return 'Sharp'
    }
  }

  static getFontWeight(style: FontAwesomeStyle): FontWeight {
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
    }
  }
}

export interface FontAwesomeFamilyStyle {
  readonly family: FontAwesomeFamily
  readonly style: FontAwesomeStyle
}

export type FontAwesomeFamily = 'classic' | 'duotone' | 'sharp'
export type FontAwesomeStyle = 'solid' | 'regular' | 'light' | 'thin' | 'brands'
export type FontFamilySuffix = 'Free' | 'Pro' | 'Duotone' | 'Sharp' | 'Brands'
export type FontWeight = 100 | 300 | 400 | 900
