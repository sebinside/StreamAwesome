export interface Icon {
  backgroundColor: string
  foregroundColor: string
  symbol: string
  fontAwesomeFontFamily: FontFamily
  fontSize: number
  fontWeight: FontWeight
}

export type FontFamily = 'Pro' | 'Duotone' | 'Sharp'
export type FontWeight = 100 | 300 | 400 | 900
