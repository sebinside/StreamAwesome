export class FontAwesomeIcon {
  constructor(
    public readonly id: string,
    public readonly label: string,
    public readonly unicode: string,
    public readonly membership: { readonly free: string[]; readonly pro: string[] }
  ) {}

  public isFree(): boolean {
    return this.membership.free.length > 0
  }

  public isPro(): boolean {
    return this.membership.pro.length > 0
  }

  public isBrand(): boolean {
    return this.membership.free.includes('brands') || this.membership.pro.includes('brands')
  }
}
