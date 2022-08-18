import { FacetResponseType } from '../types/facets'
import { type PlpResponse } from './../types/index'
import { normalizeFacets } from './normalizeFacets'
import normalizeProduct from './normalizeProduct'

export function normalizePlp(search): PlpResponse {
  const limit = 24
  const totalPages = Math.ceil(search.total / limit) + 1
  let products = []
  const facets: FacetResponseType = search.facets || {}

  if (search.results.length > 0) {
    products = search.results
  }

  return {
    total: search.total,
    // page,
    totalPages,
    products: (products || []).map(normalizeProduct),
    // sort,
    sortOptions: [],
    filters: [],
    facets: normalizeFacets(facets),
  }
}