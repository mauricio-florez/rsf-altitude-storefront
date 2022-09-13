import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Link from 'react-storefront/link/Link'

import style from './component.style.scss'

const Button = (props) => {
  const { variant, label, url, classes, prefetch } = props
  const className = classnames(style.container, variant, classes)

  return (
    <Link as={url} href={url} className={className} prefetch={prefetch}>
      {label}
    </Link>
  )
}

Button.defaultProps = {
  variant: 'primary',
  label: 'Example',
  url: 'https://www.example.com',
  className: '',
  prefetch: 'visible'
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary']),
  label: PropTypes.string,
  url: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  prefetch: PropTypes.oneOf(['visible', 'always', false]),
}

export { Button }
