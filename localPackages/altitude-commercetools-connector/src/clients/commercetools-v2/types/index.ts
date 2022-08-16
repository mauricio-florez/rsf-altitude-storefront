// TODO: Add product type
export type product = {}

export type PlpResponse = {
    total: number,
    // page,
    totalPages: number,
    products: any[],
    // sort,
    sortOptions: any[],
    filters: any[],
    facets: any[]
}