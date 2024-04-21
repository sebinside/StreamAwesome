export const FontAwesomeFamilyKeys = ['classic', 'sharp', 'duotone']
export const FontAwesomeStyleKeys = ['solid', 'regular', 'light', 'thin', 'brands']
export const FontFamilySuffixKeys = ['Free', 'Pro', 'Duotone', 'Sharp', 'Brands']
export const BrandsKeyword = 'brands'

export type FontAwesomeFamily = (typeof FontAwesomeFamilyKeys)[number]
export type FontAwesomeStyle = (typeof FontAwesomeStyleKeys)[number]
export type FontFamilySuffix = (typeof FontFamilySuffixKeys)[number]
export type FontWeight = 100 | 300 | 400 | 900
