# Hero

This component renders Hero (https://app.contentful.com/spaces/`space-id`/content_types/hero/fields) content types data requested thru Contenful API

## JSON template:

```json
{
  "title": "All-weather apparel for better urban living",
  "ctaLabel": "Discover",
  "image1": {
    "alt": "A2-V2",
    "url": "//images.ctfassets.net/dli1gm1g4047/TuLGZfBUd1D2esWRYS2A4/f11c4459a4c11309e4a91e4f2ff36b28/vallier-home-SS22-A2-v2.jpg"
  },
  "image2": {
    "alt": "vallier-home-SS22-B2",
    "url": "//images.ctfassets.net/dli1gm1g4047/6FxP5VLFdPbmjP6oHHmGDS/79c31bd2df57edb0b53fcb668f22723e/vallier-home-SS22-B2.jpg"
  },
  "image3": {
    "alt": "vallier-home-SS22-D2",
    "url": "//images.ctfassets.net/dli1gm1g4047/5TzP6I4gXCAJyjnLypWkui/68b18cbbcb060c2bb8b9cf9a0be81f55/vallier-home-SS22-D2.jpg"
  }
}
```

## How to Use

```js
<HomeCollection {...data} />
```
