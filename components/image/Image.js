import React from 'react'
import StorefrontImage from 'react-storefront/Image'

/**
 *
 * @property {string} src -> Image url. Required
 * @property {string} alt -> alt label
 * @property {string} url -> button link url
 * @property {string} className -> image css class
 * @property {string} width -> Image width
 * @property {string} height -> Image height
 * @property {string} format -> Image format. OneOf([webp, jpg]). Defaut webp
 * @property {string} quality -> Image quality. OneOf([0...100])
 * @returns React Element
 * @descripton This component use Contenful Image API https://www.contentful.com/developers/docs/references/images-api/
 */
function Image({ src, alt, className, optimize, format = 'webp', width, height, quality }) {
  const aspectRatio = Number(height / width) || 1

  const formatImageUrl = () => {
    const imageUrl = new URL(`https://${src}`)
    width && imageUrl.searchParams.append('w', width)
    height && imageUrl.searchParams.append('h', height)
    format && imageUrl.searchParams.append('fm', format)
    quality && imageUrl.searchParams.append('q', quality)

    return imageUrl
  }

  formatImageUrl()

  return (
    <StorefrontImage
      className={className}
      src={String(formatImageUrl())}
      alt={alt}
      optimize={optimize}
      aspectRatio={aspectRatio}
      height={height}
      width={width}
    />
  )
}

export default Image
