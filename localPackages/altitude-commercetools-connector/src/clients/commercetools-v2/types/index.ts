import { PlpFacetType } from "./facets"

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
    facets: PlpFacetType[]
}

export type ProductsByCategoryIdRequestType = {
    req: {
        [x: string]: any;
    };
    params: {
        [x: string]: string;
    }
    filterQuery: string;
    categoryId: string;
    facet: string[];
}

export type CreateQueryType = {
    categoryId: string;
    filterQuery: string;
    facet: string[];
}
