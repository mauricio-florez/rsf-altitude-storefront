import getClient from './utils/client'
import getContentFulClient from './utils/contentful-client'
import normalizeProduct from './utils/normalizeProduct'
import normalizeEntry from './utils/normalizeEntry'
import createAppData from './utils/createAppData'

import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'

export default async function product({ id }, req) {
    const { color, size } = req.query
    const client = await getClient(req)
    const raw = await client.getProduct(id, { allImages: true })
    const contentfulClient = await getContentFulClient()
    const rawContentfulClient = await contentfulClient.getEntry()
    const normalizedProduct= normalizeProduct(raw.masterData.current, color, size);
    const normalizedEntry= normalizeEntry(rawContentfulClient);
    const pageData= () => getPageData(normalizedProduct, normalizedEntry);
    const result = await fulfillAPIRequest(req, {
        appData: createAppData,
        pageData,
    })
    return result
}

async function getPageData(prod, normalizedEntry) {
    const result = {
        title: prod.name,
        description: prod.description,
        product: prod,
        breadcrumbs: [{
                text: `Home`,
                href: '/',
            },
            {
                text: 'category.name',
                as: `/s/category.id`,
                href: '/s/[subcategoryId]',
            },
        ],
        banner: normalizedEntry
    }

    return result
}