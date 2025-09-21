import { PersistentIconConverter } from './PersistentIconConverter'

export class IconConverter310 extends PersistentIconConverter {
  public convertPersistentIconToIcon(
    record: Record<string, unknown>
  ): Record<string, unknown> | null {
    try {
      const icon: Record<string, unknown> = {
        fontSize: this.extractNumber(record, 'fontsize'),
        fontAwesomeIcon: this.extractFontAwesomeIcon(record),
        presetSettings: this.extractPreset(record)
      }

      return icon
    } catch (error) {
      console.error('Error during persistent icon conversion.', error)
      return null
    }
  }

  private extractFontAwesomeIcon(record: Record<string, unknown>): Record<string, unknown> {
    return {
      id: this.extractString(record, 'fontawesomeicon.id'),
      label: this.extractString(record, 'fontawesomeicon.label'),
      unicode: this.extractString(record, 'fontawesomeicon.unicode'),
      isBrandsIcon: this.extractBoolean(record, 'fontawesomeicon.isbrandsicon'),
      style: this.extractString(record, 'fontawesomeicon.style'),
      family: this.extractString(record, 'fontawesomeicon.family')
    }
  }

  private extractPreset(record: Record<string, unknown>): Record<string, unknown> {
    const preset = this.extractString(record, 'presetsettings.preset')
    const typedPreset = preset.charAt(0).toUpperCase() + preset.slice(1)

    switch (typedPreset) {
      case 'Classic':
        return {
          preset: 'Classic',
          hue: this.extractNumber(record, 'presetsettings.hue')
        }
      case 'Modern':
        return {
          preset: 'Modern',
          inverted: this.extractBoolean(record, 'presetsettings.inverted')
        }
      case 'Neo':
        return {
          preset: 'Neo',
          invertDirection: this.extractBoolean(record, 'presetsettings.invertdirection'),
          symbolOnly: this.extractBoolean(record, 'presetsettings.symbolonly'),
          hueStart: this.extractNumber(record, 'presetsettings.huestart'),
          hueShift: this.extractNumber(record, 'presetsettings.hueshift'),
          saturation: this.extractNumber(record, 'presetsettings.saturation'),
          translation: this.extractNumber(record, 'presetsettings.translation'),
          lightness: this.extractNumber(record, 'presetsettings.lightness'),
          colorSpace: this.extractString(record, 'presetsettings.colorspace')
        }
      case 'Custom':
        return {
          preset: 'Custom',
          backgroundColor: this.extractString(record, 'presetsettings.backgroundcolor'),
          foregroundColor: this.extractString(record, 'presetsettings.foregroundcolor')
        }
      default:
        throw new Error(`Unknown preset type: ${typedPreset}`)
    }
  }
}
