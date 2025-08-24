import { useIconsStore } from '@/stores/icons'
import { watch } from 'vue'
import { useUrlSearchParams, type UrlParams } from '@vueuse/core'
import type { ColorSpace, CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import type { FontAwesomeFamily, FontAwesomeStyle } from '@/model/fontAwesomeConstants'
import type { FontAwesomeIcon } from '@/model/fontAwesomeIcon'

export class URLHandler {
  public static initialize() {
    URLHandler.readURLAndUpdateIcon()
    URLHandler.watchIconAndUpdateURL()
  }

  private static readURLAndUpdateIcon() {
    const params = useUrlSearchParams('history')
    if (params.fontsize !== undefined) {
      console.log('Found URL parameters. Trying to parse input...')

      const icon = URLHandler.convertURLToCustomIcon(params)

      if (icon !== null) {
        console.log('Successfully parsed icon from URL parameters.')
        useIconsStore().currentIcon = icon
      } else {
        console.error('Failed to parse icon from URL parameters.')
      }
    }
  }

  private static convertURLToCustomIcon(params: UrlParams): CustomIcon<FontAwesomePreset> | null {
    try {
      const icon: CustomIcon<FontAwesomePreset> = {
        fontSize: URLHandler.extractNumber(params, 'fontsize'),
        fontAwesomeIcon: URLHandler.extractFontAwesomeIcon(params),
        presetSettings: URLHandler.extractPreset(params)
      }

      return icon
    } catch (error) {
      console.error('Error during URL parameter parsing.', error)
      return null
    }
  }

  private static extractFontAwesomeIcon(params: UrlParams): FontAwesomeIcon {
    return {
      id: URLHandler.extractString(params, 'fontawesomeicon.id'),
      label: URLHandler.extractString(params, 'fontawesomeicon.label'),
      unicode: URLHandler.extractString(params, 'fontawesomeicon.unicode'),
      isBrandsIcon: URLHandler.extractBoolean(params, 'fontawesomeicon.isBrandsIcon'),
      style: URLHandler.extractString(params, 'fontawesomeicon.style') as FontAwesomeStyle,
      family: URLHandler.extractString(params, 'fontawesomeicon.family') as FontAwesomeFamily
    }
  }

  private static extractPreset(params: UrlParams): CustomIcon<FontAwesomePreset>['presetSettings'] {
    const preset = URLHandler.extractString(params, 'preset')
    const typedPreset = (preset.charAt(0).toUpperCase() + preset.slice(1)) as FontAwesomePreset

    switch (typedPreset) {
      case 'Classic':
        return {
          preset: 'Classic',
          hue: URLHandler.extractNumber(params, 'presetsetting.hue')
        }
      case 'Modern':
        return {
          preset: 'Modern',
          inverted: URLHandler.extractBoolean(params, 'presetsetting.inverted')
        }
      case 'Neo':
        return {
          preset: 'Neo',
          invertDirection: URLHandler.extractBoolean(params, 'presetsetting.invertDirection'),
          symbolOnly: URLHandler.extractBoolean(params, 'presetsetting.symbolOnly'),
          hueStart: URLHandler.extractNumber(params, 'presetsetting.hueStart'),
          hueShift: URLHandler.extractNumber(params, 'presetsetting.hueShift'),
          saturation: URLHandler.extractNumber(params, 'presetsetting.saturation'),
          translation: URLHandler.extractNumber(params, 'presetsetting.translation'),
          lightness: URLHandler.extractNumber(params, 'presetsetting.lightness'),
          colorSpace: URLHandler.extractString(params, 'presetsetting.colorSpace') as ColorSpace
        }
      case 'Custom':
        return {
          preset: 'Custom',
          backgroundColor: URLHandler.extractString(params, 'presetsetting.backgroundColor'),
          foregroundColor: URLHandler.extractString(params, 'presetsetting.foregroundColor')
        }
      default:
        throw new Error(`Unknown preset type: ${typedPreset}`)
    }
  }

  private static extractNumber(params: UrlParams, parameterName: string): number {
    const parsedNumber = parseFloat(params[parameterName] as string)
    if (isNaN(parsedNumber)) {
      throw new Error(`${parameterName} in URL parameters is not a valid number.`)
    }
    return parsedNumber
  }

  private static extractString(params: UrlParams, parameterName: string): string {
    const value = params[parameterName]
    if (value === undefined || value === null || Array.isArray(value)) {
      throw new Error(`${parameterName} in URL parameters is not a valid string.`)
    }
    return value as string
  }

  private static extractBoolean(params: UrlParams, parameterName: string): boolean {
    const value = params[parameterName]
    if (value === undefined || value === null || Array.isArray(value)) {
      throw new Error(`${parameterName} in URL parameters is not a valid boolean.`)
    }
    return Boolean(value)
  }

  private static watchIconAndUpdateURL() {
    watch(useIconsStore().currentIcon, (newIcon) => {
      const params = useUrlSearchParams('history')
      URLHandler.clearURLParameters(params)
      URLHandler.mapObjectToParams(newIcon, '', params)
    })
  }

  private static clearURLParameters(params: UrlParams) {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        delete params[key]
      }
    }
  }

  private static mapObjectToParams(
    obj: Record<string, unknown>,
    prefix: string | null,
    params: UrlParams
  ) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]
        if (typeof value === 'object' && value !== null) {
          URLHandler.mapObjectToParams(
            value as Record<string, unknown>,
            URLHandler.joinPrefixKeys(prefix, key),
            params
          )
        } else {
          params[URLHandler.joinPrefixKeys(prefix, key)] = `${value}`.toLowerCase()
        }
      }
    }
  }

  private static joinPrefixKeys(prefix: string | null, key: string): string {
    return [prefix, key]
      .filter(Boolean)
      .map((s) => s.toLowerCase())
      .join('.')
  }
}
