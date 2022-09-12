import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from './clients/commercetools-v2/utils/createAppData'

export default async function home(req, res) {
  const { locale } = req.query
  return await fulfillAPIRequest(req, {
    appData: () => createAppData({ locale }),
    pageData: () =>
      Promise.resolve({
        title: 'Altitude Storefront',
        description: 'This is the main page for Altitude Storefront',
        slots: {
          heading: 'Welcome to Altitude Storefront Skeleton',
          description: `
              <p>Happy coding!</p>
            `,
        },
      }),
  })
}
