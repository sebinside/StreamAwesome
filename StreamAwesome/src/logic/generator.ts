import type { CustomIcon } from '@/model/customIcon'
import {
  BrandsKeyword,
  DuotoneKeyword,
  type FontFamilySuffix,
  type FontWeight
} from '@/model/fontAwesomeConstants'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import { fontAwesomeVersionInfo } from '@/model/versions'
import chroma from 'chroma-js'
import namer from 'color-namer'

export default class IconGenerator {
  private renderingContext: CanvasRenderingContext2D

  private defaultCanvasSize = 256
  private readonly canvas: HTMLCanvasElement

  public constructor(canvas?: HTMLCanvasElement) {
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
    linkElement.download = `${this.generateIconName(icon)}.png`
    linkElement.href = imageData
    linkElement.click()
  }

  private generateIconName(icon: CustomIcon): string {
    const colorName = namer(icon.foregroundColor, { pick: ['html'] }).html[0].name
    const iconName = icon.fontAwesomeIcon.label.toLowerCase().replace(/\s/g, '')
    const fontAwesomeFamily = icon.fontAwesomeIcon.family
    const fontAwesomeStyle = icon.fontAwesomeIcon.style

    if (icon.fontAwesomeIcon.isBrandsIcon) {
      return `${iconName}-${colorName}-${BrandsKeyword}`
    }
    if (icon.fontAwesomeIcon.family === DuotoneKeyword) {
      return `${iconName}-${colorName}-${fontAwesomeFamily}`
    }
    return `${iconName}-${colorName}-${fontAwesomeFamily}-${fontAwesomeStyle}`
  }

  private fillBackground(backgroundColor: string): void {
    this.renderingContext.fillStyle = backgroundColor
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  private drawIcon(icon: CustomIcon): void {
    const centerOfCanvas = this.canvas.width / 2
    const iconCode = this.calculateIcon(icon.fontAwesomeIcon.unicode)
    const fontWeight = FontAwesomeIconType.getFontWeightOfStyle(icon.fontAwesomeIcon.style)
    const fontFamilySuffix = FontAwesomeIconType.getFontFamilySuffix(icon.fontAwesomeIcon)

    this.setupFont(icon.fontAwesomeIcon.unicode, icon.fontSize, fontWeight, fontFamilySuffix)

    this.renderingContext.fillStyle = icon.foregroundColor
    this.renderingContext.fillText(iconCode, centerOfCanvas, centerOfCanvas)

    if (icon.fontAwesomeIcon.family === DuotoneKeyword && !icon.fontAwesomeIcon.isBrandsIcon) {
      // This is a simple approach to duotone icons, which is not perfect
      const secondaryColor = chroma(icon.foregroundColor).darken(1).hex()
      this.renderingContext.fillStyle = secondaryColor

      const secondaryIconCode = this.calculateSecondaryIcon(icon.fontAwesomeIcon.unicode)
      this.renderingContext.fillText(secondaryIconCode, centerOfCanvas, centerOfCanvas)
    }
  }

  private calculateIcon(iconUnicode: string): string {
    return String.fromCodePoint(parseInt(iconUnicode, 16) || 0)
  }

  private calculateSecondaryIcon(iconUnicode: string): string {
    return String.fromCharCode(parseInt(iconUnicode, 16), parseInt(iconUnicode, 16))
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
      fontAwesomeVersionInfo.fontFamilyBase,
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
      fontAwesomeVersionInfo.fontFamilyBase,
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
