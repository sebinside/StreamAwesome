import * as v from 'valibot'
import { type FontAwesomeIcon, FontAwesomeIconsSchema } from '@/model/fontAwesomeApi.ts'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'

export class FontAwesomeBrowser {
  public constructor(private readonly fontVersion: string) {}

  private fontAwesomeAPIEndpoint = 'https://api.fontawesome.com'
  private searchDetails =
    'id\nlabel\nunicode\nfamilyStylesByLicense\n{free {family,style},pro{family,style}}'

  public async getAvailableIcons(
    searchTerm: string,
    quantity: number = 39
  ): Promise<FontAwesomeIconType[]> {
    const response = await fetch(this.fontAwesomeAPIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{ search(version: "${this.fontVersion}", query: "${searchTerm}", first: ${quantity}) {${this.searchDetails}} }`
      })
    })
    const fontAwesomeApiResponse = await response.json()

    const result = v.safeParse(FontAwesomeIconsSchema, fontAwesomeApiResponse)

    if (!result.success) {
      return [FontAwesomeIconType.createFallBackIcon()]
    }

    const fontAwesomeIcons = result.output
    return this.fontAwesomeIconsToIconTypes(fontAwesomeIcons)
  }

  private fontAwesomeIconsToIconTypes(fontAwesomeIcons: FontAwesomeIcon[]): FontAwesomeIconType[] {
    return fontAwesomeIcons.map((fontAwesomeIcon) => {
      const { id, label, unicode, familyStylesByLicense } = fontAwesomeIcon
      return new FontAwesomeIconType(id, label, unicode, familyStylesByLicense)
    })
  }
}
