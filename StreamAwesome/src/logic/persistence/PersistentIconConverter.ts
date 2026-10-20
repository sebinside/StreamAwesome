export class PersistentIconConverter {
  public convertPersistentIconToIcon(
    record: Record<string, unknown>
  ): Record<string, unknown> | null {
    try {
      const icon: Record<string, unknown> = {
        fontSize: this.extractNumber(record, 'fontsize'),
        fontAwesomeIcon: this.extractFontAwesomeIcon(record),
        presetSettings: this.extractPreset(record)
      }

      if (record['secondaryicon.icon.id'] !== undefined) {
        icon.secondaryIcon = this.extractSecondaryIcon(record)
      }

      return icon
    } catch (error) {
      console.error('Error during persistent icon conversion.', error)
      return null
    }
  }

  private extractFontAwesomeIcon(
    record: Record<string, unknown>,
    prefix = 'fontawesomeicon'
  ): Record<string, unknown> {
    return {
      id: this.extractString(record, `${prefix}.id`),
      label: this.extractString(record, `${prefix}.label`),
      unicode: this.extractString(record, `${prefix}.unicode`),
      isBrandsIcon: this.extractBoolean(record, `${prefix}.isbrandsicon`),
      style: this.extractString(record, `${prefix}.style`),
      family: this.extractString(record, `${prefix}.family`),
      duotoneAlpha: this.extractOptionalNumber(record, `${prefix}.duotonealpha`, 0.5)
    }
  }

  private extractSecondaryIcon(record: Record<string, unknown>): Record<string, unknown> {
    return {
      icon: this.extractFontAwesomeIcon(record, 'secondaryicon.icon'),
      corner: this.extractString(record, 'secondaryicon.corner'),
      fontSize: this.extractNumber(record, 'secondaryicon.fontsize')
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
          neoStyle: this.extractString(record, 'presetsettings.neostyle'),
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

  private extractNumber(record: Record<string, unknown>, key: string): number {
    const parsedNumber = parseFloat(record[key] as string)
    if (isNaN(parsedNumber)) {
      throw new Error(`${key} in URL parameters is not a valid number.`)
    }
    return parsedNumber
  }

  private extractOptionalNumber(record: Record<string, unknown>, key: string, fallback: number): number {
    if (record[key] === undefined || record[key] === null) {
      return fallback
    }
    return this.extractNumber(record, key)
  }

  private extractString(record: Record<string, unknown>, key: string): string {
    const value = record[key]
    if (value === undefined || value === null || Array.isArray(value)) {
      throw new Error(`${key} in URL parameters is not a valid string.`)
    }
    return value as string
  }

  private extractBoolean(record: Record<string, unknown>, key: string): boolean {
    const value = record[key]
    if (value === undefined || value === null || Array.isArray(value)) {
      throw new Error(`${key} in URL parameters is not a valid boolean.`)
    }
    return (value as string).toLowerCase() === 'true'
  }
}
