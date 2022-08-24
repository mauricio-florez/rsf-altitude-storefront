import getContentFulClient from '../../contentful/contentful-client'

export default async function createAppData({ locale = 'en-CA' }) {
  const categoryTree = await getContentFulClient().getCategoryTree({ locale })

  return Promise.resolve({ categoryTree })
}
