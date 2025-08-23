export const FontAwesomeFamilyKeys = ['classic', 'sharp', 'duotone', 'sharp-duotone'] as const
export const FontAwesomeStyleKeys = ['solid', 'regular', 'light', 'thin', 'brands'] as const
export const FontFamilySuffixKeys = [
  'Free',
  'Pro',
  'Duotone',
  'Sharp',
  'Sharp Duotone',
  'Brands'
] as const
export const BrandsKeyword = 'brands'
export const DuotoneKeyword = 'duotone'

// FA Free only contains *some* regular icons, which is not reliable. Thus, they are also excluded.
export const FontAwesomeFreeStyleKeys = FontAwesomeStyleKeys.slice(0, 1)
export const FontAwesomeFreeFamilyKeys = FontAwesomeFamilyKeys.slice(0, 1)

export type FontAwesomeFamily = (typeof FontAwesomeFamilyKeys)[number]
export type FontAwesomeStyle = (typeof FontAwesomeStyleKeys)[number]
export type FontFamilySuffix = (typeof FontFamilySuffixKeys)[number]
export type FontWeight = 100 | 300 | 400 | 900
