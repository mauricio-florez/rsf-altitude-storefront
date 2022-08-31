export default function normalizeContentfulEntries(data) {
  const { items, includes } = data

  return {
    items,
    includes,
  }
}
