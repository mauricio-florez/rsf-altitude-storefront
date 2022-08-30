export type FacetResponseType = {
  [k: string]: FacetType;
}

export type FacetType = {
  type: string;
  dataType: string;
  missing: number;
  total: number;
  other: number;
  terms: FacetTermType[];
}

export type FacetTermType = {
  term: string;
  count: number;
}

export type PlpFacetOptionsType = {
  code: string;
  name: string;
  matches: number;
}

export type PlpFacetType = {
  name: string;
  options: PlpFacetOptionsType[];
  ui?: "buttons"|"checkboxes";
}