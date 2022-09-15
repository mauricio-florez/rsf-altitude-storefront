export default function normalizeProduct(data, color, size) {
  // Filter for images supporting type and variations
  const ProductVarients = []
  if (data.masterVariant) ProductVarients.push(data.masterVariant)
  if (data.variants.length > 0) ProductVarients.push(data.variants)

  function getImages(variation) {
    return data.masterVariant.images.map(image => {
      return {
        src: image.url,
        alt: data.name.en,
        magnify: {
          height: 1200,
          width: 800,
          src: image.url,
        },
      }
    })
  }

  function getVariationsSize(type) {
    if (!data.masterVariant) return []

    const res = []
    const mastervarient = data.masterVariant.attributes.find(attr => attr.name === type)
    res.push({
      id: mastervarient.value,
      text: mastervarient.value,
      image: [],
    })
    for (let variant of data.variants) {
      const result = variant.attributes.find(attr => attr.name === type)
      const resdata = {
        id: result.value,
        text: result.value,
        image: [],
      }
      if (!res.some(item => item.text === result.value)) res.push(resdata)
    }

    return res
  }

  function getvarientImages(variant) {
    return variant.images.map(image => {
      return {
        src: image.url,
        alt: data.name.en,
        magnify: {
          height: 1200,
          width: 800,
          src: image.url,
        },
      }
    })
  }

  function getVariationsColor() {
    if (!data.masterVariant) return []
    //let variant =ProductVarients.reduce((prev, variant) => prev || variant.attributes.find(item => item.name === 'color'), undefined)

    const colors = ProductVarients.filter(item => item).map(variant => {
      if (!variant.attributes) return
      let obj = variant.attributes.find(item => item.name === 'color')
      let Images = getvarientImages(variant)

      return {
        text: obj.value.key,
        id: obj.value.key.toLowerCase(),
        image: { src: variant.images[0].url, alt: obj.value.key.toLowerCase() },
        media: { full: Images, thumbnails: Images, thumbnail: Images },
      }
    })
    return colors.filter(item => item)
  }

  function getImages2(type) {
    if (!data.masterVariant) return []

    const mastervarient = data.masterVariant.attributes.find(attr => attr.name === type)
    return {
      src: mastervarient.value,
      alt: mastervarient.name,
      magnify: {
        height: 1200,
        width: 800,
        src: mastervarient.value,
      },
    }
  }

  const sizes = getVariationsSize('brandSize1')
  const media = {
    full: [getImages2('mainImage')],
    thumbnails: [getImages2('mainImage')], //getImages('medium'),
  }

  data['price'] = 100 // TODO: get real price from selected or master variant
  const id = data.id
  const specs = {}
  return {
    id,
    url: `/p/${id}`,
    name: data.name['en-CA'],
    price: data.price,
    priceText: '', // n/a
    // rating: n/a
    description: '',
    specs: [],
    media,
    thumbnail: media.thumbnails[0],
    colors: {},
    sizes,
    quantity: data.quantity || 1,
    // TODO: Remove later
    raw: data,
  }
}
