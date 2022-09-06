import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from './clients/commercetools-v2/utils/createAppData'
import getContentFulClient from './clients/contentful/contentful-client'
import normalizeContentfulHomeCollections from './clients/contentful/mappers/content-types/normalizeHomeCollections'
import normalizeContentfulHero from './clients/contentful/mappers/content-types/normalizeHero'
import { getLocale } from './clients/utils/index.ts'

export default async function home(req, res) {
  const locale = getLocale({ host: req.headers.host })
  const contentfulClient = await getContentFulClient()
  
  const rawContentfulHero = await contentfulClient.getEntries({
    entry_id: '2sYF2TPqSaLCLivQolm0Jk',
    locale,
  })
  const rawContentfulCollections = await contentfulClient.getEntries({
    entry_id: '2WREgTPR96bZEwTMABPC1k',
    locale,
  })

  const hero = normalizeContentfulHero(rawContentfulHero)
  const collections = normalizeContentfulHomeCollections(rawContentfulCollections)

  const pageData = () => getPageData({ hero, collections })

  return await fulfillAPIRequest(req, {
    appData: createAppData,
    pageData,
  })
}

async function getPageData({ hero, collections }) {
  return {
    title: 'React Storefront | Commercetools Connector',
    slots: {
      hero,
      collections,
    },
  }
}
