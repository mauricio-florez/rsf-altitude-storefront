# Alti-storefront 

This repository includes:
1. SSR app based on React-storefront  
2. Gateway connector supporting client interaction with Commercetools and Contentful headless APIs.
    - Commercetools connector (Using REST API)
    - Commercetools-v2 connector (Using CT Typescript SDK)
    - Contentful client (REST only + GraphQl example)
3. Multilingual support for en and fr (check prerequisites to enable it in local env)
<!-- TODO enable this once the design system foundations will be included -->    
<!-- 2. Alti design system package with the foundations for a multi-tiered token system, component library based on atomic design, BEM convention and storybook (preview and documentation). -->
<br/>

## Pre-requisites
### 1. EnvFile
- Check the env-sample file
    -  Ask to Pegasus team members for the missing variables
    - For CT env variables you should get access to the merchant tool and create a new APi under developer configuration. *(Contact a Staff Engineer to get access).*

### 2. Multilingual support
1. Add the following line in yout `host` file:

```
127.0.0.1 altistorefront fr.altistorefront en.altistorefront
```

Now you can access `http://altistorefront:3000/`, `http://en.altistorefront:3000/` and `http://fr.altistorefront:3000/` in your local machine.

<br/>

> **_NOTE:_** this local registry is optional if you don't proced with the steps above, you'll still see the english version.

<br/>

## Development

```
npm i
npm run dev
```

Ask for the .env file content

Using Layer-0

```
npm install -g @layer0/cli

layer0:dev - Simulate your app on Layer0 locally.

layer0:build - Build your app for deployment on Layer0.

layer0:deploy - Build and deploy your app on Layer0.
```

## Production

You can get a better sense of the speed of React Storefront by running a production build:

```
npm run build && npm run prod
```
Using layer-0

```
layer0 build && layer0 run --production
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
