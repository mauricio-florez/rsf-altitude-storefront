import normalizeContentfulEntries from '../normalizeEntries'
import normalizeContentfulImage from '../normalizeImage'

export default function normalizeContentfulHero(data) {
  const {
    items: [{ fields }],
  } = normalizeContentfulEntries(data)

  fields.image1 = normalizeContentfulImage(fields.image1)
  fields.image2 = normalizeContentfulImage(fields.image2)
  fields.image3 = normalizeContentfulImage(fields.image3)
  
  return fields
}
