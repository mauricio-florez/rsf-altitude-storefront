import getClient, { encodeUser } from './clients/commercetools/commercetools-client'
import { COOKIES } from './clients/commercetools/utils/constants'

export default async function signIn(email, password, req, res) {
  const client = getClient(req)
  try {
    await client.signIn(email, password)
    res.setHeader('Set-Cookie', `${COOKIES.USER}=${encodeUser(client.user)}; Path=/`)
    return res.json({ signedIn: true })
  } catch (e) {
    console.log('Sign In error', e)
    return res.status(500).json(e)
  }
}
