import normalizeContentfulImage from '../normalizeImage'

export default function normalizeContentfulCollection(data) {
  const { fields } = data

  return {
    image: normalizeContentfulImage(fields.image),
    title: fields.title,
    url: fields.url,
  }
}
