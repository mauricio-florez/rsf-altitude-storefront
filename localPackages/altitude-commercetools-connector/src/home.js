import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from './clients/commercetools-v2/utils/createAppData'
import getContentFulClient from './clients/contentful/contentful-client'
import normalizeContentfulHomeCollections from './clients/contentful/mappers/content-types/normalizeHomeCollections'
import normalizeContentfulHero from './clients/contentful/mappers/content-types/normalizeHero'

export default async function home(req) {
  const { locale } = req.query
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
    appData: () => createAppData({ locale }),
    pageData
  })
}

async function getPageData({ hero, collections }) {
  return {
    title: 'Altitude Storefront',
    description: 'This is the main page for Altitude Storefront',
    slots: {
      heading: 'Welcome to Altitude Storefront Skeleton',title: 'React Storefront | Commercetools Connector',
      hero,
      collections,
    },
  }
}
