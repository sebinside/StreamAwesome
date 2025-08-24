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
      isBrandsIcon: URLHandler.extractBoolean(params, 'fontawesomeicon.isbrandsicon'),
      style: URLHandler.extractString(params, 'fontawesomeicon.style') as FontAwesomeStyle,
      family: URLHandler.extractString(params, 'fontawesomeicon.family') as FontAwesomeFamily
    }
  }

  private static extractPreset(params: UrlParams): CustomIcon<FontAwesomePreset>['presetSettings'] {
    const preset = URLHandler.extractString(params, 'presetsettings.preset')
    const typedPreset = (preset.charAt(0).toUpperCase() + preset.slice(1)) as FontAwesomePreset

    switch (typedPreset) {
      case 'Classic':
        return {
          preset: 'Classic',
          hue: URLHandler.extractNumber(params, 'presetsettings.hue')
        }
      case 'Modern':
        return {
          preset: 'Modern',
          inverted: URLHandler.extractBoolean(params, 'presetsettings.inverted')
        }
      case 'Neo':
        return {
          preset: 'Neo',
          invertDirection: URLHandler.extractBoolean(params, 'presetsettings.invertdirection'),
          symbolOnly: URLHandler.extractBoolean(params, 'presetsettings.symbolonly'),
          hueStart: URLHandler.extractNumber(params, 'presetsettings.huestart'),
          hueShift: URLHandler.extractNumber(params, 'presetsettings.hueshift'),
          saturation: URLHandler.extractNumber(params, 'presetsettings.saturation'),
          translation: URLHandler.extractNumber(params, 'presetsettings.translation'),
          lightness: URLHandler.extractNumber(params, 'presetsettings.lightness'),
          colorSpace: URLHandler.extractString(params, 'presetsettings.colorspace') as ColorSpace
        }
      case 'Custom':
        return {
          preset: 'Custom',
          backgroundColor: URLHandler.extractString(params, 'presetsettings.backgroundcolor'),
          foregroundColor: URLHandler.extractString(params, 'presetsettings.foregroundcolor')
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
    return value.toLowerCase() === 'true'
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

        const joinedKey = [prefix, key].filter(Boolean).join('.').toLowerCase()

        if (typeof value === 'object' && value !== null) {
          URLHandler.mapObjectToParams(value as Record<string, unknown>, joinedKey, params)
        } else {
          params[joinedKey] = `${value}`.toLowerCase()
        }
      }
    }
  }
}
