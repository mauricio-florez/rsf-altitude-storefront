# react-storefront-starter-app

Starter Next.js app for React Storefront 7+

# Development

```
npm i
npm run dev
```

Using Layer-0

```
npm install -g @layer0/cli

layer0:dev - Simulate your app on Layer0 locally.

layer0:build - Build your app for deployment on Layer0.

layer0:deploy - Build and deploy your app on Layer0.
```

# Production

You can get a better sense of the speed of React Storefront by running a production build:

```
npm run build && npm run prod
```

# Troubleshooting

```bash
Defining routes from exportPathMap
> Using connector altitude-commercetools-connector
node:internal/crypto/hash:67
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
```

Run 
`NODE_OPTIONS=--openssl-legacy-provider npm run dev` 
