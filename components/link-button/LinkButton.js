import React from 'react'
import classnames from 'classnames'
import Link from './../Link'
import styles from './LinkButton.module.scss'

/**
 *
 * @property {string} variant -> OneOf([solid, outline, flat]). Default solid
 * @property {string} label -> button link label
 * @property {string} url -> button link url
 * @property {string} className -> button link css class
 * @property {string} prefetch -> prefetch the JSON data for the destination page component. OneOf([visible, always, false]). Default visible
 * @returns React Element
 */
function LinkButton(props) {
  const { variant = 'primary', style = 'positive', label = '', url = '#', className = '', prefetch = 'visible' } = props
  const buttonVariantStyle = styles[variant + '--' + style]

  const buttonClassName = classnames(styles.container, buttonVariantStyle, className)

  return (
    <Link
      as={url}
      href={url || '#'}
      className={buttonClassName}
      prefetch={prefetch}
    >
      {label}
    </Link>
  )
}

export default LinkButton
