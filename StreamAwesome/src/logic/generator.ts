import type { CustomIcon } from '@/model/customIcon'
import type { FontFamilySuffix, FontWeight } from '@/model/fontAwesomeIcon'
import chroma from 'chroma-js'

export default class IconGenerator {
  private renderingContext: CanvasRenderingContext2D

  private defaultCanvasSize = 256
  private readonly canvas: HTMLCanvasElement

  public constructor(
    private readonly fontFamilyBase: string,
    canvas?: HTMLCanvasElement
  ) {
    if (canvas) {
      this.canvas = canvas
    } else {
      this.canvas = document.createElement('canvas')
      this.canvas.width = this.defaultCanvasSize
      this.canvas.height = this.defaultCanvasSize
    }

    const context = this.canvas.getContext('2d')
    if (context == null) {
      throw new Error('Could not get rendering context from canvas element')
    } else {
      this.renderingContext = context
    }
  }

  generateIcon(icon: CustomIcon) {
    this.fillBackground(icon.backgroundColor)
    this.drawIcon(icon)
  }

  saveIcon(icon: CustomIcon) {
    this.generateIcon(icon)
    this.applyWatermark()
    this.updateStats()

    const imageData = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const linkElement = document.createElement('a')
    linkElement.download = `stream-awesome-icon-${Math.round(Math.random() * 100000)}.png`
    linkElement.href = imageData
    linkElement.click()
  }

  private fillBackground(backgroundColor: string): void {
    this.renderingContext.fillStyle = backgroundColor
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawIcon(icon: CustomIcon): void {
    const centerOfCanvas = this.canvas.width / 2
    const iconCode = this.calculateIcon(icon.symbol)

    this.setupFont(icon.symbol, icon.fontSize, icon.fontWeight, icon.fontAwesomeFontFamilySuffix)

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
    font: FontFamilySuffix
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
    font: FontFamilySuffix
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
    fontFamily: FontFamilySuffix
  ): string {
    return `${fontWeight} ${fontSize}px "${fontFamilyBase} ${fontFamily}"`
  }

  private updateStats() {
    fetch('https://skate702.de/StreamAwesomeStats/', { mode: 'no-cors' }).catch()
  }

  private applyWatermark() {
    const colorData = this.renderingContext.getImageData(0, this.canvas.height - 1, 1, 1).data
    const color = chroma(colorData[0], colorData[1], colorData[2])

    this.renderingContext.fillStyle = color.darken(0.1).hex()
    this.renderingContext.fillRect(0, this.canvas.height - 1, 1, 1)
    this.renderingContext.fillStyle = color.brighten(0.1).hex()
    this.renderingContext.fillRect(1, this.canvas.height - 1, 1, 1)
  }
}
