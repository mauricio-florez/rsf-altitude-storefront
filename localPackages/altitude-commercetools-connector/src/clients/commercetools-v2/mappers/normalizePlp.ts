import { FacetResponseType } from '../types/facets'
import { type PlpResponse } from './../types/index'
import { normalizeFacets } from './normalizeFacets'
import normalizeProduct from './normalizeProduct'

export function normalizePlp(search, facets): PlpResponse {
  // TODO: Limit needs to be a config param
  const limit = 24
  // TODO: Check logic in client side, it is adding an additional page
  const totalPages = Math.ceil(search.total / limit) + 1

  const { results = [] } = search
  let products = []
  const facetsResponse: FacetResponseType = search.facets || {}

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
    facets: normalizeFacets(facetsResponse, facets),
  }
}
