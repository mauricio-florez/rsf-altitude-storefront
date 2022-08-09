import getClient, { encodeUser } from './clients/commercetools/commercetools-client'
import { COOKIES } from './clients/commercetools/utils/constants'
import getCart from './clients/commercetools/utils/getCart'

export default async function session(req, res) {
  const client = await getClient(req)

  await client.session()

  const cart = await getCart(client)

  res.setHeader('Set-Cookie', `${COOKIES.USER}=${encodeUser(client.user)}; Path=/`)

  return { cart, signedIn: client.user.authType === 'registered' }
}
