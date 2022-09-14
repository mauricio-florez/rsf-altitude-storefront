import React from 'react'
import styles from './HomeCollection.module.scss'
import Image from '../../image/Image'
import useViewportIsLarge from '../../../hooks/useViewportIsLarge'
import LinkButton from '../../link-button/LinkButton'

function HomeCollection({ ctaLabel, ctaUrl, collections }) {
  const isDesktop = useViewportIsLarge()

  return (
    <div className={styles.container}>
      <div className={styles.collection_container}>
        {collections.map(({ title, url, image }) => (
          <div key={title} className={styles.collection}>
            <LinkButton variant="flat" label={title} url={url} className={styles.link} />
            <Image
              className={styles.image}
              src={image.url}
              alt={image.alt}
              width={isDesktop ? 1005 : 752}
              height={isDesktop ? 1441 : 1080}
            />
          </div>
        ))}
      </div>

      <div className={styles.button_container}>
        <LinkButton variant="secondary" label={ctaLabel} url={ctaUrl}  />
      </div>
    </div>
  )
}

export default HomeCollection
