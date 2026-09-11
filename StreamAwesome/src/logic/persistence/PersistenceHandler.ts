import type { CustomIcon, FontAwesomePreset } from '@/model/customIcon'
import { PersistentIconConverter } from './PersistentIconConverter'
import { streamAwesomeVersion } from '@/version'

export const metaDataKeyword = 'StreamAwesomeIcon'

export interface PersistentIcon {
  version: string
  [key: string]: unknown
}

export class PersistenceHandler {
  public static convertPersistentIconToIcon(
    record: Record<string, unknown>
  ): CustomIcon<FontAwesomePreset> | null {
    if (record.version === undefined || typeof record.version !== 'string') {
      console.error('No appropriate version found in persistent icon.')
      return null
    }

    if (!PersistenceHandler.isCompatibleVersion(record.version)) {
      console.error(`Incompatible version found in persistent icon: ${record.version} (current: ${streamAwesomeVersion}).`)

      return null
    }

    return new PersistentIconConverter().convertPersistentIconToIcon(
      record
    ) as CustomIcon<FontAwesomePreset> | null
  }

  // major versions are compatible
  private static isCompatibleVersion(version: string): boolean {
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      return false
    }

    // dev environment
    const currentMajor = streamAwesomeVersion.split('.')[0]
    if (currentMajor === '0') {
      return true
    }

    return version.split('.')[0] === currentMajor
  }

  public static convertIconToPersistentIcon(icon: CustomIcon<FontAwesomePreset>): PersistentIcon {
    const flattenedIcon = PersistenceHandler.flattenObject(
      icon as unknown as Record<string, unknown>,
      '',
      {}
    )
    return {
      version: streamAwesomeVersion,
      ...flattenedIcon
    }
  }

  private static flattenObject(
    obj: Record<string, unknown>,
    prefix: string | null,
    record: Record<string, unknown>
  ): Record<string, unknown> {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key]

        const joinedKey = [prefix, key].filter(Boolean).join('.').toLowerCase()

        if (typeof value === 'object' && value !== null) {
          PersistenceHandler.flattenObject(value as Record<string, unknown>, joinedKey, record)
        } else {
          record[joinedKey] = `${value}`.toLowerCase()
        }
      }
    }
    return record
  }
}
