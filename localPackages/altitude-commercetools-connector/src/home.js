import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from './clients/commercetools-v2/utils/createAppData'
import { getLocale } from './clients/utils/index.ts'

export default async function home(req, res) {
  const locale = getLocale({ host: req.headers.host })
  return await fulfillAPIRequest(req, {
    appData: () => createAppData({ locale }),
    pageData: () =>
      Promise.resolve({
        title: 'React Storefront | Commercetools Connector',
        slots: {
          heading: 'Welcome',
          description: `
                <p>
                Enjoy our Commercetools Connector.
              </p>
              <p>Happy coding!</p>
            `,
        },
      }),
  })
}
