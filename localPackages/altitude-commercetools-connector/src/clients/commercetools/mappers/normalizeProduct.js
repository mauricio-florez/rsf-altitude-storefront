export default function normalizeProduct(data, color, size) {
  // Filter for images supporting type and variations
  const ProductVariants = []
  if (data.masterVariant) ProductVariants.push(data.masterVariant)
  if (data.variants.length > 0) ProductVariants.push(data.variants)

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
    const masterVariant = data.masterVariant.attributes.find(attr => attr.name === type)
    res.push({
      id: masterVariant.value,
      text: masterVariant.value,
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

  function getVariantImages(variant) {
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
    //let variant =ProductVariants.reduce((prev, variant) => prev || variant.attributes.find(item => item.name === 'color'), undefined)

    const colors = ProductVariants.filter(item => item).map(variant => {
      if (!variant.attributes) return
      let obj = variant.attributes.find(item => item.name === 'color')
      let images = getVariantimages(variant)

      return {
        text: obj.value.key,
        id: obj.value.key.toLowerCase(),
        image: { src: variant.images[0].url, alt: obj.value.key.toLowerCase() },
        media: { full: images, thumbnails: images, thumbnail: images },
      }
    })
    return colors.filter(item => item)
  }

  function getImages2(type) {
    if (!data.masterVariant) return []

    const masterVariant = data.masterVariant.attributes.find(attr => attr.name === type)
    return {
      src: masterVariant.value,
      alt: masterVariant.name,
      magnify: {
        height: 1200,
        width: 800,
        src: masterVariant.value,
      }
    }
  }

  const locale = 'en-CA'
  const id = data.id
  const url = `/p/${id}`
  const name = data.name[locale]
  const brand = 'Vallier'
  const price = '879.99'
  const priceText = `$${price}`
  const description = data.description[locale]
  const specs = [
    'Bluesign® certified fabrics',
    'Crafted with OEKO-TEX® STANDARD 100 certified materials',
    'Exterior fabric : 100% polyester Toray plain weave fabric',
    'Secondary fabric : 100% Recycled Polyester Light Downproof Plain Weave',
    '10,000 mm waterproofness/10,000 g/m² breathability',
    '90/10 800FP RDS-certified grey goose down insulation',
    'Adjustable hood',
    'Seams sealed at critical points',
    'Baffled construction on the lower part of the jacket',
    'Draft tube at the neck',
    'Fleece-lined zippered side pockets',
    'Microfleece chin guard',
    'Two-way zipper',
    'Underarm panels for better mobility',
    'Articulated sleeves',
    'Tonal Vallier logo on left sleeve',
    'Designed in Montreal, made in China',
    'The model is 5\'6"/171cm and wears a size S'
  ]
  const media = { full: [getImages2('mainImage')], thumbnails: [getImages2('mainImage')] }
  const thumbnail = media.thumbnails[0]
  const colors = {}
  const sizes = getVariationsSize('brandSize1')
  const quantity = data.quantity || 1
  const raw = data
  
  return {
    id,
    url,
    name,
    brand,
    price,
    priceText,
    // rating: n/a
    description,
    specs,
    media,
    thumbnail,
    colors,
    sizes,
    quantity,
    raw // TODO: Remove later
  }
}
