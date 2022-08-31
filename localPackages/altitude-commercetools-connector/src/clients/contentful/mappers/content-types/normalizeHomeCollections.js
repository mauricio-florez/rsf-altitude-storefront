import normalizeContentfulEntries from '../normalizeEntries'
import normalizeContentfulCollection from './normalizeCollection'

export default function normalizeContentfulCollections(data) {
  const {
    items: [{ fields }],
  } = normalizeContentfulEntries(data)
  
  return {
    ctaLabel: fields.ctaLabel,
    ctaUrl: fields.ctaUrl,
    collections: fields.collections.map(normalizeContentfulCollection)
  }
}
