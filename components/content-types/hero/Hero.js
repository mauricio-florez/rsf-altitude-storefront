import React from 'react'
import classnames from 'classnames'
import styles from './Hero.module.scss'
import LinkButton from '../../link-button/LinkButton'
import Image from '../../image/Image'
import useViewportIsLarge from '../../../hooks/useViewportIsLarge'

/**
 *
 * @property {string} title
 * @property {string} ctaLabel -> link button label
 * @property {string} ctaUrl -> link button url
 * @property {Object} image1 -> shape({url, alt}). Required
 * @property {Object} image2 -> shape({url, alt}). Required
 * @property {Object} image3 -> shape({url, alt}). Required
 * @returns React Element
 */
function Hero({ title, ctaLabel, ctaUrl, image1, image2, image3 }) {
  const isDesktop = useViewportIsLarge()

  return (
    <div className={classnames(styles.container)}>
      <div className={styles.content}>
        <div className={styles.headline}>
          <h1 className={styles.title}>{title}</h1>
          <LinkButton label={ctaLabel} url={ctaUrl} />
        </div>
        <div className={styles.overlap_images}>
          <Image
            className={styles.image_2}
            src={image2.url}
            alt={image2.alt}
            width={isDesktop ? 572 : 286}
            height={isDesktop ? 800 : 400}
          />
          <Image
            className={styles.image_3}
            src={image3.url}
            alt={image3.alt}
            width={isDesktop ? 504 : 252}
            height={isDesktop ? 706 : 358}
          />
          <Image
            className={styles.image_1}
            src={image1.url}
            alt={image1.alt}
            height={isDesktop ? 1680 : 840}
            width={isDesktop ? 1238 : 616}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
