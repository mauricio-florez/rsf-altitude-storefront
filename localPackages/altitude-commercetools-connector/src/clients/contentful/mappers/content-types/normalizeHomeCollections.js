import normalizeContentfulEntries from '../normalizeEntries'
import normalizeContentfulCollection from './normalizeCollection'

export default function normalizeContentfulCollections(data) {
  const {
    items: [{ fields }],
  } = normalizeContentfulEntries(data)
  const {ctaLabel, ctaUrl, collections} = fields
  
  return {
    ctaLabel: ctaLabel,
    ctaUrl: ctaUrl,
    collections: collections.map(normalizeContentfulCollection)
  }
}
