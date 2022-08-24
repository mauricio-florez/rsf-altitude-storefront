import getClient from '../commercetools-client'
import normalizeProduct from '../mappers/normalizeProduct'

// TODO: make process env var
const limit = 24

export default async function productListing(req, params, catId) {

    const { page = 1, filters = '[]', sort } = params

    const client = await getClient(req)
    const search = await client.findProducts(catId)

    let products = []
    if (search.results) {
        products = search.results
    }

    const totalPages = 1 //Math.ceil(search.total / limit) + 1

    // collect all page data
    return {
        total: 10,
        page,
        totalPages,
        // isLanding,
        // cmsBlocks,
        products: (products || []).map(normalizeProduct),
        sort,
        sortOptions: [],
        // search.sortingOptions.map(({ label, id }) => {
        //     return {
        //         name: label,
        //         code: id,
        //     }
        // }),
        filters: [],
        facets: []
            // (search.refinements || [])
            //     .filter(e => e.values)
            //     .map(({ label, attributeId, values }) => {
            //         return {
            //             name: label,
            //             options: values.map(({ hitCount, label, value }) => {
            //                 return {
            //                     name: label,
            //                     code: `${attributeId}=${value}`,
            //                     matches: hitCount,
            //                 }
            //             }),
            //         }
            //     }),
    }
}