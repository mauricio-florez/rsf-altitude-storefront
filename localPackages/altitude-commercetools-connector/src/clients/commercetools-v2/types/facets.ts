type FacetResponseType = {
  [k: string]: FacetType;
}

type FacetType = {
  type: string;
  dataType: string;
  missing: number;
  total: number;
  other: 0;
  terms: FacetTermType[];
}

type FacetTermType = {
  term: string;
  count: number;
}

type PlpFacetOptionsType = {
  code: string;
  name: string;
  matches: number;
}

type PlpFacetType = {
  name: string;
  options: PlpFacetOptionsType[];
}

export {
  FacetResponseType,
  FacetType,
  FacetTermType,
  PlpFacetType,
  PlpFacetOptionsType,
}