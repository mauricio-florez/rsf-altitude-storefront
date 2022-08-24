import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import getClient from './clients/commercetools/commercetools-client'
import createAppData from './clients/commercetools/utils/createAppData'
import productListing from './clients/commercetools/utils/productListing'

export default async function subcategory(params, req) {
  return await fulfillAPIRequest(req, {
    appData: createAppData,
    pageData: () => getPageData(params, req),
  })
}

async function getPageData(params, req) {
  const { filters = '[]' } = params
  const { categorySlug } = req.query

  const client = await getClient(req)
  const { results = [] } = await client.getCategory(categorySlug)

  const category = results
    .filter(cat => {
      return cat.id == categorySlug
    })
    .map(cat => {
      return { id: cat.id, name: cat.name.en }
    })[0]
  const plp = await productListing(req, params, categorySlug)

  // collect all page data
  return {
    id: category.id,
    name: category.name,
    title: category.name,
    breadcrumbs: [
      {
        text: 'Home',
        href: '/',
      },
      {
        text: category.name,
        href: `/s/${category.id}`,
      },
    ],
    ...plp,
  }
}
