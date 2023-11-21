export class FontAwesomeIcon {
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
}

export interface FontAwesomeFamilyStyle {
  readonly family: 'classic' | 'duotone' | 'sharp'
  readonly style: 'solid' | 'regular' | 'light' | 'thin' | 'brands'
}
