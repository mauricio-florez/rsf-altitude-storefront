import { ctpClient } from './buildClient';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { projectKey } from './config/config'
import { CreateQueryType, ProductsByCategoryIdRequestType, type PlpResponse } from './types/index'
import { normalizePlp } from './mappers/normalizePlp'
const apiRoot = createApiBuilderFromCtpClient(ctpClient);

const getProductsByCategoryId = async ({ req= {}, params= {}, categoryId='', facets=[], filterQuery='' }: ProductsByCategoryIdRequestType): Promise<PlpResponse> => {
  try {
    const { body: search } = await apiRoot
      .withProjectKey({ projectKey })
      .productProjections()
      .search()
      .get(createQueryWith({categoryId, facets, filterQuery }))
      .execute();

    return normalizePlp(search, facets);

  } catch (error) {
    console.error(error);
  }
};

const createQueryWith = ({categoryId, facets, filterQuery}: CreateQueryType) => {
  const query = {
    queryArgs: {
      facet: facets.map(f => f.field),
      filter: [`categories.id:"${categoryId}"`],
    }
  }
  if (filterQuery) {
    query.queryArgs['filter.query'] = filterQuery
  }

  return query
}

const getCategoryById = ({ categoryId }) => {
  try {
    return apiRoot
    .withProjectKey({ projectKey })
    .categories()
    .withId({
      ID: categoryId
    })
    .get()
    .execute();
  } catch (error) {
    console.error(error);
  }
};

export {
  getProductsByCategoryId,
  getCategoryById
}
