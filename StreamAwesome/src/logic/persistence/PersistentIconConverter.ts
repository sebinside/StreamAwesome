export interface PersistentIcon {
  version: string
  [key: string]: unknown
}

export abstract class PersistentIconConverter {
  public abstract convertPersistentIconToIcon(
    record: Record<string, unknown>
  ): Record<string, unknown> | null

  protected extractNumber(record: Record<string, unknown>, key: string): number {
    const parsedNumber = parseFloat(record[key] as string)
    if (isNaN(parsedNumber)) {
      throw new Error(`${key} in URL parameters is not a valid number.`)
    }
    return parsedNumber
  }

  protected extractString(record: Record<string, unknown>, key: string): string {
    const value = record[key]
    if (value === undefined || value === null || Array.isArray(value)) {
      throw new Error(`${key} in URL parameters is not a valid string.`)
    }
    return value as string
  }

  protected extractBoolean(record: Record<string, unknown>, key: string): boolean {
    const value = record[key]
    if (value === undefined || value === null || Array.isArray(value)) {
      throw new Error(`${key} in URL parameters is not a valid boolean.`)
    }
    return (value as string).toLowerCase() === 'true'
  }
}
