# commercetools Connector



This guide covers how to get up and running with the commercetools Connector. For information on connectors in general and how to write your own connector refer to the [React Storefront Connectors](https://docs.reactstorefront.io/guides/connectors) documentation.

## Requirements

You will need a commercetools site and API client setup to try out the connector.

## Running Locally

Create a new React Storefront app using version 8.14.0 or later:

```
npm create react-storefront@^8.014.0 <nuxt-fed-app-name>
```

Next `cd` into your created application and install the commercetools connector:

```
cd <nuxt-fed-app-name>
npm install altitude-commercetools-connector
```

Configure the `AUTH_URL`, `HOST_URL`, `CLIENT_ID`, `CLIENT_SECRET`, and `PROJECT_KEY` environment variables in `.env` file at the root of the main project that will consume the connenctor to point to your commercetools site and API client. For example, your `.env` file may look like:

```
AUTH_URL=https://auth.<region>.gcp.commercetools.com
HOST_URL=https://api.<region>.gcp.commercetools.com
CLIENT_ID=NndsderS5TPE6
CLIENT_SECRET=4srJ3nJF8sda234dsdSDArgKH-SDEY
PROJECT_KEY=<commercetools-project-id>
```

Finally set the connector in your `next.config.js` file. By default this file is set to use the `react-storefront/mock-connector` as shown below:

```
module.exports = withReactStorefront({

  // ... Some code

  connector: 'react-storefront/mock-connector',

  // ... More code
```

Change this line to use the `altitude-commercetools-connector` as shown below:

```
module.exports = withReactStorefront({

  // ... Some code

  connector: 'altitude-commercetools-connector',

  // ... More code
```

Now you can run your project locally,

```
npm start
```

And then visit http://127.0.0.1:3000 in your browser.
