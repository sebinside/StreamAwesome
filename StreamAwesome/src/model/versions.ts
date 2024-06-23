export const streamAwesomeVersionInfo = '3.0.0'

export type fontLicense = 'Free' | 'Pro'

export const fontAwesomeVersionInfo: {
  readonly fontFamilyBase: string
  readonly fontVersion: string
  fontLicense: fontLicense
} = {
  fontFamilyBase: 'Font Awesome 6',
  fontVersion: '6.5.2',
  fontLicense: 'Pro'
}

export function setFontAwesomeLicense(fontLicense: fontLicense) {
  fontAwesomeVersionInfo.fontLicense = fontLicense
}