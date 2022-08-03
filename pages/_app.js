import Head from 'next/head'
import React from 'react'
import theme from '../components/theme'
import Header from '../components/Header'
import { CssBaseline } from '@material-ui/core'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import PWA from 'react-storefront/PWA'
import NavBar from '../components/NavBar'
import reportError from '../components/reportError'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import SessionProvider from 'react-storefront/session/SessionProvider'
import useAppStore from 'react-storefront/hooks/useAppStore'

import { Prefetch } from '@layer0/react'
import Link from 'next/link'
import { createNextDataURL } from '@layer0/next/client'

const styles = theme => ({
  main: {
    paddingTop: 3,
  },
})

const useStyles = makeStyles(styles)

export default function MyApp({ Component, pageProps }) {
  useJssStyles()
  const classes = useStyles()
  const [appData] = useAppStore(pageProps || {})

  return (
    <PWA errorReporter={reportError}>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <SessionProvider url="/api/session">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header menu={appData && appData.menu} />
          <main className={classes.main}>
            <a href="/p/a9e8f53f-3a60-4581-8010-cdc173d1d49b">Vans product</a>
            <Component {...pageProps} />
          </main>
        </MuiThemeProvider>
      </SessionProvider>
    </PWA>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps }
}
