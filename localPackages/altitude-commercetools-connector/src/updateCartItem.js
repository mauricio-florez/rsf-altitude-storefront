import getClient from './clients/commercetools/commercetools-client'
import getCart from './clients/commercetools/utils/getCart'

export default async function updateCartItem(item, quantity, req, res) {
  const client = getClient(req)

  // TODO: Do not pass raw here, find better way of sending itemId
  await client.updateCart(item.raw.itemId, quantity)

  return { cart: await getCart(client) }
}
