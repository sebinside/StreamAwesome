import type Icon from '@/model/icon'

export default class IconGenerator {
  private renderingContext: CanvasRenderingContext2D

  public constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')

    if (context == null) {
      throw new Error('Could not get rendering context from canvas element')
    } else {
      this.renderingContext = context
    }
  }

  private fillBackground(backgroundColor: string): void {
    const canvasStartIndex = 0
    this.renderingContext.fillStyle = backgroundColor
    this.renderingContext.fillRect(
      canvasStartIndex,
      canvasStartIndex,
      this.canvas.width,
      this.canvas.height
    )
  }

  private drawIcon(icon: Icon): void {
    const centerOfCanvas = this.canvas.width / 2
    const iconCode = this.calculateIcon(icon.symbol)

    this.setupFont(icon.symbol, icon.fontSize, icon.fontAwesomeFontFamily)

    this.renderingContext.fillStyle = icon.foregroundColor
    this.renderingContext.fillText(iconCode, centerOfCanvas, centerOfCanvas)
  }

  private calculateIcon(iconUnicode: string): string {
    return String.fromCodePoint(parseInt(iconUnicode, 16))
  }

  private setupFont(iconUnicode: string, fontSize: number, font: 'Pro' | 'Duotone'): void {
    this.renderingContext.textBaseline = 'middle'
    this.renderingContext.textAlign = 'center'

    // TODO: Update or remove this with later versions of Font Awesome
    const textMetrics = this.renderingContext.measureText(this.calculateIcon(iconUnicode))
    const normalizedFontSize = Math.min(fontSize, fontSize * ((fontSize + 5) / textMetrics.width))
    this.renderingContext.font = `900 ${normalizedFontSize}px "Font Awesome 6 ${font}"`
  }

  generateIcon(icon: Icon) {
    this.fillBackground(icon.backgroundColor)
    this.drawIcon(icon)
  }
}
