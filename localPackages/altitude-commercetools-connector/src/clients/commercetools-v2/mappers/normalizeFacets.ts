import { FacetResponseType, PlpFacetOptionsType, PlpFacetType } from "../types/facets"


const normalizeFacets = (facets: FacetResponseType): PlpFacetType[] =>
  Object.keys(facets).map(key => ({
    name: key,
    options: normalizeFacetsTerms(key, facets),
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
