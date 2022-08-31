import getClient from './clients/commercetools/commercetools-client'
import getContentFulClient from './clients/contentful/contentful-client'
import normalizeProduct from './clients/commercetools/mappers/normalizeProduct'
import normalizeEntry from './clients/contentful/mappers/normalizeEntry'
import createAppData from './clients/commercetools-v2/utils/createAppData'

import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

export default async function product({ id }, req) {
  const { locale } = req.query
  const { color, size } = req.query
  const client = await getClient(req)
  const raw = await client.getProduct(id, { allImages: true })
  const contentfulClient = await getContentFulClient()
  const rawContentfulClient = await contentfulClient.getEntry()
  const normalizedProduct = normalizeProduct(raw.masterData.current, color, size)
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
    title: prod.name,
    description: prod.description,
    product: prod,
    breadcrumbs: [
      {
        text: `Home`,
        href: '/',
      },
      {
        text: 'category.name',
        as: `/s/category.id`,
        href: '/s/[subcategoryId]',
      },
    ],
    banner: normalizedEntry,
  }

  return result
}
