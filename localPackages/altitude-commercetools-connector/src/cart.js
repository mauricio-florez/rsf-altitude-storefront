import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from './clients/commercetools/utils/createAppData'
import getClient from './clients/commercetools/commercetools-client'
import getCart from './clients/commercetools/utils/getCart'

export default async function cart(req, res) {
  const client = await getClient(req)
  const cart = await getCart(client)

  return fulfillAPIRequest(req, {
    appData: createAppData,
    pageData: () =>
      Promise.resolve({
        title: 'My Cart',
        breadcrumbs: [
          {
            text: 'Home',
            href: '/',
          },
        ],
        cart,
      }),
  })
}
