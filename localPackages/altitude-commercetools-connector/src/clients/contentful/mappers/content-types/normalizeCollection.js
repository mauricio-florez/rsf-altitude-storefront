import normalizeContentfulImage from '../normalizeImage'

export default function normalizeContentfulCollection(data) {
  const {
    fields: { image, title, url },
  } = data

  return {
    image: normalizeContentfulImage(image),
    title,
    url,
  }
}
