export const getLocale = ({ host }) => {
  // TODO define available languages and its structure
  // TODO: get automatically the user location (option: Call the geolocation service)
  const locales = {
    fr: 'fr-CA',
    en: 'en-CA'
  }
  const defaultLang = 'en-CA'
  const reqLanguage = host.split('.')[0]
  const lang = locales[reqLanguage] || defaultLang
  return lang
}