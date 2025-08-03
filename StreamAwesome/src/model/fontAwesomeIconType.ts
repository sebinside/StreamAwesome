import {
  BrandsKeyword,
  type FontAwesomeFamily,
  type FontAwesomeStyle,
  type FontFamilySuffix,
  type FontWeight
} from '@/model/fontAwesomeConstants'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'
import { fontAwesomeVersionInfo } from '@/model/versions'

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
      this.styles.free.some((entry) => entry.style === BrandsKeyword) ||
      this.styles.pro.some((entry) => entry.style === BrandsKeyword)
    )
  }

  static isBrandIcon(style: FontAwesomeStyle): boolean {
    return style === BrandsKeyword
  }

  static getFontFamilySuffix(icon: FontAwesomeIcon): FontFamilySuffix {
    if (icon.isBrandsIcon || icon.style === BrandsKeyword) {
      return 'Brands'
    }

    switch (icon.family) {
      case 'classic':
        return fontAwesomeVersionInfo.fontLicense
      case 'duotone':
        return 'Duotone'
      case 'sharp':
        return 'Sharp'
      case 'sharp-duotone':
        return 'Sharp Duotone'
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

  static calculateIconClassDescription(icon: FontAwesomeIcon): string {
    let styleAndFamily = `fa-${icon.style}`

    if (icon.isBrandsIcon) {
      styleAndFamily = 'fa-brands'
    } else if (icon.family === 'sharp') {
      styleAndFamily = `fa-sharp ${styleAndFamily}`
    } else if (icon.family === 'duotone') {
      styleAndFamily = 'fa-duotone'
    } else if (icon.family === 'sharp-duotone') {
      styleAndFamily = 'fa-sharp-duotone'
    }

    const id = `fa-${icon.id}`

    return `${styleAndFamily} ${id}`
  }

  static createFallBackIcon(): FontAwesomeIconType {
    const fallBackQuestionMarkIcon = new FontAwesomeIconType('question', 'Question', '3f', {
      free: [{ family: 'classic', style: 'solid' }],
      pro: [{ family: 'classic', style: 'solid' }]
    })

    return fallBackQuestionMarkIcon
  }
}
