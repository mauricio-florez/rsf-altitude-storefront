export default function normalizeContentfulImage(data) {
  const {
    file: { url },
    title,
  } = data.fields

  return {
    alt: title,
    url,
  }
}
