import * as v from 'valibot'
import { FontAwesomeFamilyKeys, FontAwesomeStyleKeys } from '@/model/fontAwesomeConstants.ts'

const FontAwesomeFamilySchema = v.picklist(FontAwesomeFamilyKeys)
const FontAwesomeStyleSchema = v.picklist(FontAwesomeStyleKeys)
const FontAwesomeFamilyStylesSchema = v.array(
  v.object({
    family: FontAwesomeFamilySchema,
    style: FontAwesomeStyleSchema
  })
)
const FontAwesomeIconSchema = v.object({
  id: v.string(),
  label: v.string(),
  unicode: v.string(),
  familyStylesByLicense: v.object({
    free: FontAwesomeFamilyStylesSchema,
    pro: FontAwesomeFamilyStylesSchema
  })
})
const FontAwesomeApiResponseSchema = v.object({
  data: v.object({
    search: v.array(FontAwesomeIconSchema)
  })
})
export const FontAwesomeIconsSchema = v.pipe(
  FontAwesomeApiResponseSchema,
  v.transform((input) => input.data.search)
)

export type FontAwesomeFamily = v.InferOutput<typeof FontAwesomeFamilySchema>
export type FontAwesomeStyle = v.InferOutput<typeof FontAwesomeStyleSchema>
export type FontAwesomeIcon = v.InferOutput<typeof FontAwesomeIconSchema>
