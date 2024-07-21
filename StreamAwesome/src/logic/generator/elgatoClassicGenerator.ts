import type { CustomIcon } from '@/model/customIcon'
import IconGenerator from '@/logic/generator/iconGenerator'
import namer from 'color-namer'
import chroma, { type Color } from 'chroma-js'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'
import { DuotoneKeyword } from '@/model/fontAwesomeConstants'

export default class ElgatoClassicIconGenerator extends IconGenerator<'Elgato Classic'> {
  private readonly colorSaturation = 0.69
  private readonly colorLightness = 0.57

  private calculateForegroundColor(icon: CustomIcon<'Elgato Classic'>): Color {
    return chroma.hsl(icon.presetSettings.hue, this.colorSaturation, this.colorLightness)
  }

  // TODO: Reorder all methods in all classes
  private calculateBackgroundColor(icon: CustomIcon<'Elgato Classic'>): Color {
    return this.calculateForegroundColor(icon).darken(4.15)
  }

  generatePresetIconName(icon: CustomIcon<'Elgato Classic'>): string {
    const foregroundColor = this.calculateForegroundColor(icon).hex()
    const colorName = namer(foregroundColor, { pick: ['html'] }).html[0].name
    return `classic-${colorName}`
  }

  generateIcon(icon: CustomIcon<'Elgato Classic'>): void {
    this.fillBackground(icon)
    this.drawIcon(icon)
  }

  private fillBackground(icon: CustomIcon<'Elgato Classic'>): void {
    const backgroundColor = this.calculateBackgroundColor(icon)
    this.renderingContext.fillStyle = backgroundColor.hex()
    this.renderingContext.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawIcon(icon: CustomIcon<'Elgato Classic'>): void {
    const centerOfCanvas = this.canvas.width / 2
    const iconCode = this.calculateIcon(icon.fontAwesomeIcon.unicode)
    const fontWeight = FontAwesomeIconType.getFontWeightOfStyle(icon.fontAwesomeIcon.style)
    const fontFamilySuffix = FontAwesomeIconType.getFontFamilySuffix(icon.fontAwesomeIcon)

    this.setupFont(icon.fontAwesomeIcon.unicode, icon.fontSize, fontWeight, fontFamilySuffix)

    this.renderingContext.fillStyle = this.calculateForegroundColor(icon).hex()
    this.renderingContext.fillText(iconCode, centerOfCanvas, centerOfCanvas)

    if (icon.fontAwesomeIcon.family === DuotoneKeyword && !icon.fontAwesomeIcon.isBrandsIcon) {
      // This is a simple approach to duotone icons, which is not perfect
      const secondaryColor = chroma(this.calculateForegroundColor(icon).hex()).darken(1).hex()
      this.renderingContext.fillStyle = secondaryColor

      const secondaryIconCode = this.calculateSecondaryIcon(icon.fontAwesomeIcon.unicode)
      this.renderingContext.fillText(secondaryIconCode, centerOfCanvas, centerOfCanvas)
    }
  }
}
