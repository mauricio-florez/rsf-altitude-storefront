import React from 'react'
import classnames from 'classnames'
import Link from 'react-storefront/link/Link'
import styles from './LinkButton.module.scss'

const VARIANTS = {
  solid: styles.solid,
  outline: styles.outline,
  flat: styles.flat
}

/**
 *
 * @property {string} variant -> OneOf([solid, outline, flat]). Default solid
 * @property {string} label -> button link label
 * @property {string} url -> button link url
 * @property {string} className -> button link css class
 * @property {string} prefetch -> prefetch the JSON data for the destination page component. OneOf([visible, always, false]). Default visible
 * @returns React Element
 */
function LinkButton({ variant, label, url, className, prefetch = 'visible' }) {
  const buttonVariant = VARIANTS[variant] || styles.solid

  return (
    <Link
      as={url}
      href={url || '#'}
      className={classnames(styles.container, buttonVariant, className)}
      prefetch={prefetch}
    >
      {label}
    </Link>
  )
}

export default LinkButton
