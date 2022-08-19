import { ctpClient } from './buildClient';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { projectKey } from './config/config'
import { CreateQueryType, ProductsByCategoryIdRequestType, type PlpResponse } from './types/index'
import { normalizePlp } from './mappers/normalizePlp'
const apiRoot = createApiBuilderFromCtpClient(ctpClient);

const getProductsByCategoryId = async ({ req= {}, params= {}, categoryId='', filterQuery='' }: ProductsByCategoryIdRequestType): Promise<PlpResponse> => {
  try {
    const { body: search } = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get(createQueryWith({categoryId, filterQuery }))
      .execute();

    return normalizePlp(search);

  } catch (error) {
    console.error(error);
  }
};

const createQueryWith = ({categoryId='', filterQuery=''}: CreateQueryType) => {
  const query = {
    queryArgs: {
      facet: ['variants.attributes.vendorTitle', 'variants.attributes.test'], // TODO: avoid hardcoding
      filter: [`categories.id:"${categoryId}"`],
    }
  }
  if (filterQuery) {
    query.queryArgs['filter.query'] = filterQuery
  }

  return query
}

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