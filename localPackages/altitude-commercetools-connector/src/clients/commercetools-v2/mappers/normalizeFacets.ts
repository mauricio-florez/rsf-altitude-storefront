import { ContentfulFacetResponse } from "../types"
import { FacetResponseType, PlpFacetOptionsType, PlpFacetType } from "../types/facets"


const normalizeFacets = (facetResponse: FacetResponseType, facet: ContentfulFacetResponse[]): PlpFacetType[] =>
  Object.keys(facetResponse).map(key => ({
    name: facet.find(f => f.field === key).label,
    options: normalizeFacetsTerms(key, facetResponse),
    ui: "checkboxes"
  }))

const normalizeFacetsTerms = (key: string, facets: FacetResponseType): PlpFacetOptionsType[] => (
  facets[key].terms.map(term => ({
    code: `${key}:"${term.term}"`,
    name: term.term,
    matches: term.count,
  }))
)

export {
  normalizeFacets,
}
