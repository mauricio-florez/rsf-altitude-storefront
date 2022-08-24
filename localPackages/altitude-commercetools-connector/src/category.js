import createAppData from './clients/commercetools-v2/utils/createAppData'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import { getProductsByCategoryId, getCategoryById } from "./clients/commercetools-v2/commercetoolsClient"
import { getLocale } from './clients/utils/index.ts'

export default async function category(params, req, res) {
  return await fulfillAPIRequest(req, {
      appData: createAppData,
      pageData: () => getPageData(params, req),
  })
}

async function getPageData(params, req) {
  const lang = getLocale({host: req.headers.host})
  const { filters = '[]' } = params
  const { categorySlug } = req.query
  const { body: category } = await getCategoryById({ categoryId: categorySlug[0] })
  const plp = await getProductsByCategoryId({ categoryId: categorySlug[0] })
  const categoryName = category.name[lang]
  // collect all page data
  return {
      id: category.id,
      name: categoryName,
      title: categoryName,
      breadcrumbs: 
      [{
              text: 'Home',
              href: '/',
          },
          {
              text: categoryName,
              href: `/s/${category.id}`,
          },
      ],
      ...plp,
  }
 
}
