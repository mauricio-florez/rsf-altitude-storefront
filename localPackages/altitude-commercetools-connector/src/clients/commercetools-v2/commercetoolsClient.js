import { ctpClient } from './buildClient.js';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { projectKey } from './config/config'

import normalizeProduct from './../commercetools-v2/mappers/normalizeProduct'

// Create apiRoot from the imported ClientBuilder
const apiRoot = createApiBuilderFromCtpClient(ctpClient);
// TODO: normalize category response
const getProductsByCategoryId = async ({ req= {}, params= {}, categoryId='' }) => {
  const { page = 1, filters = '[]', sort } = params
  const limit = 24
  const { body: search } = await apiRoot
    .withProjectKey({ projectKey })
    .productProjections()
    .get({
      queryArgs: {
        facet: [],
        filter: [`categories.id:${categoryId}`],
        "filter.query": []
      }
    })
    .execute();
  
  let products = []
  if (search.results.length > 0) {
      products = search.results
  }
  const totalPages = Math.ceil(search.total / limit) + 1

    return {
      total: search.total,
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
};

const getCategoryById = ({ categoryId }) => {
  return apiRoot
    .withProjectKey({ projectKey })
    .categories()
    .withId({
      ID: categoryId
    })
    .get()
    .execute();
};

export {
  getProductsByCategoryId,
  getCategoryById
}