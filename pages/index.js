import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useLazyState from 'react-storefront/hooks/useLazyState'
import LoadMask from 'react-storefront/LoadMask'
import Head from 'next/head'
import createLazyProps from 'react-storefront/props/createLazyProps'
import customFetchFromAPI from './utils/customFetchFromAPI'
import { Hero, HomeCollection } from '../components/content-types'

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    margin: theme.spacing(10, 0, 0, 0),
  },
}))

export default function Index(lazyProps) {
  const classes = useStyles()
  const [state] = useLazyState(lazyProps)
  const { hero, collections } = state.pageData.slots

  return (
    <>
      {!state.loading && (
        <>
          <Head>
            <title>{state.pageData.title}</title>
          </Head>
          <Hero
            title={hero.title}
            ctaLabel={hero.ctaLabel}
            image1={hero.image1}
            image2={hero.image2}
            image3={hero.image3}
          />
        </>
      )}
      <Container maxWidth="lg">
        {state.loading ? (
          <LoadMask fullscreen />
        ) : (
          <div className={classes.main}>
            <HomeCollection
              ctaLabel={collections.ctaLabel}
              ctaUrl={collections.ctaUrl}
              collections={collections.collections}
            />
          </div>
        )}
      </Container>
    </>
  )
}

Index.getInitialProps = createLazyProps(options => {
  const { res } = options
  if (res) res.setHeader('Cache-Control', 'max-age=99999')
  return customFetchFromAPI(options)
})
