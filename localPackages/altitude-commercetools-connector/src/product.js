import getContentFulClient from './clients/contentful/contentful-client'
import normalizeProduct from './clients/commercetools/mappers/normalizeProduct'
import normalizeEntry from './clients/contentful/mappers/normalizeEntry'
import createAppData from './clients/commercetools-v2/utils/createAppData'

import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

import { getProduct } from './clients/commercetools-v2/commercetoolsClient'

export default async function product({ id }, req) {
  const { locale } = req.query
  const { color, size } = req.query
  const raw = await getProduct(id)
  const contentfulClient = await getContentFulClient()
  const rawContentfulClient = await contentfulClient.getEntry()
  const normalizedProduct = normalizeProduct({ data: raw.masterData.current, color, size, locale })
  const normalizedEntry = normalizeEntry(rawContentfulClient)
  const pageData = () => getPageData(normalizedProduct, normalizedEntry)
  const result = await fulfillAPIRequest(req, {
    appData: () => createAppData({locale}),
    pageData,
  })
  return result
}

async function getPageData(prod, normalizedEntry) {
  const result = {
    title: `Altitude Storefront | ${prod.name}`,
    description: prod.description,
    product: prod,
    breadcrumbs: [
      {
        text: `Home`,
        href: '/',
      },
      {
        text: 'Category',
        as: `/s/${prod.category.id}`,
        href: `/s/${prod.category.id}`,
      },
    ],
    banner: normalizedEntry,
  }

  return result
}
