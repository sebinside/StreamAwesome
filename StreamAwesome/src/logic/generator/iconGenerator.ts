import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import {
  BrandsKeyword,
  DuotoneKeyword,
  type FontFamilySuffix,
  type FontWeight
} from '@/model/fontAwesomeConstants'
import { fontAwesomeVersionInfo } from '@/model/versions'
import chroma from 'chroma-js'

export default abstract class IconGenerator<T extends FontAwesomePreset> {
  protected renderingContext: CanvasRenderingContext2D

  protected defaultCanvasSize = 256
  protected readonly canvas: HTMLCanvasElement

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

  abstract generateIcon(icon: CustomIcon<T>): void
  abstract generatePresetIconName(icon: CustomIcon<T>): string
  abstract drawIcon(icon: CustomIcon<T>): void

  saveIcon(icon: CustomIcon<T>) {
    this.generateIcon(icon)
    this.applyWatermark()
    this.updateStats()

    const imageData = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
    const linkElement = document.createElement('a')
    linkElement.download = `${this.generateCustomIconName(icon)}.png`
    linkElement.href = imageData
    linkElement.click()
  }

  private generateCustomIconName(icon: CustomIcon<T>): string {
    const customPresetName = this.generatePresetIconName(icon)
    const iconName = icon.fontAwesomeIcon.label.toLowerCase().replace(/\s/g, '')
    const fontAwesomeFamily = icon.fontAwesomeIcon.family
    const fontAwesomeStyle = icon.fontAwesomeIcon.style

    if (icon.fontAwesomeIcon.isBrandsIcon) {
      return `${iconName}-${customPresetName}-${BrandsKeyword}`
    }
    if (icon.fontAwesomeIcon.family === DuotoneKeyword) {
      return `${iconName}-${customPresetName}-${fontAwesomeFamily}`
    }
    return `${iconName}-${customPresetName}-${fontAwesomeFamily}-${fontAwesomeStyle}`
  }

  protected calculateIcon(iconUnicode: string): string {
    return String.fromCodePoint(parseInt(iconUnicode, 16) || 0)
  }

  protected calculateSecondaryIcon(iconUnicode: string): string {
    return String.fromCharCode(parseInt(iconUnicode, 16), parseInt(iconUnicode, 16))
  }

  protected setupFont(
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