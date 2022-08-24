import createAppData from './clients/commercetools-v2/utils/createAppData'
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import {
  getProductsByCategoryId,
  getCategoryById,
} from './clients/commercetools-v2/commercetoolsClient'
import { getLocale } from './clients/utils/index.ts'

export default async function category(params, req, res) {
  const locale = getLocale({ host: req.headers.host })
  return await fulfillAPIRequest(req, {
    appData: () => createAppData({ locale }),
    pageData: () => getPageData({ params, req, locale }),
  })
}

async function getPageData({ params, req, locale }) {
  const filterKey = Object.keys(req.query).find(k => k.includes('variants.attributes'))
  const filterQuery = (filterKey && `${filterKey}:${req.query[filterKey]}`) || ''
  const { categorySlug } = req.query
  const { body: category } = await getCategoryById({ categoryId: categorySlug[0] })
  const plp = await getProductsByCategoryId({ categoryId: categorySlug[0], filterQuery })
  const categoryName = category.name[locale]
  // collect all page data
  return {
    id: category.id,
    name: categoryName,
    title: categoryName,
    breadcrumbs: [
      {
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
