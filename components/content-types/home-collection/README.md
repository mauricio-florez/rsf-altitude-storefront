# Hero

This component renders HomeCollection (https://app.contentful.com/spaces/`space-id`/content_types/homeCollection/fields) content types data requested thru Contenful API

## JSON template:

```json
{
  "ctaLabel": "Shop all styles",
  "ctaUrl": "/",
  "collections": [
    {
      "image": {
        "alt": "vallier-home-SS22-E2",
        "url": "//images.ctfassets.net/dli1gm1g4047/3ByKWsuzggjf9ZvqVXZraX/9f818ed94cf42a06f2c78f0eb3b2b179/vallier-home-SS22-E2.jpg"
      },
      "title": "Shop Men's",
      "url": "/"
    },
    {
      "image": {
        "alt": "vallier-home-SS22-E1-v2",
        "url": "//images.ctfassets.net/dli1gm1g4047/6bNeTN5lT3cG3bXOiawn6m/832d41e791ca12a8d6ccb2641b423c97/vallier-home-SS22-E1-v2.jpg"
      },
      "title": "Shop Women's",
      "url": "/"
    }
  ]
}
```

## How to Use

```js
<Hero {...data} />
```
