import { type PlpResponse } from './../types/index'
import normalizeProduct from './normalizeProduct'

export function normalizePlp(search): PlpResponse {
  // TODO: Limit needs to be a config param
  const limit = 24
  // TODO: Check logic in client side, it is adding an additional page
  const totalPages = Math.ceil(search.total / limit) + 1

  const { results = [] } = search
  let products = []

  if (results.length > 0) {
      products = results
  }

  return {
    total: search.total,
    // page,
    totalPages,
    products: (products || []).map(normalizeProduct),
    // sort,
    sortOptions: [],
    filters: [],
    facets: []
  }
}
