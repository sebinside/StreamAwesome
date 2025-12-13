export const streamAwesomeVersionInfo = '3.2.0'

export type fontLicense = 'Free' | 'Pro'
export const fontAwesomeVersionInfo: {
  readonly fontFamilyBase: string
  readonly fontVersion: string
  fontLicense: fontLicense
} = {
  fontFamilyBase: 'Font Awesome 6',
  fontVersion: '6.6.0',
  fontLicense: 'Pro'
}

export function setFontAwesomeLicense(fontLicense: fontLicense) {
  fontAwesomeVersionInfo.fontLicense = fontLicense
}
