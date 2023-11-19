import { FontAwesomeIcon } from '@/model/fontAwesomeIcon'

export class FontAwesomeBrowser {
  public constructor(
    private readonly fontVersion: string,
    private readonly fontLicense: string
  ) {}

  private fontAwesomeAPIEndpoint = 'https://api.fontawesome.com'
  private searchDetails = 'id\nlabel\nunicode\nmembership'
  // TODO: Update membership to https://fontawesome.com/docs/apis/graphql/objects#familystylesbylicense

  public async getAvailableIcons(
    searchTerm: string,
    quantity: number = 30
  ): Promise<Array<FontAwesomeIcon>> {
    const fontLicenseTerm = this.fontLicense === 'Free' ? 'free' : 'free\npro'

    const response = await fetch(this.fontAwesomeAPIEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{ search(version: "${this.fontVersion}", query: "${searchTerm}", first: ${quantity}) {${this.searchDetails} { ${fontLicenseTerm} } } }`
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
    const membership: { free: string[]; pro: string[] } = entry.membership

    if (id == null || label == null || unicode == null || membership == null) {
      console.error(`Could not convert result entry "${id}" to FontAwesomeIcon`)
      return new FontAwesomeIcon('question', 'Question', '3f', { free: ['solid'], pro: ['solid'] })
    }

    return new FontAwesomeIcon(id, label, unicode, membership)
  }
}
