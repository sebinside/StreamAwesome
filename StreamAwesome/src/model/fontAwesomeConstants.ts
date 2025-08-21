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

export type FontFamilySuffix = (typeof FontFamilySuffixKeys)[number]
export type FontWeight = 100 | 300 | 400 | 900
