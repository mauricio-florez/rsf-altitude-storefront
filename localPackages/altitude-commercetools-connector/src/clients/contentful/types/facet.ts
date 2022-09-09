export type FacetResponseType = {
  field: string;
  type: 'list'|'hierarchy'|'grid';
  label: string;
}