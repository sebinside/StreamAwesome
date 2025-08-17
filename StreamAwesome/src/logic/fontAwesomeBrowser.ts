import type { FontAwesomeFamily, FontAwesomeStyle } from '@/model/fontAwesomeConstants'
import { FontAwesomeIconType } from '@/model/fontAwesomeIconType'

type FontAwesomeFamilyStyle = {
  family: FontAwesomeFamily
  style: FontAwesomeStyle
}
type FontAwesomeIcon = {
  id: string
  label: string
  unicode: string
  familyStylesByLicense: {
    free: FontAwesomeFamilyStyle[]
    pro: FontAwesomeFamilyStyle[]
  }
}
type FontAwesomeResponse = {
  data: {
    search: FontAwesomeIcon[]
  }
}

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
    const json = (await response.json()) as FontAwesomeResponse

    const fontAwesomeIcons = json.data.search
    return fontAwesomeIcons.map((fontAwesomeIcon) =>
      this.fontAwesomeIconToIconType(fontAwesomeIcon)
    )
  }

  private fontAwesomeIconToIconType(fontAwesomeIcon: FontAwesomeIcon): FontAwesomeIconType {
    const { id, label, unicode, familyStylesByLicense } = fontAwesomeIcon

    if (id == null || label == null || unicode == null || familyStylesByLicense == null) {
      console.error(`Could not convert result entry "${id}" to FontAwesomeIcon`)

      return FontAwesomeIconType.createFallBackIcon()
    }

    return new FontAwesomeIconType(id, label, unicode, familyStylesByLicense)
  }
}
