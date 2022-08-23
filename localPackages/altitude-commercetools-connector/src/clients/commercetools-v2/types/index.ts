import { PlpFacetType } from "./facets"

// TODO: Add product type
type product = {}

type PlpResponse = {
    total: number,
    // page,
    totalPages: number,
    products: any[],
    // sort,
    sortOptions: any[],
    filters: any[],
    facets: PlpFacetType[]
}

type ProductsByCategoryIdRequestType = {
    req: {
        [x: string]: any;
    };
    params: {
        [x: string]: string;
    }
    filterQuery: string;
    categoryId: string;
}

type CreateQueryType = {
    categoryId: string;
    filterQuery: string
}

export {
    product,
    PlpResponse,
    ProductsByCategoryIdRequestType,
    CreateQueryType,
}
