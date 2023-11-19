import type { Icon, FontFamily, FontWeight } from '@/model/icon'

export default class IconGenerator {
  private renderingContext: CanvasRenderingContext2D

  public constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly fontFamilyBase: string
  ) {
    const context = canvas.getContext('2d')

    if (context == null) {
      throw new Error('Could not get rendering context from canvas element')
    } else {
      this.renderingContext = context
    }
  }

  generateIcon(icon: Icon) {
    this.fillBackground(icon.backgroundColor)
    this.drawIcon(icon)
  }

  private fillBackground(backgroundColor: string): void {
    this.renderingContext.fillStyle = backgroundColor
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawIcon(icon: Icon): void {
    const centerOfCanvas = this.canvas.width / 2
    const iconCode = this.calculateIcon(icon.symbol)

    this.setupFont(icon.symbol, icon.fontSize, icon.fontWeight, icon.fontAwesomeFontFamily)

    this.renderingContext.fillStyle = icon.foregroundColor
    this.renderingContext.fillText(iconCode, centerOfCanvas, centerOfCanvas)
  }

  private calculateIcon(iconUnicode: string): string {
    return String.fromCodePoint(parseInt(iconUnicode, 16) || 0)
  }

  private setupFont(
    iconUnicode: string,
    fontSize: number,
    fontWeight: FontWeight,
    font: FontFamily
  ): void {
    this.renderingContext.textBaseline = 'middle'
    this.renderingContext.textAlign = 'center'
    this.renderingContext.font = this.createFontString(
      fontSize,
      fontWeight,
      this.fontFamilyBase,
      font
    )

    this.adjustForWideIcons(iconUnicode, fontSize, fontWeight, font)
  }

  private adjustForWideIcons(
    iconUnicode: string,
    fontSize: number,
    fontWeight: FontWeight,
    font: FontFamily
  ) {
    const textMetrics = this.renderingContext.measureText(this.calculateIcon(iconUnicode))
    const normalizedFontSize = Math.min(fontSize, fontSize * ((fontSize + 5) / textMetrics.width))
    this.renderingContext.font = this.createFontString(
      normalizedFontSize,
      fontWeight,
      this.fontFamilyBase,
      font
    )
  }

  private createFontString(
    fontSize: number,
    fontWeight: number,
    fontFamilyBase: string,
    fontFamily: FontFamily
  ): string {
    return `${fontWeight} ${fontSize}px "${fontFamilyBase} ${fontFamily}"`
  }
}
