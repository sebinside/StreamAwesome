import { FontAwesomeIcon, type FontAwesomeFamilyStyle } from '@/model/fontAwesomeIcon'

export class FontAwesomeBrowser {
  public constructor(private readonly fontVersion: string) {}

  private fontAwesomeAPIEndpoint = 'https://api.fontawesome.com'
  private searchDetails =
    'id\nlabel\nunicode\nfamilyStylesByLicense\n{free {family,style},pro{family,style}}'

  public async getAvailableIcons(
    searchTerm: string,
    quantity: number = 30
  ): Promise<Array<FontAwesomeIcon>> {
    const response = await fetch(this.fontAwesomeAPIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{ search(version: "${this.fontVersion}", query: "${searchTerm}", first: ${quantity}) {${this.searchDetails}} }`
      })
    })

    const json = await response.json()
    const icons = json.data.search.map((entry: any) => this.entryToFontAwesomeIcon(entry))
    return icons
  }

  private entryToFontAwesomeIcon(entry: any): FontAwesomeIcon {
    const id: string = entry.id
    const label: string = entry.label
    const unicode: string = entry.unicode
    const familyStyles: { free: FontAwesomeFamilyStyle[]; pro: FontAwesomeFamilyStyle[] } =
      entry.familyStylesByLicense

    if (id == null || label == null || unicode == null || familyStyles == null) {
      console.error(`Could not convert result entry "${id}" to FontAwesomeIcon`)

      const fallBackQuestionMarkIcon = new FontAwesomeIcon('question', 'Question', '3f', {
        free: [{ family: 'classic', style: 'solid' }],
        pro: [{ family: 'classic', style: 'solid' }]
      })

      return fallBackQuestionMarkIcon
    }

    return new FontAwesomeIcon(id, label, unicode, familyStyles)
  }
}
