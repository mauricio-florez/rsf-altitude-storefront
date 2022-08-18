import createAppData from './clients/commercetools-v2/utils/createAppData'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import { getProductsByCategoryId, getCategoryById } from "./clients/commercetools-v2/commercetoolsClient"

export default async function category(params, req, res) {
  return await fulfillAPIRequest(req, {
      appData: createAppData,
      pageData: () => getPageData(params, req),
  })
}

async function getPageData(params, req) {
  const lang = "en-CA"
  const { filters = '[]' } = params
  const { categorySlug } = req.query
  const { body: category } = await getCategoryById({ categoryId: categorySlug[0] })
  const plp = await getProductsByCategoryId({ categoryId: categorySlug[0] })

  // collect all page data
  return {
      id: category.id,
      name: category.name[lang],
      title:category.name[lang],
      breadcrumbs: 
      [{
              text: 'Home',
              href: '/',
          },
          {
              text: category.name[lang],
              href: `/s/${category.id}`,
          },
      ],
      ...plp,
  }
 
}
