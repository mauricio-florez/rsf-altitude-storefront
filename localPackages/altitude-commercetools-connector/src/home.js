import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from './clients/commercetools-v2/utils/createAppData'

export default async function home(req, res) {
  const { locale } = req.query
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
