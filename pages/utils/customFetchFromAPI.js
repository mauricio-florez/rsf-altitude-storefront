import fetch from 'react-storefront/fetch'
import getAPIURL from 'react-storefront/api/getAPIURL'

// TODO: Evaluate if this strategy is appropriate in the future, it may cause desynchronization with rsf packages

/**
 * A custom implementation of a convenience function to be used in `getInitialProps` to fetch data for the page from an
 * API endpoint at the same path as the page being requested.  So for example, when rendering
 * `/p/1`, this function will fetch data from `/api/p/1?__v__={__NEXT_DATA__.buildId}`.
 *
 * Build in function takes only localhost or 127.0.0.1 to make local request
 * custom iplementation manages altistorefront domain and enable the calls for multilingual calls
 *
 * ```js
 * import fetchFromAPI from 'react-storefront/props/fetchFromAPI'
 * import createLazyProps from 'react-storefront/props/createLazyProps'
 *
 * Product.getInitialProps = createLazyProps(opts => {
 *   return fetchFromAPI(opts)
 * })
 * ```
 *
 * Or simply:
 *
 * ```js
 * Product.getInitialProps = createLazyProps(fetchFromAPI)
 * ```
 *
 * @param {Object} opts The options object provided to `getInitialProps`
 * @return {Promise} A promise that resolves to the data that the page should display
 */
export default function customFetchFromAPI({ req, asPath, pathname }) {
  const host = req ? process.env.API_HOST || req.headers.host : ''
  let protocol = ''

  if (req) {
    protocol = 'https://'
    // Validation to avoid local issues with custom domain
    const isLocalHost = host.startsWith('localhost') || host.startsWith('127.0.0.1')
    const isLocalCustomDomain = host.startsWith('altistorefront')
    const isMultilingualLocalHost =
      host.startsWith('fr.altistorefront') || host.startsWith('en.altistorefront')
    if (isLocalHost || isLocalCustomDomain || isMultilingualLocalHost) {
      protocol = 'http://'
    }
  }

  let uri = getAPIURL(asPath)
  let headers = {}

  if (req) {
    // on the server
    if (uri.indexOf('?') === -1) {
      uri += '?_includeAppData=1'
    } else {
      uri += '&_includeAppData=1'
    }

    headers = {
      host: req.headers.host,
      'x-next-page': `/api${pathname.replace(/\/$/, '')}`,
      cookie: req.headers.cookie,
      ...headers,
    }
  }

  const url = `${protocol}${host}${uri}`

  return fetch(url, { credentials: 'include', headers }).then(res => res.json())
}
