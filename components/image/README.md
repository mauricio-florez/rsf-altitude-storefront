# Image

This component is atomic and brand agnostic. Displays an image that can be lazy loaded and made to auto-scale to fit the parent element. Based on Storefront Image component (https://docs.reactstorefront.io/apiReference/Image).

Use contenful Image API to retrieval and manipulate image files referenced from assets (https://www.contentful.com/developers/docs/references/images-api/). You can resize the image to the desired width and height. 

## Attributes:

- src **required**
- alt **required**
- className **optional**
- width - Used to calc image aspect ratio, and get Image dimension from Contenful assets
- height - Used to calc image aspect ratio, and get Image dimension from Contenful assets
- format - Contenful image formats. Default `webp`
- quality- Contenful image quality values (0 to 100)

* Apect ratio default to 1 if no with and height are provided

## How to Use


```js
<Image
  src="//images.ctfassets.net/dli4047/3ByKb3b2b179/vallier-home-SS22-E2.jpg"
  alt="Vallier home"
  width={286}
  height={400}
/>
```

