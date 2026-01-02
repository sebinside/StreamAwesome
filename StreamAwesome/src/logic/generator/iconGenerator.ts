import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import {
  BrandsKeyword,
  DuotoneKeyword,
  type FontFamilySuffix,
  type FontWeight
} from '@/model/fontAwesomeConstants'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import { fontAwesomeVersionInfo } from '@/model/fontAwesomeInfo'
import chroma from 'chroma-js'
import namer from 'color-namer'
import { addMetadata } from 'meta-png'
import { metaDataKeyword, PersistenceHandler } from '../persistence/PersistenceHandler'

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

  protected abstract getIconFillStyle(icon: CustomIcon<T>): string | CanvasGradient | CanvasPattern
  protected abstract drawBackground(icon: CustomIcon<T>): void
  protected abstract generatePresetIconName(icon: CustomIcon<T>): string

  protected getSecondaryFillStyle(icon: CustomIcon<T>): string | CanvasGradient | CanvasPattern {
    // This is a simple approach to duotone icons, which is not perfect
    const primaryFillStyle = this.getIconFillStyle(icon)

    if (typeof primaryFillStyle === 'string') {
      return chroma(primaryFillStyle).darken(1).hex()
    }

    return primaryFillStyle
  }

  protected fillBackground(backgroundColor: string) {
    this.renderingContext.fillStyle = backgroundColor
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  protected getHTMLColorName(color: string) {
    const name = namer(color, { pick: ['html'] }).html[0]

    if (name) {
      return name.name
    } else {
      return 'INVALID_NAME'
    }
  }

  protected drawIcon(icon: CustomIcon<T>): void {
    const centerOfCanvas = this.canvas.width / 2
    const iconCode = this.calculateIcon(icon.fontAwesomeIcon.unicode)
    const fontWeight = FontAwesomeIconType.getFontWeightOfStyle(icon.fontAwesomeIcon.style)
    const fontFamilySuffix = FontAwesomeIconType.getFontFamilySuffix(icon.fontAwesomeIcon)

    this.setupFont(icon.fontAwesomeIcon.unicode, icon.fontSize, fontWeight, fontFamilySuffix)

    if (
      icon.fontAwesomeIcon.family.includes(DuotoneKeyword) &&
      !icon.fontAwesomeIcon.isBrandsIcon
    ) {
      this.renderingContext.fillStyle = this.getSecondaryFillStyle(icon)

      const secondaryIconCode = this.calculateSecondaryIcon(icon.fontAwesomeIcon.unicode)
      this.renderingContext.fillText(secondaryIconCode, centerOfCanvas, centerOfCanvas)
    }

    this.renderingContext.fillStyle = this.getIconFillStyle(icon)
    this.renderingContext.fillText(iconCode, centerOfCanvas, centerOfCanvas)
  }

  generateIcon(icon: CustomIcon<T>) {
    this.drawBackground(icon)
    this.drawIcon(icon)
  }

  protected prepareIconForExport(icon: CustomIcon<T>) {
    this.generateIcon(icon)
    this.applyWatermark()
    this.updateStats()
  }

  saveIcon(icon: CustomIcon<T>) {
    this.prepareIconForExport(icon)

    const dataURL = this.canvas.toDataURL('image/png')
    const encodedData = this.dataURLToUint8(dataURL)
    const metadata = PersistenceHandler.convertIconToPersistentIcon(icon)
    const dataWithMetadata = addMetadata(encodedData, metaDataKeyword, JSON.stringify(metadata))

    const blob = new Blob([dataWithMetadata] as BlobPart[], { type: 'image/octet-stream' })
    const href = URL.createObjectURL(blob)
    const linkElement = document.createElement('a')
    linkElement.download = `${this.generateCustomIconName(icon)}.png`
    linkElement.href = href
    linkElement.click()
    URL.revokeObjectURL(href)
  }

  dataURLToUint8(dataUrl: string): Uint8Array {
    const [, base64] = dataUrl.split(',')
    const bin = atob(base64!)
    const u8 = new Uint8Array(bin.length)
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i)
    return u8
  }

  getIconAsBlob(icon: CustomIcon<T>) {
    this.prepareIconForExport(icon)
    return new Promise<Blob>((resolve) => this.canvas.toBlob((blob) => resolve(blob!), 'image/png'))
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

  private calculateIcon(iconUnicode: string): string {
    return String.fromCodePoint(parseInt(iconUnicode, 16) || 0)
  }

  private calculateSecondaryIcon(iconUnicode: string): string {
    return String.fromCharCode(parseInt(iconUnicode, 16), parseInt(iconUnicode, 16))
  }

  private updateStats() {
    fetch('https://skate702.de/StreamAwesomeStats/', { mode: 'no-cors' }).catch()
  }

  private applyWatermark() {
    const colorData = this.renderingContext.getImageData(0, this.canvas.height - 1, 1, 1).data
    if (colorData.length < 3) {
      return
    }

    const color = chroma(colorData[0]!, colorData[1]!, colorData[2]!)

    this.renderingContext.fillStyle = color.darken(0.1).hex()
    this.renderingContext.fillRect(0, this.canvas.height - 1, 1, 1)
    this.renderingContext.fillStyle = color.brighten(0.1).hex()
    this.renderingContext.fillRect(1, this.canvas.height - 1, 1, 1)
  }
}
