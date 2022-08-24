export default function normalizeContentfulEntry(data) {
  // Filter for images supporting type and variations
  const { fields } = data
  const { image } = fields || {}
  return {
    fields,
    image: image,
  }
}
