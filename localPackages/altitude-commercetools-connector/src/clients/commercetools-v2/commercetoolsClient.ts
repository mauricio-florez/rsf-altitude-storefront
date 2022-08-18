import { ctpClient } from './buildClient';
import {
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { projectKey } from './config/config'
import { type PlpResponse } from './types/index'
import { normalizePlp } from './mappers/normalizePlp'
const apiRoot = createApiBuilderFromCtpClient(ctpClient);

const getProductsByCategoryId = async ({ req= {}, params= {}, categoryId='' }): Promise<PlpResponse> => {
  // TODO: add filters in plpResponse mapper & request
  // const { page = 1, filters = '[]', sort } = params
  try {
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

    return normalizePlp(search);

  } catch (error) {
    console.error(error);
  }
};

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
