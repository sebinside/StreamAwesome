export class FontAwesomeBrowser {
  public constructor(
    private readonly fontVersion: string,
    private readonly fontLicense: string
  ) {}

  // TODO: Tidy up this function
  public async callAPI(searchTerm: string) {
    const response = await fetch('https://api.fontawesome.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `{ search(version: "${
          this.fontVersion
        }", query: "${searchTerm}", first: 30) {id\nlabel\nunicode\nmembership { ${
          this.fontLicense === 'Free' ? 'free' : 'free\npro'
        } } } }`
      })
    })
    console.log(await response.json())
  }
}
