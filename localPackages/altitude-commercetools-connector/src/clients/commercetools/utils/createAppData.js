import getContentFulClient from '../../contentful/contentful-client'

export default async function createAppData(req) {
  const categoryTree = await getContentFulClient().getCategoryTree()

  return Promise.resolve({ categoryTree })
}
